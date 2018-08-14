import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGrid, Label as PFLabel, Spinner, UtilizationCard } from 'patternfly-react';
import _sumBy from 'lodash/sumBy';
import { connect, reduxActions } from '../../redux';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

class AccountImagesViewInstanceGraphs extends React.Component {
  static calculateInstanceTotals(dailyUsage = []) {
    const openshift = _sumBy(dailyUsage, val =>
      Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME])
    );

    const rhel = _sumBy(dailyUsage, val => Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME]));

    return {
      openshiftHours: helpers.generateHoursFromSeconds(openshift),
      rhelHours: helpers.generateHoursFromSeconds(rhel)
    };
  }

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

    if (error) {
      return null;
    }

    if (dailyUsage && dailyUsage.length) {
      displayTotals = { ...AccountImagesViewInstanceGraphs.calculateInstanceTotals(dailyUsage) };
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
                  </UtilizationCard.Details>
                  <UtilizationCard.Details>
                    <UtilizationCard.DetailsCount>{displayTotals.openshiftHours || 0}</UtilizationCard.DetailsCount>
                    <UtilizationCard.DetailsDesc>
                      Red Hat OpenShift Container Platform Hours
                    </UtilizationCard.DetailsDesc>
                  </UtilizationCard.Details>
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
