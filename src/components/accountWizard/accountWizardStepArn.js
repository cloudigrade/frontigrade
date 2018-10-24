import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux';
import apiTypes from '../../constants/apiConstants';
import { FormField } from '../formField/formField';

class AccountWizardStepArn extends React.Component {
  state = {
    accountArn: '',
    accountArnError: null
  };

  onChangeAccountArn = event => {
    const { value } = event.target;
    const errorMessage = !/^\s*arn:aws:/.test(value) ? 'You must enter a valid ARN' : '';

    this.setState(
      {
        accountArn: value,
        accountArnError: errorMessage
      },
      () => this.isStepValid()
    );
  };

  // ToDo: when form valid evaluate moving to next step onEnter key-press event
  onSubmit = event => {
    event.preventDefault();
  };

  isStepValid() {
    const { accountArn, accountArnError } = this.state;
    const stepValid = accountArnError === '';
    const dispatchType = stepValid
      ? reduxTypes.account.ADD_ACCOUNT_WIZARD_STEP_ARN
      : reduxTypes.account.INVALID_ACCOUNT_WIZARD_STEP_ARN;

    const trimmedArn = stepValid ? accountArn.trim() : accountArn;

    store.dispatch({
      type: dispatchType,
      account: {
        [apiTypes.API_SUBMIT_ACCOUNT_ARN]: trimmedArn
      }
    });
  }

  render() {
    const { stepArnValid, stepArnErrorMessage } = this.props;
    const { accountArn, accountArnError } = this.state;

    let stepError = null;

    if (!stepArnValid) {
      stepError = stepArnErrorMessage;
    }

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <Form.FormGroup>
          <Grid.Col sm={12}>
            <ul className="no-margin-bottom">
              <li>
                In the <strong>IAM</strong> console, click your new role.
              </li>
              <li>
                In the <strong>Summary</strong> screen, copy the <strong>Role ARN</strong> and paste it in the following{' '}
                <strong>ARN</strong> field.
              </li>
            </ul>
          </Grid.Col>
        </Form.FormGroup>
        <FormField
          label="ARN"
          error={stepError || accountArnError}
          errorMessage={stepError || accountArnError}
          colLabel={2}
          colField={10}
        >
          <Form.FormControl type="text" name="arn" value={accountArn} onChange={this.onChangeAccountArn} />
          <Form.HelpBlock>ex: arn:aws:iam::123456789012:role/Cloud-Meter-role</Form.HelpBlock>
        </FormField>
      </Form>
    );
  }
}

AccountWizardStepArn.propTypes = {
  stepArnValid: PropTypes.bool,
  stepArnErrorMessage: PropTypes.string
};

AccountWizardStepArn.defaultProps = {
  stepArnValid: false,
  stepArnErrorMessage: null
};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizardStepArn = connect(mapStateToProps)(AccountWizardStepArn);

export { ConnectedAccountWizardStepArn as default, ConnectedAccountWizardStepArn, AccountWizardStepArn };
