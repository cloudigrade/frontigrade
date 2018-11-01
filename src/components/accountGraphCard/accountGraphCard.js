import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGrid, Label as PFLabel, SparklineChart, Spinner } from 'patternfly-react';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import graphHelpers from '../../common/graphHelpers';

class AccountGraphCard extends React.Component {
  componentDidMount() {
    const { filter, filterId, getAccountInstances } = this.props;

    if (filter.query) {
      getAccountInstances(filterId, filter.query);
    }
  }

  componentDidUpdate(prevProps) {
    const { filter, filterId, getAccountInstances, updateInstances } = this.props;

    if (updateInstances === true && updateInstances !== prevProps.updateInstances) {
      getAccountInstances(filterId, filter.query);
    }
  }

  onSelectGraphFilter = (event, graphType) => {
    const { view } = this.props;
    const { value } = event.target;

    switch (graphType) {
      case 'rhel':
        store.dispatch({
          type: reduxTypes.filter.GRAPH_RHEL_SET_FILTER_VALUE,
          graphRhelValue: value,
          view
        });
        break;
      case 'openshift':
        store.dispatch({
          type: reduxTypes.filter.GRAPH_OPENSHIFT_SET_FILTER_VALUE,
          graphOpenshiftValue: value,
          view
        });
        break;
      default:
        break;
    }
  };

  renderPendingCard() {
    const { pending } = this.props;

    if (pending) {
      return (
        <Card matchHeight accented className="cloudmeter-utilization-graph cloudmeter-utilization-graph-loading fadein">
          <Card.Body>
            <Spinner loading size="sm" className="blank-slate-pf-icon" />
            <div className="text-center">
              <small>Loading...</small>
            </div>
          </Card.Body>
        </Card>
      );
    }

    return null;
  }

  render() {
    const { error, fulfilled, graphData } = this.props;
    let chartTotals = {};
    let chartData = null;

    if (error) {
      return null;
    }

    if (graphData.dailyUsage && graphData.dailyUsage.length) {
      chartTotals = { ...graphHelpers.calculateGraphTotals({ ...graphData }) };
      chartData = graphHelpers.convertGraphData({ ...graphData });
    }

    return (
      <CardGrid fluid matchHeight>
        <CardGrid.Row className="row-cards-pf">
          <CardGrid.Col sm={6}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight accented className="cloudmeter-utilization-graph fadein">
                <Card.Heading>
                  <Card.Title>Red Hat Enterprise Linux</Card.Title>
                </Card.Heading>
                <Card.Body>
                  <div className="cloudmeter-card-info">
                    <strong>{chartTotals.rhelTime || 0}</strong>
                    <PFLabel bsStyle="warning">
                      <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
                    </PFLabel>{' '}
                    Hours
                  </div>
                  {chartData && <SparklineChart data={chartData.rhelTime} tooltip={chartData.tooltips} />}
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
          <CardGrid.Col sm={6}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight accented className="cloudmeter-utilization-graph fadein">
                <Card.Heading>
                  <Card.Title>Red Hat OpenShift Container Platform</Card.Title>
                </Card.Heading>
                <Card.Body>
                  <div className="cloudmeter-card-info">
                    <strong>{chartTotals.openshiftTime || 0}</strong>
                    <PFLabel bsStyle="primary">
                      <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
                    </PFLabel>{' '}
                    Hours
                  </div>
                  {chartData && <SparklineChart data={chartData.openshiftTime} tooltip={chartData.tooltips} />}
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
        </CardGrid.Row>
      </CardGrid>
    );
  }
}

AccountGraphCard.propTypes = {
  error: PropTypes.bool,
  filter: PropTypes.shape({
    graphOpenshiftValue: PropTypes.string,
    graphRhelValue: PropTypes.string,
    query: PropTypes.object.isRequired
  }).isRequired,
  filterId: PropTypes.number,
  fulfilled: PropTypes.bool,
  getAccountInstances: PropTypes.func,
  graphData: PropTypes.shape({
    dailyUsage: PropTypes.array,
    instancesOpenshift: PropTypes.number,
    instancesRhel: PropTypes.number
  }),
  pending: PropTypes.bool,
  updateInstances: PropTypes.bool,
  view: PropTypes.string
};

AccountGraphCard.defaultProps = {
  error: false,
  filterId: null,
  fulfilled: false,
  getAccountInstances: helpers.noop,
  graphData: {
    dailyUsage: [],
    instancesOpenshift: 0,
    instancesRhel: 0
  },
  pending: false,
  updateInstances: false,
  view: null
};

const mapDispatchToProps = dispatch => ({
  getAccountInstances: (id, query) => dispatch(reduxActions.account.getAccountInstances(id, query))
});

const mapStateToProps = state => ({
  ...state.accountGraph
});

const ConnectedAccountGraphCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountGraphCard);

export { ConnectedAccountGraphCard as default, ConnectedAccountGraphCard, AccountGraphCard };
