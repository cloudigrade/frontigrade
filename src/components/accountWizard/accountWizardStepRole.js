import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';
import { connect, reduxActions } from '../../redux';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import CopyField from '../copyField/copyField';

class AccountWizardStepRole extends React.Component {
  componentDidMount() {
    const { getSystemConfig } = this.props;

    getSystemConfig();
  }

  // ToDo: when form valid evaluate moving to next step onEnter key-press event
  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { awsAccountId } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.FormGroup>
          <Grid.Col sm={12}>
            <ul>
              <li>
                In the <strong>IAM</strong> console, create a new role.
              </li>
              <li>
                Choose <strong>Another AWS Account</strong> as the trusted entity type.
              </li>
              <li>
                <p>
                  Paste the following content into the <strong>Account ID</strong> field.
                </p>
                <CopyField id="account-id" value={awsAccountId || ''} />
              </li>
              <li>In the permissions step, attach your new policy. Complete the process to create your new role.</li>
            </ul>
          </Grid.Col>
        </Form.FormGroup>
      </Form>
    );
  }
}

AccountWizardStepRole.propTypes = {
  getSystemConfig: PropTypes.func,
  awsAccountId: PropTypes.string
};

AccountWizardStepRole.defaultProps = {
  getSystemConfig: helpers.noop,
  awsAccountId: null
};

const mapDispatchToProps = dispatch => ({
  getSystemConfig: () => dispatch(reduxActions.systemConfig.getSystemConfig())
});

const mapStateToProps = state => ({
  awsAccountId: state.accountWizard.configuration[apiTypes.API_SUBMIT_ACCOUNT_AWS_ID]
});

const ConnectedAccountWizardStepRole = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWizardStepRole);

export { ConnectedAccountWizardStepRole as default, ConnectedAccountWizardStepRole, AccountWizardStepRole };
