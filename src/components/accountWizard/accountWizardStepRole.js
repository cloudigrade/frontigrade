import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon } from 'patternfly-react';
import { connect, reduxActions } from '../../redux/';
import helpers from '../../common/helpers';
import CopyField from '../copyField/copyField';
import Tooltip from '../tooltip/tooltip';

class AccountWizardStepRole extends React.Component {
  componentDidMount() {
    this.props.getSystemConfig();
  }

  render() {
    const { configuration } = this.props;

    return (
      <Form>
        <Form.FormGroup>
          <Grid.Col sm={12}>
            <ul>
              <li>
                Create a new role in the AWS{' '}
                <a href="https://console.aws.amazon.com/iam" target="_blank" rel="noopener noreferrer">
                  Identity and Access Management
                </a>{' '}
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
                <p>Paste this value into the Account ID field:</p>
                <CopyField id="account-id" value={configuration.aws_account_id || ''} />
              </li>
              <li>
                In the next step, select <strong>Cloud-Meter-policy</strong>
              </li>
              <li>
                Continue, name the role <strong>Cloud-Meter-role</strong>, and click <strong>Create role</strong>
              </li>
            </ul>
          </Grid.Col>
        </Form.FormGroup>
      </Form>
    );
  }
}

AccountWizardStepRole.propTypes = {
  getSystemConfig: PropTypes.func,
  configuration: PropTypes.shape({
    aws_account_id: PropTypes.string
  })
};

AccountWizardStepRole.defaultProps = {
  getSystemConfig: helpers.noop,
  configuration: {}
};

const mapDispatchToProps = dispatch => ({
  getSystemConfig: () => dispatch(reduxActions.systemConfig.getSystemConfig())
});

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizardStepRole = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWizardStepRole);

export { ConnectedAccountWizardStepRole as default, ConnectedAccountWizardStepRole, AccountWizardStepRole };
