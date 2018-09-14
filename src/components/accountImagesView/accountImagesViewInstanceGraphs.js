import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGrid, Label as PFLabel, SparklineChart, Spinner } from 'patternfly-react';
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
      <CardGrid fluid matchHeight>
        <CardGrid.Row className="row-cards-pf">
          <CardGrid.Col sm={6} md={4}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight accented className="cloudmeter-utilization-graph fadein">
                <Card.Heading>
                  <Card.Title>Red Hat Enterprise Linux</Card.Title>
                </Card.Heading>
                <Card.Body>
                  <div className="cloudmeter-card-info">
                    <strong>{instancesRhel}</strong>
                    <PFLabel bsStyle="warning">
                      <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
                    </PFLabel>{' '}
                    Instances
                  </div>
                  {chartData && <SparklineChart data={chartData.rhelData} tooltip={chartData.tooltips} />}
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
          <CardGrid.Col sm={6} md={4}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight accented className="cloudmeter-utilization-graph fadein">
                <Card.Heading>
                  <Card.Title>Red Hat OpenShift Container Platform</Card.Title>
                </Card.Heading>
                <Card.Body>
                  <div className="cloudmeter-card-info">
                    <strong>{instancesOpenshift}</strong>
                    <PFLabel bsStyle="primary">
                      <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
                    </PFLabel>{' '}
                    Instances
                  </div>
                  {chartData && <SparklineChart data={chartData.openshiftData} tooltip={chartData.tooltips} />}
                </Card.Body>
              </Card>
            )}
          </CardGrid.Col>
          <CardGrid.Col sm={12} md={4}>
            {this.renderPendingCard()}
            {fulfilled && (
              <Card matchHeight accented className="cloudmeter-utilization-graph fadein">
                <Card.Heading>
                  <Card.Title>Utilized hours</Card.Title>
                </Card.Heading>
                <Card.Body>
                  <div className="cloudmeter-card-grid">
                    <div className="cloudmeter-card-info">
                      <strong>{displayTotals.rhelHours || 0}</strong>
                      <PFLabel bsStyle="warning">
                        <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
                      </PFLabel>{' '}
                      Hrs
                    </div>
                    <div className="cloudmeter-card-info">
                      <strong>{displayTotals.openshiftHours || 0}</strong>
                      <PFLabel bsStyle="primary">
                        <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
                      </PFLabel>{' '}
                      <div className="cloudmeter-card-info__header">Hrs</div>
                    </div>
                  </div>
                  {chartData && <SparklineChart data={chartData.rhelOpenshiftTime} tooltip={chartData.tooltips} />}
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
