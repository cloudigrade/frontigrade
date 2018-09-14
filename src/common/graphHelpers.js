import moment from 'moment';
import _sumBy from 'lodash/sumBy';
import apiTypes from '../constants/apiConstants';
import helpers from './helpers';

const calculateInstanceTotals = (dailyUsage = []) => {
  const openshift = _sumBy(dailyUsage, val =>
    Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME])
  );

  const rhel = _sumBy(dailyUsage, val => Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME]));

  return {
    openshiftHours: helpers.generateHoursFromSeconds(openshift),
    rhelHours: helpers.generateHoursFromSeconds(rhel)
  };
};

const convertGraphData = (data = []) => {
  const graphData = {
    date: ['x'],
    tooltipTitle: [],
    rhelInstances: ['rhelInstances'],
    openshiftInstances: ['openshiftInstances'],
    rhelTime: ['rhelTime'],
    openshiftTime: ['openshiftTime']
  };

  data.forEach(val => {
    const formattedDate = moment
      .utc(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_DATE])
      .local()
      .format('YYYY-MM-DD');

    graphData.tooltipTitle.push(formattedDate);
    graphData.date.push(formattedDate);
    graphData.rhelInstances.push(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL]);
    graphData.openshiftInstances.push(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT]);
    graphData.rhelTime.push(helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME]));
    graphData.openshiftTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME])
    );
  });

  const rhelData = {
    names: {
      rhelInstances: 'RHEL Instances'
    },
    columns: [graphData.date, graphData.rhelInstances],
    colors: { rhelInstances: helpers.pfPaletteColors.orange }
  };

  const openshiftData = {
    names: {
      openshiftInstances: 'RHOCP Instances'
    },
    columns: [graphData.date, graphData.openshiftInstances],
    colors: { openshiftInstances: helpers.pfPaletteColors.blue300 }
  };

  const rhelOpenshiftTime = {
    names: {
      rhelTime: 'RHEL Hours',
      openshiftTime: 'RHOCP Hours'
    },
    columns: [graphData.date, graphData.rhelTime, graphData.openshiftTime],
    colors: { rhelTime: helpers.pfPaletteColors.orange, openshiftTime: helpers.pfPaletteColors.blue300 }
  };

  const tooltips = {
    format: {
      title: d => graphData.tooltipTitle[d] || `Data ${d}`
    },
    tooltip: {
      grouped: false
    }
  };

  return { rhelData, openshiftData, rhelOpenshiftTime, tooltips };
};

const graphHelpers = { calculateInstanceTotals, convertGraphData };

export { graphHelpers as default, graphHelpers, calculateInstanceTotals, convertGraphData };
