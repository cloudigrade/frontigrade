import React from 'react';
import { Form, Grid, Icon } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux';
import { FormField, fieldValidation } from '../formField/formField';
import Tooltip from '../tooltip/tooltip';

class AccountWizardStepArn extends React.Component {
  state = {
    arn: '',
    arnError: null
  };

  // ToDo: validation for ARN needs to be updated from empty to regex.
  onChangeArn = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.isEmpty(value) ? 'You must enter a valid ARN' : '';

    this.setState(
      {
        arn: value,
        arnError: errorMessage
      },
      () => this.isStepValid()
    );
  };

  isStepValid() {
    const { arn, arnError } = this.state;
    const stepValid = arnError === '';
    const dispatchType = stepValid
      ? reduxTypes.account.ADD_ACCOUNT_WIZARD_STEP_ARN
      : reduxTypes.account.INVALID_ACCOUNT_WIZARD_STEP_ARN;

    store.dispatch({
      type: dispatchType,
      account: {
        arn
      }
    });
  }

  render() {
    const { arn, arnError } = this.state;

    return (
      <Form horizontal>
        <Form.FormGroup>
          <Grid.Col sm={12}>
            <ul className="no-margin-bottom">
              <li>
                Click <strong>Cloud-Meter-role</strong>.{' '}
                <Tooltip
                  delayShow={100}
                  popover={
                    <ul className="cloudmeter-popover-list">
                      <li>
                        In <strong>IAM</strong> go to the <strong>Roles</strong> tab
                      </li>
                      <li>
                        Click <strong>Cloud-Meter-role</strong>
                      </li>
                    </ul>
                  }
                >
                  <Icon type="pf" name="info" size="large" />
                  <span className="sr-only">Steps when selecting a role</span>
                </Tooltip>
              </li>
              <li>
                Copy the <strong>Role ARN</strong> and paste it in the ARN field.
              </li>
            </ul>
          </Grid.Col>
        </Form.FormGroup>
        <FormField label="ARN" error={arnError} errorMessage={arnError} colLabel={2} colField={10}>
          <Form.FormControl type="text" name="arn" value={arn} placeholder="Enter an ARN" onChange={this.onChangeArn} />
          <Form.HelpBlock>ex: arn:aws:iam::123456789012:role/Cloud-Meter-role</Form.HelpBlock>
        </FormField>
      </Form>
    );
  }
}

AccountWizardStepArn.propTypes = {};

AccountWizardStepArn.defaultProps = {};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizardStepArn = connect(mapStateToProps)(AccountWizardStepArn);

export { ConnectedAccountWizardStepArn as default, ConnectedAccountWizardStepArn, AccountWizardStepArn };
