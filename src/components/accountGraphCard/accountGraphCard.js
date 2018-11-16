import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGrid, Label as PFLabel, SparklineChart, Spinner } from 'patternfly-react';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import graphHelpers from '../../common/graphHelpers';
import accountGraphCardTypes from './accountGraphCardConstants';
import DropdownSelect from '../dropdownSelect/dropdownSelect';

class AccountGraphCard extends React.Component {
  componentDidMount() {
    const { filter, filterId, getAccountInstances, rhelOptions, rhocpOptions } = this.props;

    if (filter.query) {
      getAccountInstances(filterId, filter.query);
    }

    if (!filter.graphOpenshiftValue) {
      this.onSelectRhocpGraphFilter(rhocpOptions.find(option => option.active === true));
    }

    if (!filter.graphRhelValue) {
      this.onSelectRhelGraphFilter(rhelOptions.find(option => option.active === true));
    }
  }

  componentDidUpdate(prevProps) {
    const { filter, filterId, getAccountInstances, updateInstances } = this.props;

    if (updateInstances === true && updateInstances !== prevProps.updateInstances) {
      getAccountInstances(filterId, filter.query);
    }
  }

  onSelectRhelGraphFilter = option => {
    const { view, viewGlobal } = this.props;

    if (option) {
      store.dispatch({
        type: reduxTypes.filter.GRAPH_RHEL_SET_FILTER_VALUE,
        graphRhelValue: option.value,
        view,
        viewGlobal
      });
    }
  };

  onSelectRhocpGraphFilter = option => {
    const { view, viewGlobal } = this.props;

    if (option) {
      store.dispatch({
        type: reduxTypes.filter.GRAPH_OPENSHIFT_SET_FILTER_VALUE,
        graphOpenshiftValue: option.value,
        view,
        viewGlobal
      });
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
    const { error, filter, fulfilled, graphData, rhelOptions, rhocpOptions } = this.props;

    let chartTotals = {};
    let chartData = null;
    let displayRHELChartTotal = {};
    let displayRHELChartData = null;
    let displayRHOCPChartTotal = {};
    let displayRHOCPChartData = null;

    if (error) {
      return null;
    }

    if (graphData.dailyUsage && graphData.dailyUsage.length) {
      chartTotals = { ...graphHelpers.calculateGraphTotals({ ...graphData }) };
      chartData = graphHelpers.convertGraphData({ ...graphData });

      if (filter.graphOpenshiftValue) {
        displayRHOCPChartTotal = chartTotals[filter.graphOpenshiftValue];
        displayRHOCPChartData = chartData[filter.graphOpenshiftValue];
      }

      if (filter.graphRhelValue) {
        displayRHELChartTotal = chartTotals[filter.graphRhelValue];
        displayRHELChartData = chartData[filter.graphRhelValue];
      }
    }

    return (
      <CardGrid fluid matchHeight>
        <CardGrid.Row className="row-cards-pf">
          <CardGrid.Col sm={6}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight accented className="cloudmeter-utilization-graph fadein">
                <Card.Heading>
                  <DropdownSelect
                    id="graphRhel"
                    className="card-pf-time-frame-filter"
                    pullRight
                    onSelect={this.onSelectRhelGraphFilter}
                    options={rhelOptions}
                    selectValue={filter.graphRhelValue}
                  />
                  <Card.Title>Red Hat Enterprise Linux</Card.Title>
                </Card.Heading>
                <Card.Body>
                  <div className="cloudmeter-card-info">
                    <strong>{displayRHELChartTotal || 0}</strong>
                    <PFLabel bsStyle="warning">
                      <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
                    </PFLabel>
                  </div>
                  {displayRHELChartData && (
                    <SparklineChart
                      key={filter.graphRhelValue}
                      data={displayRHELChartData}
                      tooltip={chartData.tooltips}
                    />
                  )}
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
          <CardGrid.Col sm={6}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight accented className="cloudmeter-utilization-graph fadein">
                <Card.Heading>
                  <DropdownSelect
                    id="graphOpenshift"
                    className="card-pf-time-frame-filter"
                    pullRight
                    onSelect={this.onSelectRhocpGraphFilter}
                    options={rhocpOptions}
                    selectValue={filter.graphOpenshiftValue}
                  />
                  <Card.Title>Red Hat OpenShift Container Platform</Card.Title>
                </Card.Heading>
                <Card.Body>
                  <div className="cloudmeter-card-info">
                    <strong>{displayRHOCPChartTotal || 0}</strong>
                    <PFLabel bsStyle="primary">
                      <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
                    </PFLabel>
                  </div>
                  {displayRHOCPChartData && (
                    <SparklineChart
                      key={filter.graphOpenshiftValue}
                      data={displayRHOCPChartData}
                      tooltip={chartData.tooltips}
                    />
                  )}
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
  rhelOptions: PropTypes.array,
  rhocpOptions: PropTypes.array,
  updateInstances: PropTypes.bool,
  view: PropTypes.string,
  viewGlobal: PropTypes.string
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
  rhelOptions: accountGraphCardTypes.rhelOptions,
  rhocpOptions: accountGraphCardTypes.rhocpOptions,
  updateInstances: false,
  view: null,
  viewGlobal: null
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
