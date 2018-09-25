import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Grid, Icon, Modal, Spinner } from 'patternfly-react';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import { fieldValidation } from '../formField/formField';

const initialState = {
  accountId: null,
  displayName: ''
};

class AccountDeleteModal extends React.Component {
  state = {
    ...initialState
  };

  onCancel = () => {
    this.setState(
      {
        ...initialState
      },
      () => {
        store.dispatch({
          type: reduxTypes.account.DELETE_ACCOUNT_HIDE
        });
      }
    );
  };

  onSubmit = event => {
    const { accountId, displayName } = this.state;
    const { deleteAccount } = this.props;

    event.preventDefault();

    deleteAccount(accountId).then(
      () => {
        this.onCancel();

        store.dispatch({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'success',
          message: (
            <span>
              Account <strong>{displayName}</strong> successfully deleted.
            </span>
          )
        });

        store.dispatch({
          type: reduxTypes.account.UPDATE_ACCOUNTS
        });
      },
      () => {
        // eslint-disable-next-line react/destructuring-assignment
        if (Math.floor(this.props.errorStatus / 100) === 5) {
          this.onCancel();
          return;
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (!this.props.show) {
          store.dispatch({
            type: reduxTypes.toastNotifications.TOAST_ADD,
            alertType: 'error',
            header: `Error Deleting Account ${displayName}`,
            message: `${this.props.errorMessage}` // eslint-disable-line react/destructuring-assignment
          });
        }
      }
    );
  };

  static getDerivedStateFromProps(props) {
    let updateInitialState = null;

    if (props.account && props.account[apiTypes.API_RESPONSE_ACCOUNTS_NAME]) {
      const accountId = props.account[apiTypes.API_RESPONSE_ACCOUNTS_ID];
      const accountName = props.account[apiTypes.API_RESPONSE_ACCOUNTS_NAME];
      const displayName = fieldValidation.isEmpty(accountName) ? accountId : accountName;

      updateInitialState = {
        accountId,
        displayName
      };
    }

    return updateInitialState;
  }

  renderErrorMessage() {
    const { error, errorMessage, pending } = this.props;

    if (error && !pending) {
      return (
        <Alert type="error" onDismiss={this.errorDismissed}>
          <strong>Error</strong>: {errorMessage}
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
          <div className="text-center">Deleting account...</div>
        </React.Fragment>
      );
    }

    return null;
  }

  render() {
    const { displayName } = this.state;
    const { pending, show } = this.props;

    return (
      <Modal show={show} onHide={this.cancel}>
        <Modal.Header>
          <Button className="close" onClick={this.onCancel} aria-hidden="true" aria-label="Close">
            <Icon type="pf" name="close" />
          </Button>
          <Modal.Title>{`Delete Account - ${displayName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body />
        <Grid fluid>
          {this.renderPendingMessage()}
          {this.renderErrorMessage()}
          {!pending && <p>Are you sure you want to delete the account {displayName}?</p>}
        </Grid>
        <Modal.Footer>
          <Button bsStyle="default" className="btn-cancel" onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle="primary" type="submit" onClick={this.onSubmit} disabled={pending}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AccountDeleteModal.propTypes = {
  account: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorStatus: PropTypes.number,
  pending: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  deleteAccount: PropTypes.func
};

AccountDeleteModal.defaultProps = {
  error: false,
  errorMessage: null,
  errorStatus: null,
  pending: false,
  deleteAccount: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  deleteAccount: id => dispatch(reduxActions.account.deleteAccount(id))
});

const mapStateToProps = state => ({ ...state.accountEdit.del });

const ConnectedAccountDeleteModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDeleteModal);

export { ConnectedAccountDeleteModal as default, ConnectedAccountDeleteModal, AccountDeleteModal };
