import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux/';
import { FormField, fieldValidation } from '../formField/formField';
import CopyField from '../copyField/copyField';

class AccountWizardStepOne extends React.Component {
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

    if (stepValid) {
      store.dispatch({
        type: reduxTypes.account.ADD_ACCOUNT_WIZARD_STEPONE,
        account: {
          accountName
        }
      });
    } else {
      store.dispatch({
        type: reduxTypes.account.INVALID_ACCOUNT_WIZARD_STEPONE
      });
    }
  }

  render() {
    const { accountName, accountNameError } = this.state;
    const { policySetupConfig } = this.props;

    return (
      <React.Fragment>
        <FormField label="Account Name" error={accountNameError} errorMessage={accountNameError}>
          <Form.FormControl
            type="text"
            name="accountName"
            value={accountName}
            placeholder="Enter a name for this account"
            onChange={this.onChangeAccountName}
          />
        </FormField>
        <br />
        <br />
        <Form.FormGroup>
          <Grid.Col sm={12}>
            <ul>
              <li>
                Create a new policy in the AWS{' '}
                <a href="https://console.aws.amazon.com/iam" target="_blank" rel="noopener noreferrer">
                  Identity and Access Management
                </a>
              </li>
              <li>
                <p>In the JSON editor replace the contents with:</p>
                <CopyField multiline value={policySetupConfig} />
              </li>
              <li>
                Click <strong>Review policy</strong>.
              </li>
              <li>
                Name the policy <strong>Red-Hat-Cloud-Meter-policy</strong> and click <strong>Create policy</strong>.
              </li>
            </ul>
          </Grid.Col>
        </Form.FormGroup>
      </React.Fragment>
    );
  }
}

AccountWizardStepOne.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  policySetupConfig: PropTypes.string.isRequired
};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizardStepOne = connect(mapStateToProps)(AccountWizardStepOne);

export { ConnectedAccountWizardStepOne as default, ConnectedAccountWizardStepOne, AccountWizardStepOne };
