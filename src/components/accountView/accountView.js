import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, EmptyState, Grid, ListView, Modal, Row, Spinner } from 'patternfly-react';
import { withRouter } from 'react-router-dom';
import _isEqual from 'lodash/isEqual';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';
import accountViewTypes from './accountViewConstants';
import AccountViewInstanceGraphs from './accountViewInstanceGraphs';
import ViewToolbar from '../viewToolbar/viewToolbar';
import AccountViewListItem from './accountViewListItem';

class AccountView extends React.Component {
  componentDidMount() {
    const { filter, getAccounts } = this.props;

    if (filter.query) {
      getAccounts(filter.query);
    }
  }

  componentDidUpdate(prevProps) {
    const { filter, getAccounts, updateAccounts } = this.props;

    if (
      (updateAccounts === true && updateAccounts !== prevProps.updateAccounts) ||
      !_isEqual(filter.query, prevProps.filter.query)
    ) {
      getAccounts(filter.query);
    }
  }

  onAddAccount = () => {
    store.dispatch({
      type: reduxTypes.account.ADD_ACCOUNT_SHOW
    });
  };

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

  onDetailView = item => {
    const { history } = this.props;

    if (Number.parseInt(item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES], 10) > 0) {
      history.push(`/accounts/${item[apiTypes.API_RESPONSE_ACCOUNTS_ID]}`);
    } else {
      const displayName = item[apiTypes.API_RESPONSE_ACCOUNTS_NAME] || item[apiTypes.API_RESPONSE_ACCOUNTS_ID];

      store.dispatch({
        type: reduxTypes.toastNotifications.TOAST_ADD,
        alertType: 'info',
        message: (
          <span>
            No instances available for <strong>{displayName}</strong>
          </span>
        )
      });
    }
  };

  onEditName = account => {
    store.dispatch({
      type: reduxTypes.account.EDIT_ACCOUNT_SHOW,
      account
    });
  };

  renderAccountsList() {
    const { accounts } = this.props;

    if (accounts.length) {
      return (
        <ListView className="cloudmeter-list-view">
          {accounts.map(item => (
            <AccountViewListItem
              item={item}
              key={item[apiTypes.API_RESPONSE_ACCOUNTS_ID]}
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
    const { accounts, error, errorMessage, filter, pending, updateAccounts, view, viewGlobal } = this.props;

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
        <div className="cloudmeter-view-container fadein">
          <Grid fluid>
            <Grid.Row>
              <Grid.Col xs={12}>
                <h1>Accounts</h1>
              </Grid.Col>
            </Grid.Row>
          </Grid>
          <ViewToolbar
            dateFields={accountViewTypes.dateFields.timeValues}
            filterFields={accountViewTypes.filterFields}
            onAddAccount={this.onAddAccount}
            onExport={null}
            sortFields={accountViewTypes.sortFields}
            view={view}
            viewGlobal={viewGlobal}
            {...filter}
          />
          <div className="cloudmeter-list-container">
            <AccountViewInstanceGraphs filter={filter} updateInstances={updateAccounts} />
            {this.renderAccountsList()}
          </div>
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
              <Button bsStyle="primary" bsSize="large" onClick={this.onAddAccount}>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  pending: PropTypes.bool,
  updateAccounts: PropTypes.bool,
  view: PropTypes.string,
  viewGlobal: PropTypes.string
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
  pending: false,
  updateAccounts: false,
  view: 'account',
  viewGlobal: 'accountGlobal'
};

const mapDispatchToProps = dispatch => ({
  getAccounts: query => dispatch(reduxActions.account.getAccounts(query))
});

const mapStateToProps = state => ({
  ...state.account.view,
  filter: {
    ...state.filter.account,
    ...state.filter.accountGlobal,
    ...{
      query: {
        ...state.filter.account.query,
        ...state.filter.accountGlobal.query
      }
    }
  }
});

const ConnectedAccountView = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountView)
);

export { ConnectedAccountView as default, ConnectedAccountView, AccountView };
