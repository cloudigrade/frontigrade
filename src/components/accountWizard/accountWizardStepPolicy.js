import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon } from 'patternfly-react';
import { awsPolicySetup } from '../../common/configuration.json';
import helpers from '../../common/helpers';
import { connect, reduxTypes, store } from '../../redux/';
import apiTypes from '../../constants/apiConstants';
import { FormField, fieldValidation } from '../formField/formField';
import CopyField from '../copyField/copyField';
import Tooltip from '../tooltip/tooltip';

class AccountWizardStepPolicy extends React.Component {
  state = {
    accountName: '',
    accountNameError: null,
    resourceType: 'AwsAccount'
  };

  onChangeAccountName = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.doesntHaveMinimumCharacters(value, 3)
      ? 'Enter minimum of 3 characters for account name'
      : '';

    this.setState(
      {
        accountName: value,
        accountNameError: errorMessage
      },
      () => this.isStepValid()
    );
  };

  // ToDo: when form valid evaluate moving to next step onEnter key-press event
  onSubmit = event => {
    event.preventDefault();
  };

  isStepValid() {
    const { accountName, accountNameError, resourceType } = this.state;
    const stepValid = accountNameError === '';
    const dispatchType = stepValid
      ? reduxTypes.account.ADD_ACCOUNT_WIZARD_STEP_POLICY
      : reduxTypes.account.INVALID_ACCOUNT_WIZARD_STEP_POLICY;

    store.dispatch({
      type: dispatchType,
      account: {
        [apiTypes.API_SUBMIT_ACCOUNT_NAME]: accountName,
        [apiTypes.API_SUBMIT_ACCOUNT_RESOURCE_TYPE]: resourceType
      }
    });
  }

  render() {
    const { accountName, accountNameError, resourceType } = this.state;
    const { policySetupConfig, stepPolicyValid, stepPolicyErrorMessage } = this.props;

    let stepError = null;

    if (!stepPolicyValid) {
      stepError = stepPolicyErrorMessage;
    }

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormField
          label="Account Name"
          error={stepError || accountNameError}
          errorMessage={stepError || accountNameError}
        >
          <Form.FormControl
            autoFocus
            type="text"
            name="accountName"
            value={accountName}
            placeholder="Enter a name for this account"
            maxLength={256}
            onChange={this.onChangeAccountName}
          />
        </FormField>
        <Form.FormControl type="hidden" name="resourceType" value={resourceType} />
        <Form.FormGroup>
          <Grid.Col sm={12} className="padding-left">
            <ul>
              <li>
                Create a new policy in the AWS{' '}
                <a href="https://console.aws.amazon.com/iam" target="_blank" rel="noopener noreferrer">
                  Identity and Access Management
                </a>.{' '}
                <Tooltip
                  delayShow={100}
                  popover={
                    <ul className="cloudmeter-popover-list">
                      <li>Log in to AWS console</li>
                      <li>Search Services to go to IAM</li>
                      <li>Click Roles in the left nav</li>
                      <li>
                        Click the <strong>Create role</strong> button
                      </li>
                      <li>
                        Click <strong>Another AWS account</strong>
                      </li>
                    </ul>
                  }
                >
                  <Icon type="pf" name="info" size="large" />
                  <span className="sr-only">Steps when logging into AWS Identity and Access Management</span>
                </Tooltip>
              </li>
              <li>
                <p>In the JSON editor replace the contents with:</p>
                <CopyField multiline isHtml value={policySetupConfig} />
              </li>
              <li>
                Click <strong>Review policy</strong>.
              </li>
              <li>
                Name the policy <strong>Cloud-Meter-policy</strong> and click <strong>Create policy</strong>.
              </li>
            </ul>
          </Grid.Col>
        </Form.FormGroup>
      </Form>
    );
  }
}

AccountWizardStepPolicy.propTypes = {
  policySetupConfig: PropTypes.string,
  stepPolicyValid: PropTypes.bool,
  stepPolicyErrorMessage: PropTypes.string
};

AccountWizardStepPolicy.defaultProps = {
  policySetupConfig: helpers.prettyPrintJson(awsPolicySetup),
  stepPolicyValid: false,
  stepPolicyErrorMessage: null
};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizardStepPolicy = connect(mapStateToProps)(AccountWizardStepPolicy);

export { ConnectedAccountWizardStepPolicy as default, ConnectedAccountWizardStepPolicy, AccountWizardStepPolicy };
