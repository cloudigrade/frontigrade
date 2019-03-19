import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Alert, Button, Card, EmptyState, Grid, ListView, Modal, Row, Spinner } from 'patternfly-react';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import _isEqual from 'lodash/isEqual';
import { connectRouter, reduxActions, reduxSelectors, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';
import accountImagesViewTypes from './accountImagesViewConstants';
import ViewToolbar from '../viewToolbar/viewToolbar';
import AccountGraphCard from '../accountGraphCard/accountGraphCard';
import AccountImagesViewListItem from './accountImagesViewListItem';

class AccountImagesView extends React.Component {
  state = {
    accountId: null
  };

  componentDidMount() {
    this.loadApi();
  }

  componentDidUpdate(prevProps) {
    const { filter, match } = this.props;

    if (
      match.params.accountId !== prevProps.match.params.accountId ||
      !_isEqual(filter.query, prevProps.filter.query)
    ) {
      this.loadApi();
    }
  }

  onAddAccount = () => {
    this.backToAccounts();

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

  onClearResetDate = () => {
    const { view, viewGlobal } = this.props;

    store.dispatch({
      type: reduxTypes.filter.TOOLBAR_CLEAR_DATE_TYPE,
      view,
      viewGlobal
    });
  };

  /**
   * FixMe: API - issue
   * The API requires the account id be passed as a query param, counter to other account API calls.
   * In order to emulate consistent behavior we handle that query bundle at the service level instead,
   * see services/accountServices.js "getAccountImages"
   */
  loadApi() {
    const { filter, getAccount, getAccountImages, match } = this.props;
    const accountId = match && Number.parseInt(match.params && match.params.accountId, 10);

    if (!Number.isNaN(accountId)) {
      this.setState({ accountId }, () => {
        getAccount(accountId);

        if (filter.query) {
          getAccountImages(accountId, filter.query);
        }
      });
    } else {
      this.backToAccounts();
    }
  }

  backToAccounts(event = {}) {
    const { history } = this.props;

    if (event.preventDefault) {
      event.preventDefault();
    }

    history.push('/accounts/');
  }

  renderList() {
    const { accountId } = this.state;
    const { account, filter, images, view, viewGlobal } = this.props;

    if (images.length) {
      return (
        <React.Fragment>
          {/\d/.test(accountId) && (
            <AccountGraphCard filterId={accountId} filter={filter} view={view} viewGlobal={viewGlobal} />
          )}
          <Grid fluid>
            <Grid.Row className="row-cards-pf">
              <Grid.Col xs={12}>
                <Card className="cloudmeter-list-view-card">
                  <ListView className="cloudmeter-list-view">
                    {images.map(item => (
                      <AccountImagesViewListItem
                        filter={filter}
                        item={item}
                        key={item[apiTypes.API_RESPONSE_IMAGES_ID]}
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

    const timestamp = (account.data && account.data[apiTypes.API_RESPONSE_ACCOUNT_UPDATED_AT]) || null;

    return (
      <EmptyState className="list-view-blank-slate">
        <EmptyState.Title>No Results Available</EmptyState.Title>
        {timestamp && <EmptyState.Info>Last updated {moment(timestamp).format('h:mmA, MMMM Do YYYY')}</EmptyState.Info>}
        <EmptyState.Action>
          {!filter.dateValueDefault && (
            <Button bsStyle="link" onClick={e => this.onClearResetDate(e)}>
              Reset Date Selector
            </Button>
          )}
          <Button bsStyle="link" onClick={e => this.backToAccounts(e)}>
            Return to Accounts
          </Button>
        </EmptyState.Action>
      </EmptyState>
    );
  }

  renderPendingMessage() {
    const { account, pending } = this.props;

    if (account.pending || pending) {
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
    const { account, error, errorMessage, fulfilled, filter, pending, view, viewGlobal } = this.props;

    if (account.error || error) {
      return (
        <EmptyState>
          <Alert type="error">
            <span>Error retrieving images: {errorMessage}</span>
          </Alert>
          {this.renderPendingMessage()}
        </EmptyState>
      );
    }

    if (account.pending || pending) {
      return <div className="cloudmeter-view-container">{this.renderPendingMessage()}</div>;
    }

    // ToDo: Replace filterFields={[]} with filterFields={accountImagesViewTypes.filterFields} when the name filter is active.
    if ((account.fulfilled && fulfilled) || (filter.activeFilters && filter.activeFilters.length)) {
      return (
        <div className="cloudmeter-view-container fadein">
          <Grid fluid className="cloudmeter-app-header">
            <Breadcrumb className="cloudmeter-breadcrumb">
              <BreadcrumbItem onClick={e => this.backToAccounts(e)} to="#">
                Accounts
              </BreadcrumbItem>
              <BreadcrumbItem aria-current="page" isActive>
                {(account.data &&
                  (account.data[apiTypes.API_RESPONSE_ACCOUNT_NAME] ||
                    account.data[apiTypes.API_RESPONSE_ACCOUNT_ACCOUNT_ID] ||
                    `Account ${account.data[apiTypes.API_RESPONSE_ACCOUNT_ID] || ''}`)) ||
                  ''}
              </BreadcrumbItem>
            </Breadcrumb>
          </Grid>
          <ViewToolbar
            dateFields={accountImagesViewTypes.dateFields.timeValues}
            filterFields={[]}
            onAddAccount={this.onAddAccount}
            onExport={null}
            sortFields={accountImagesViewTypes.sortFields}
            view={view}
            viewGlobal={viewGlobal}
            {...filter}
          />
          <div className="cloudmeter-list-container">{this.renderList()}</div>
          {this.renderPendingMessage()}
        </div>
      );
    }

    return (
      <Grid fluid>
        <Row>
          <EmptyState className="full-page-blank-slate">
            <EmptyState.Icon />
            <EmptyState.Title>No Images Available</EmptyState.Title>
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

AccountImagesView.propTypes = {
  account: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.bool,
    fulfilled: PropTypes.bool,
    pending: PropTypes.bool
  }),
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  filter: PropTypes.shape({
    activeFilters: PropTypes.array,
    query: PropTypes.object
  }),
  fulfilled: PropTypes.bool,
  getAccount: PropTypes.func,
  getAccountImages: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  images: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  pending: PropTypes.bool,
  view: PropTypes.string,
  viewGlobal: PropTypes.string
};

AccountImagesView.defaultProps = {
  account: {},
  error: false,
  errorMessage: null,
  filter: {
    activeFilters: [],
    query: {}
  },
  fulfilled: false,
  getAccount: helpers.noop,
  getAccountImages: helpers.noop,
  images: [],
  match: {
    params: {}
  },
  pending: false,
  view: 'accountImages',
  viewGlobal: 'accountGlobal'
};

const mapDispatchToProps = dispatch => ({
  getAccount: id => dispatch(reduxActions.account.getAccount(id)),
  getAccountImages: (id, query) => dispatch(reduxActions.account.getAccountImages(id, query))
});

const makeMapStateToProps = () => {
  const getImagesView = reduxSelectors.accountImages.makeImagesView();

  return (state, props) => ({
    ...getImagesView(state, props),
    filter: {
      ...state.filter.accountImages,
      ...state.filter.accountGlobal,
      ...{
        query: {
          ...state.filter.accountImages.query,
          ...state.filter.accountGlobal.query
        }
      }
    }
  });
};

const ConnectedAccountImagesView = connectRouter(makeMapStateToProps, mapDispatchToProps)(AccountImagesView);

export { ConnectedAccountImagesView as default, ConnectedAccountImagesView, AccountImagesView };
