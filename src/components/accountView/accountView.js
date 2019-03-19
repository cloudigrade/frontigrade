import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, EmptyState, Grid, ListView, Modal, Row, Spinner } from 'patternfly-react';
import { Breadcrumb, BreadcrumbHeading } from '@patternfly/react-core';
import { withRouter } from 'react-router-dom';
import _isEqual from 'lodash/isEqual';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';
import accountViewTypes from './accountViewConstants';
import AccountGraphCard from '../accountGraphCard/accountGraphCard';
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

  onClearResetFilters = () => {
    const { view, viewGlobal } = this.props;

    store.dispatch({
      type: reduxTypes.filter.TOOLBAR_CLEAR_FILTERS,
      view,
      viewGlobal
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

  onDelete = account => {
    store.dispatch({
      type: reduxTypes.account.DELETE_ACCOUNT_SHOW,
      account
    });
  };

  onEditName = account => {
    store.dispatch({
      type: reduxTypes.account.EDIT_ACCOUNT_SHOW,
      account
    });
  };

  renderAccountsList() {
    const { accounts, filter, view, viewGlobal } = this.props;

    if (accounts.length) {
      const itemHasImagesClassName = item =>
        Number.parseInt(item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES], 10) > 0
          ? 'cloudmeter-accountview-list-view-item-active'
          : '';

      return (
        <React.Fragment>
          <AccountGraphCard filter={filter} view={view} viewGlobal={viewGlobal} />
          <Grid fluid>
            <Grid.Row className="row-cards-pf">
              <Grid.Col xs={12}>
                <Card className="cloudmeter-list-view-card">
                  <ListView className="cloudmeter-list-view">
                    {accounts.map(item => (
                      <AccountViewListItem
                        className={itemHasImagesClassName(item)}
                        filter={filter}
                        item={item}
                        key={item[apiTypes.API_RESPONSE_ACCOUNTS_ID]}
                        onDelete={this.onDelete}
                        onDetail={this.onDetailView}
                        onEdit={this.onEditName}
                      />
                    ))}
                  </ListView>
                </Card>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </React.Fragment>
      );
    }

    if (filter.activeFilters && filter.activeFilters.length) {
      return (
        <EmptyState className="list-view-blank-slate">
          <EmptyState.Title>No Results Match the Filter Criteria</EmptyState.Title>
          <EmptyState.Info>The active filters are hiding all items.</EmptyState.Info>
          <EmptyState.Action>
            <Button bsStyle="link" onClick={this.onClearResetFilters}>
              Clear Filters
            </Button>
          </EmptyState.Action>
        </EmptyState>
      );
    }

    return null;
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
    const { accounts, error, errorMessage, filter, pending, view, viewGlobal } = this.props;

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

    if (accounts.length || (filter.activeFilters && filter.activeFilters.length)) {
      return (
        <div className="cloudmeter-view-container fadein">
          <Grid fluid className="cloudmeter-app-header">
            <Breadcrumb className="cloudmeter-breadcrumb">
              <BreadcrumbHeading aria-current="page">Accounts</BreadcrumbHeading>
            </Breadcrumb>
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
            <EmptyState.Info>
              Cloud Meter collects usage analytics data for Red Hat cloud infrastructure products in your environments.
            </EmptyState.Info>
            <EmptyState.Info>Add an AWS account to get started.</EmptyState.Info>
            <EmptyState.Info>Adding an account includes creating a specialized IAM profile and role.</EmptyState.Info>
            <EmptyState.Info>
              For more information about the IAM steps in this process, see the{' '}
              <a
                href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                IAM User Guide
              </a>
              .
            </EmptyState.Info>
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
    graphRhelValue: null,
    graphOpenshiftValue: null,
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
