import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon } from 'patternfly-react';
import { awsPolicySetup } from '../../common/configuration.json';
import helpers from '../../common/helpers';
import { connect, reduxTypes, store } from '../../redux/';
import { FormField, fieldValidation } from '../formField/formField';
import CopyField from '../copyField/copyField';
import Tooltip from '../tooltip/tooltip';

class AccountWizardStepPolicy extends React.Component {
  state = {
    accountName: '',
    accountNameError: null
  };

  onChangeAccountName = event => {
    // ToDo: validation for accountName may need to be completed through the API in order to avoid duplicate entries. Consider an onBlur check, along with a randomly generated name.
    const { value } = event.target;
    const errorMessage = fieldValidation.isEmpty(value) ? 'You must enter an account name' : '';

    this.setState(
      {
        accountName: value,
        accountNameError: errorMessage
      },
      () => this.isStepValid()
    );
  };

  isStepValid() {
    const { accountName, accountNameError } = this.state;
    const stepValid = accountNameError === '';
    const dispatchType = stepValid
      ? reduxTypes.account.ADD_ACCOUNT_WIZARD_STEP_POLICY
      : reduxTypes.account.INVALID_ACCOUNT_WIZARD_STEP_POLICY;

    store.dispatch({
      type: dispatchType,
      account: {
        accountName
      }
    });
  }

  render() {
    const { accountName, accountNameError } = this.state;
    const { policySetupConfig } = this.props;

    return (
      <Form horizontal>
        <FormField label="Account Name" error={accountNameError} errorMessage={accountNameError}>
          <Form.FormControl
            autoFocus
            type="text"
            name="accountName"
            value={accountName}
            placeholder="Enter a name for this account"
            onChange={this.onChangeAccountName}
          />
        </FormField>
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
  policySetupConfig: PropTypes.string
};

AccountWizardStepPolicy.defaultProps = {
  policySetupConfig: helpers.prettyPrintJson(awsPolicySetup)
};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizardStepPolicy = connect(mapStateToProps)(AccountWizardStepPolicy);

export { ConnectedAccountWizardStepPolicy as default, ConnectedAccountWizardStepPolicy, AccountWizardStepPolicy };
