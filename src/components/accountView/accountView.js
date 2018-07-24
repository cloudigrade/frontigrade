import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, EmptyState, Grid, ListView, Modal, Row, Spinner } from 'patternfly-react';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import _isEqual from 'lodash/isEqual';
import helpers from '../../common/helpers';
import AccountViewListItem from './accountViewListItem';
import AccountViewToolbar from './accountViewToolbar';

class AccountView extends React.Component {
  componentDidMount() {
    const { filter, getAccounts } = this.props;

    if (filter.query) {
      getAccounts(filter.query);
    }
  }

  componentDidUpdate(prevProps) {
    const { filter, getAccounts } = this.props;

    if (!_isEqual(filter.query, prevProps.filter.query)) {
      getAccounts(filter.query);
    }
  }

  onArchive = () => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_ADD,
      alertType: 'warning',
      message: 'Archive not yet enabled for accounts'
    });
  };

  onClearFilters = () => {
    store.dispatch({
      type: reduxTypes.filter.TOOLBAR_CLEAR_FILTERS,
      view: 'account'
    });
  };

  onDetailView = () => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_ADD,
      alertType: 'warning',
      message: 'Detail view not yet enabled for accounts'
    });
  };

  onEditName = () => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_ADD,
      alertType: 'warning',
      message: 'Editing name not yet enabled for accounts'
    });
  };

  showAccountWizard = () => {
    store.dispatch({
      type: reduxTypes.account.ADD_ACCOUNT_SHOW
    });
  };

  renderAccountsList() {
    const { accounts } = this.props;

    if (accounts.length) {
      return (
        <ListView className="quipicords-list-view">
          {accounts.map(item => (
            <AccountViewListItem
              item={item}
              key={item.id}
              onDetail={this.onDetailView}
              onEdit={this.onEditName}
              onArchive={this.onArchive}
            />
          ))}
        </ListView>
      );
    }

    return (
      <EmptyState className="list-view-blank-slate">
        <EmptyState.Title>No Results Match the Filter Criteria</EmptyState.Title>
        <EmptyState.Info>The active filters are hiding all items.</EmptyState.Info>
        <EmptyState.Action>
          <Button bsStyle="link" onClick={this.onClearFilters}>
            Clear Filters
          </Button>
        </EmptyState.Action>
      </EmptyState>
    );
  }

  renderPendingMessage() {
    const { pending } = this.props;

    if (pending) {
      return (
        <Modal bsSize="lg" backdrop={false} show animation={false}>
          <Modal.Body>
            <Spinner loading size="lg" className="blank-slate-pf-icon" />
            <div className="text-center">Loading...</div>
          </Modal.Body>
        </Modal>
      );
    }

    return null;
  }

  render() {
    const { accounts, error, errorMessage, filter, pending } = this.props;

    if (error) {
      return (
        <EmptyState>
          <Alert type="error">
            <span>Error retrieving accounts: {errorMessage}</span>
          </Alert>
          {this.renderPendingMessage()}
        </EmptyState>
      );
    }

    if (pending && !accounts.length) {
      return <div className="cloudmeter-view-container">{this.renderPendingMessage()}</div>;
    }

    if (accounts.length || filter.activeFilters.length) {
      return (
        <div className="cloudmeter-view-container">
          <Grid fluid>
            <Grid.Row>
              <Grid.Col xs={12}>
                <h1>Accounts</h1>
              </Grid.Col>
            </Grid.Row>
          </Grid>
          <AccountViewToolbar {...filter} />
          <div className="cloudmeter-list-container">{this.renderAccountsList()}</div>
          {this.renderPendingMessage()}
        </div>
      );
    }

    return (
      <Grid fluid>
        <Row>
          <EmptyState className="full-page-blank-slate fadein">
            <EmptyState.Icon />
            <EmptyState.Title>Welcome to Cloud Meter</EmptyState.Title>
            <EmptyState.Info>Add an AWS account to monitor usage.</EmptyState.Info>
            <EmptyState.Action>
              <Button bsStyle="primary" bsSize="large" onClick={this.showAccountWizard}>
                Add Account
              </Button>
            </EmptyState.Action>
          </EmptyState>
        </Row>
      </Grid>
    );
  }
}

AccountView.propTypes = {
  accounts: PropTypes.array,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  filter: PropTypes.shape({
    activeFilters: PropTypes.array,
    query: PropTypes.object
  }),
  getAccounts: PropTypes.func,
  pending: PropTypes.bool
};

AccountView.defaultProps = {
  accounts: [],
  error: false,
  errorMessage: null,
  filter: {
    activeFilters: [],
    query: {}
  },
  getAccounts: helpers.noop,
  pending: false
};

const mapDispatchToProps = dispatch => ({
  getAccounts: query => dispatch(reduxActions.account.getAccounts(query))
});

const mapStateToProps = state => ({ ...state.account.view, filter: state.filter.account });

const ConnectedAccountView = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountView);

export { ConnectedAccountView as default, ConnectedAccountView, AccountView };
