import React from 'react';
import PropTypes from 'prop-types';
import { FieldLevelHelp, Form, Grid } from 'patternfly-react';
import helpers from '../../common/helpers';
import { connect, reduxTypes, store } from '../../redux';
import apiTypes from '../../constants/apiConstants';
import { FormField, fieldValidation } from '../formField/formField';
import CopyField from '../copyField/copyField';

// FixMe: API - Hard Coded Values - "AwsAccount"
class AccountWizardStepPolicy extends React.Component {
  state = {
    accountName: '',
    accountNameError: null,
    resourceType: 'AwsAccount'
  };

  onChangeAccountName = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.doesntHaveMinimumCharacters(value, 1) ? 'You must name your account' : '';

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
    const { awsConfigPolicySetup, stepPolicyValid, stepPolicyErrorMessage } = this.props;

    let stepError = null;

    if (!stepPolicyValid) {
      stepError = stepPolicyErrorMessage;
    }

    let displayAwsConfigPolicySetup = awsConfigPolicySetup;

    if (displayAwsConfigPolicySetup) {
      displayAwsConfigPolicySetup = helpers.prettyPrintJson(displayAwsConfigPolicySetup);
    }

    const popover = <p>The name or alternative name for the account. Account names must be unique.</p>;

    const nameLabel = (
      <div className="cloudmeter-label-nowrap">
        Account Name <FieldLevelHelp content={popover} close />
      </div>
    );

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormField label={nameLabel} error={stepError || accountNameError} errorMessage={stepError || accountNameError}>
          <Form.FormControl
            autoFocus
            type="text"
            name="accountName"
            value={accountName}
            maxLength={256}
            onChange={this.onChangeAccountName}
          />
        </FormField>
        <Form.FormControl type="hidden" name="resourceType" value={resourceType} />
        <Form.FormGroup>
          <Grid.Col sm={12} className="padding-left">
            <ul>
              <li>
                Sign in to the{' '}
                <a href="https://console.aws.amazon.com/iam" target="_blank" rel="noopener noreferrer">
                  AWS Identity Access Management
                </a>{' '}
                (IAM) console.
              </li>
              <li>
                <p>Create a new policy, pasting the following content into the JSON text box.</p>
                <CopyField multiline value={displayAwsConfigPolicySetup} />
              </li>
              <li>Complete the process to create your new policy.</li>
            </ul>
          </Grid.Col>
        </Form.FormGroup>
      </Form>
    );
  }
}

AccountWizardStepPolicy.propTypes = {
  awsConfigPolicySetup: PropTypes.object,
  stepPolicyValid: PropTypes.bool,
  stepPolicyErrorMessage: PropTypes.string
};

AccountWizardStepPolicy.defaultProps = {
  awsConfigPolicySetup: {},
  stepPolicyValid: false,
  stepPolicyErrorMessage: null
};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizardStepPolicy = connect(mapStateToProps)(AccountWizardStepPolicy);

export { ConnectedAccountWizardStepPolicy as default, ConnectedAccountWizardStepPolicy, AccountWizardStepPolicy };
