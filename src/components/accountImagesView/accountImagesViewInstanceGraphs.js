import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGrid, Label as PFLabel, SparklineChart, Spinner, UtilizationCard } from 'patternfly-react';
import { connect, reduxActions } from '../../redux';
import helpers from '../../common/helpers';
import graphHelpers from '../../common/graphHelpers';

class AccountImagesViewInstanceGraphs extends React.Component {
  componentDidMount() {
    const { filter, filterId, getAccountImagesInstances } = this.props;

    if (!Number.isNaN(Number.parseInt(filterId, 10)) && filter.query) {
      getAccountImagesInstances(filterId, filter.query);
    }
  }

  componentDidUpdate(prevProps) {
    const { filter, filterId, getAccountImagesInstances, updateInstances } = this.props;

    if (updateInstances === true && updateInstances !== prevProps.updateInstances) {
      getAccountImagesInstances(filterId, filter.query);
    }
  }

  renderPendingCard() {
    const { pending } = this.props;

    if (pending) {
      return (
        <Card matchHeight className="cloudmeter-utilization-graph cloudmeter-utilization-graph-loading fadein">
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
    const { error, fulfilled, dailyUsage, instancesOpenshift, instancesRhel } = this.props;
    let displayTotals = {};
    let chartData = null;

    if (error) {
      return null;
    }

    if (dailyUsage && dailyUsage.length) {
      displayTotals = { ...graphHelpers.calculateInstanceTotals(dailyUsage) };
      chartData = graphHelpers.convertGraphData(dailyUsage);
    }

    return (
      <CardGrid matchHeight>
        <CardGrid.Row>
          <CardGrid.Col sm={4}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight className="cloudmeter-utilization-graph fadein">
                <Card.Title>Red Hat Enterprise Linux</Card.Title>
                <Card.Body>
                  <UtilizationCard.Details>
                    <UtilizationCard.DetailsCount>{instancesRhel}</UtilizationCard.DetailsCount>
                    <UtilizationCard.DetailsDesc>
                      <PFLabel bsStyle="warning">
                        <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
                      </PFLabel>{' '}
                      Instances
                    </UtilizationCard.DetailsDesc>
                  </UtilizationCard.Details>
                  <div className="cloudmeter-utilization-graph-display">
                    {chartData && (
                      <SparklineChart
                        className="cloudmeter-utilization-graph-display-c3"
                        data={chartData.rhelData}
                        tooltip={graphHelpers.graphDefaults.tooltips}
                        axis={graphHelpers.graphDefaults.axis}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
          <CardGrid.Col sm={4}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight className="cloudmeter-utilization-graph fadein">
                <Card.Title>Red Hat OpenShift Container Platform</Card.Title>
                <Card.Body>
                  <UtilizationCard.Details>
                    <UtilizationCard.DetailsCount>{instancesOpenshift}</UtilizationCard.DetailsCount>
                    <UtilizationCard.DetailsDesc>
                      <PFLabel bsStyle="primary">
                        <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
                      </PFLabel>{' '}
                      Instances
                    </UtilizationCard.DetailsDesc>
                  </UtilizationCard.Details>
                  <div className="cloudmeter-utilization-graph-display">
                    {chartData && (
                      <SparklineChart
                        className="cloudmeter-utilization-graph-display-c3"
                        data={chartData.openshiftData}
                        tooltip={graphHelpers.graphDefaults.tooltips}
                        axis={graphHelpers.graphDefaults.axis}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
          <CardGrid.Col sm={4}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight className="cloudmeter-utilization-graph fadein">
                <Card.Body>
                  <UtilizationCard.Details>
                    <UtilizationCard.DetailsCount>{displayTotals.rhelHours || 0}</UtilizationCard.DetailsCount>
                    <UtilizationCard.DetailsDesc>Red Hat Enterprise Linux Hours</UtilizationCard.DetailsDesc>
                    <span className="cloudmeter-utilization-graph-detail">
                      <UtilizationCard.DetailsCount>{displayTotals.openshiftHours || 0}</UtilizationCard.DetailsCount>
                      <UtilizationCard.DetailsDesc>
                        Red Hat OpenShift Container Platform Hours
                      </UtilizationCard.DetailsDesc>
                    </span>
                  </UtilizationCard.Details>
                  <div className="cloudmeter-utilization-graph-display">
                    {chartData && (
                      <SparklineChart
                        className="cloudmeter-utilization-graph-display-c3"
                        data={chartData.rhelOpenshiftTime}
                        tooltip={graphHelpers.graphDefaults.tooltips}
                        axis={graphHelpers.graphDefaults.axis}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
        </CardGrid.Row>
      </CardGrid>
    );
  }
}

AccountImagesViewInstanceGraphs.propTypes = {
  error: PropTypes.bool,
  fulfilled: PropTypes.bool,
  filter: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  filterId: PropTypes.number.isRequired,
  getAccountImagesInstances: PropTypes.func,
  dailyUsage: PropTypes.array,
  instancesOpenshift: PropTypes.number,
  instancesRhel: PropTypes.number,
  pending: PropTypes.bool,
  updateInstances: PropTypes.bool
};

AccountImagesViewInstanceGraphs.defaultProps = {
  error: false,
  fulfilled: false,
  getAccountImagesInstances: helpers.noop,
  dailyUsage: [],
  instancesOpenshift: 0,
  instancesRhel: 0,
  pending: false,
  updateInstances: false
};

const mapDispatchToProps = dispatch => ({
  getAccountImagesInstances: (id, query) => dispatch(reduxActions.account.getAccountImagesInstances(id, query))
});

const mapStateToProps = state => ({
  ...state.accountImages.instances
});

const ConnectedAccountImagesViewInstanceGraphs = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountImagesViewInstanceGraphs);

export {
  ConnectedAccountImagesViewInstanceGraphs as default,
  ConnectedAccountImagesViewInstanceGraphs,
  AccountImagesViewInstanceGraphs
};
