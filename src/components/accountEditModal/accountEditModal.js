import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Form, Grid, Icon, Modal, Spinner } from 'patternfly-react';
import { connect, reduxActions, reduxTypes, store } from '../../redux/';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import { FormField, fieldValidation } from '../formField/formField';

// FixMe: API - Hard Coded Values - "AwsAccount"
class AccountEditModal extends React.Component {
  state = {
    accountName: '',
    accountNameError: null,
    resourceType: 'AwsAccount',
    formTouched: false,
    formValid: false
  };

  // FixMe: API - inconsistent property naming, no underscore in "resourcetype"
  // FixMe: API - inconsistent enum for "resourcetype", account summary response uses "type":"aws" vs "AwsAccount"
  // FixMe: API - inconsistent property naming for ARN, /api/v1/report/accounts/ labels it "arn" vs /api/v1/account/:id/ "account_arn"
  // FixMe: API - patch requires additional property of "resourcetype", an id is also being used...
  // FixMe: API - patch not allowed by preflight, temporarily using put instead
  static getDerivedStateFromProps(props, state) {
    let initialState = null;

    if (!state.formTouched && props.account && props.account[apiTypes.API_RESPONSE_ACCOUNTS_NAME]) {
      initialState = {
        accountName: props.account[apiTypes.API_RESPONSE_ACCOUNTS_NAME],
        accountNameError: ''
      };
    }

    return initialState;
  }

  onCancel = () => {
    this.setState(
      {
        accountName: '',
        accountNameError: null,
        resourceType: 'AwsAccount',
        formTouched: false,
        formValid: false
      },
      () => {
        store.dispatch({
          type: reduxTypes.account.EDIT_ACCOUNT_HIDE
        });
      }
    );
  };

  onChangeAccountName = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.doesntHaveMinimumCharacters(value, 3)
      ? 'Enter minimum of 3 characters for account name'
      : '';

    this.setState(
      {
        accountName: value,
        accountNameError: errorMessage,
        formTouched: true
      },
      () => this.isFormValid()
    );
  };

  onSubmit = event => {
    const { accountName, resourceType, formValid } = this.state;
    const { account, updateAccount } = this.props;

    event.preventDefault();

    if (formValid) {
      updateAccount(account[apiTypes.API_RESPONSE_ACCOUNTS_ID], {
        [apiTypes.API_SUBMIT_ACCOUNT_NAME]: accountName,
        [apiTypes.API_SUBMIT_ACCOUNT_RESOURCE_TYPE]: resourceType,
        [apiTypes.API_SUBMIT_ACCOUNT_ARN]: account[apiTypes.API_RESPONSE_ACCOUNTS_ARN]
      }).then(
        () => {
          this.onCancel();

          store.dispatch({
            type: reduxTypes.toastNotifications.TOAST_ADD,
            alertType: 'success',
            message: (
              <span>
                Account <strong>{accountName}</strong> successfully updated.
              </span>
            )
          });

          store.dispatch({
            type: reduxTypes.account.UPDATE_ACCOUNTS
          });
        },
        () => {
          this.setState(
            {
              formValid: false
            },
            () => {
              if (!this.props.show) {
                store.dispatch({
                  type: reduxTypes.toastNotifications.TOAST_ADD,
                  alertType: 'error',
                  header: `Error Updating Account`,
                  message: `${this.props.errorMessage}`
                });
              }
            }
          );
        }
      );
    }
  };

  isFormValid() {
    const { accountName, accountNameError } = this.state;
    const { account } = this.props;
    const formValid =
      fieldValidation.isEmpty(accountNameError) && accountName !== account[apiTypes.API_RESPONSE_ACCOUNTS_NAME];

    this.setState({
      formValid
    });
  }

  renderErrorMessage() {
    const { error, errorMessage, pending } = this.props;

    if (error && !pending) {
      return (
        <Alert type="error" onDismiss={this.errorDismissed}>
          <strong>Error</strong> {errorMessage}
        </Alert>
      );
    }

    return null;
  }

  renderPendingMessage() {
    const { pending } = this.props;

    if (pending) {
      return (
        <React.Fragment>
          <Spinner loading size="lg" className="blank-slate-pf-icon" />
          <div className="text-center">Account updating...</div>
        </React.Fragment>
      );
    }

    return null;
  }

  render() {
    const { account, pending, show } = this.props;
    const { accountName, accountNameError, formTouched, formValid } = this.state;
    const displayName = fieldValidation.isEmpty(account[apiTypes.API_RESPONSE_ACCOUNTS_NAME])
      ? account[apiTypes.API_RESPONSE_ACCOUNTS_ID]
      : account[apiTypes.API_RESPONSE_ACCOUNTS_NAME];

    return (
      <Modal show={show} onHide={this.cancel}>
        <Modal.Header>
          <Button className="close" onClick={this.onCancel} aria-hidden="true" aria-label="Close">
            <Icon type="pf" name="close" />
          </Button>
          <Modal.Title>{`Edit Account - ${displayName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body />
        <Grid fluid>
          {this.renderPendingMessage()}
          {this.renderErrorMessage()}
          {!pending && (
            <Form method="post" horizontal onSubmit={this.onSubmit} autoComplete="off">
              <FormField
                id="edit-account-name"
                label="Account Name"
                error={accountNameError}
                errorMessage={accountNameError}
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
            </Form>
          )}
        </Grid>
        <Modal.Footer>
          <Button bsStyle="default" className="btn-cancel" onClick={this.onCancel}>
            Cancel
          </Button>
          <Button
            bsStyle="primary"
            type="submit"
            onClick={this.onSubmit}
            disabled={pending || !formTouched || !formValid}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AccountEditModal.propTypes = {
  account: PropTypes.object.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  pending: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  updateAccount: PropTypes.func
};

AccountEditModal.defaultProps = {
  error: false,
  errorMessage: null,
  pending: false,
  updateAccount: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  updateAccount: (id, data) => dispatch(reduxActions.account.updateAccount(id, data))
});

const mapStateToProps = state => ({ ...state.accountEditModal });

const ConnectedAccountViewEditModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountEditModal);

export { ConnectedAccountViewEditModal as default, ConnectedAccountViewEditModal, AccountEditModal };
