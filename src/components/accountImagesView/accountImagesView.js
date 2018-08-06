import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Breadcrumb, EmptyState, Grid, ListView, Modal, Row, Spinner } from 'patternfly-react';
import { withRouter } from 'react-router-dom';
import _isEqual from 'lodash/isEqual';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';
import accountImagesViewTypes from './accountImagesViewConstants';
import ViewToolbar from '../viewToolbar/viewToolbar';
import AccountImagesViewInstanceGraphs from './accountImagesViewInstanceGraphs';
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
    const { images } = this.props;

    if (images.length) {
      return (
        <ListView className="cloudmeter-list-view">
          {images.map(item => (
            <AccountImagesViewListItem
              item={item}
              key={item[apiTypes.API_RESPONSE_IMAGES_ID]}
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
    const { account, images, error, errorMessage, filter, pending, view, viewGlobal } = this.props;
    const { accountId } = this.state;

    if (error) {
      return (
        <EmptyState>
          <Alert type="error">
            <span>Error retrieving images: {errorMessage}</span>
          </Alert>
          {this.renderPendingMessage()}
        </EmptyState>
      );
    }

    if (pending && !images.length) {
      return <div className="cloudmeter-view-container">{this.renderPendingMessage()}</div>;
    }

    // ToDo: Replace filterFields={[]} with filterFields={accountImagesViewTypes.filterFields} when the name filter is active.
    if (images.length || filter.activeFilters.length) {
      return (
        <div className="cloudmeter-view-container fadein">
          <Grid fluid>
            <Grid.Row>
              <Grid.Col xs={12}>
                <Breadcrumb title className="cloudmeter-breadcrumb">
                  <Breadcrumb.Item onClick={e => this.backToAccounts(e)}>Accounts</Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    <strong>
                      {account[apiTypes.API_RESPONSE_ACCOUNT_NAME] ||
                        account[apiTypes.API_RESPONSE_ACCOUNT_ACCOUNT_ID] ||
                        `Account ${account[apiTypes.API_RESPONSE_ACCOUNT_ID] || ''}`}
                    </strong>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Grid.Col>
            </Grid.Row>
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
          <div className="cloudmeter-list-container">
            {/\d/.test(accountId) && <AccountImagesViewInstanceGraphs filterId={accountId} filter={filter} />}
            {this.renderList()}
          </div>
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
  account: PropTypes.object,
  images: PropTypes.array,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  filter: PropTypes.shape({
    activeFilters: PropTypes.array,
    query: PropTypes.object
  }),
  getAccount: PropTypes.func,
  getAccountImages: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  pending: PropTypes.bool,
  view: PropTypes.string,
  viewGlobal: PropTypes.string
};

AccountImagesView.defaultProps = {
  account: {},
  images: [],
  error: false,
  errorMessage: null,
  filter: {
    activeFilters: [],
    query: {}
  },
  getAccount: helpers.noop,
  getAccountImages: helpers.noop,
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

const mapStateToProps = state => ({
  ...state.accountImages.view,
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

const ConnectedAccountImagesView = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountImagesView)
);

export { ConnectedAccountImagesView as default, ConnectedAccountImagesView, AccountImagesView };
