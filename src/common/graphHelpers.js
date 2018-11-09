import moment from 'moment';
import _sumBy from 'lodash/sumBy';
import apiTypes from '../constants/apiConstants';
import helpers from './helpers';

const calculateGraphTotals = ({ dailyUsage, totalInstancesOpenshift, totalInstancesRhel }) => {
  const openshiftTime = _sumBy(dailyUsage, val =>
    Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME])
  );

  const rhelTime = _sumBy(dailyUsage, val =>
    Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME])
  );

  return {
    instancesOpenshift: totalInstancesOpenshift,
    instancesRhel: totalInstancesRhel,
    openshiftTime: helpers.generateHoursFromSeconds(openshiftTime).hours,
    rhelTime: helpers.generateHoursFromSeconds(rhelTime).hours
  };
};

const convertGraphData = ({ dailyUsage }) => {
  const graphData = {
    date: ['x'],
    tooltipTitle: [],
    rhelInstances: ['rhelInstances'],
    openshiftInstances: ['openshiftInstances'],
    rhelTime: ['rhelTime'],
    openshiftTime: ['openshiftTime']
  };

  dailyUsage.forEach(val => {
    const formattedDate = moment
      .utc(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_DATE])
      .local()
      .format('YYYY-MM-DD');

    graphData.tooltipTitle.push(formattedDate);
    graphData.date.push(formattedDate);
    graphData.rhelInstances.push(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL]);
    graphData.openshiftInstances.push(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT]);
    graphData.rhelTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME]).hours
    );
    graphData.openshiftTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME]).hours
    );
  });

  const rhelInstances = {
    names: {
      rhelInstances: 'RHEL Instances'
    },
    columns: [graphData.date, graphData.rhelInstances],
    colors: { rhelInstances: helpers.pfPaletteColors.orange }
  };

  const openshiftInstances = {
    names: {
      openshiftInstances: 'RHOCP Instances'
    },
    columns: [graphData.date, graphData.openshiftInstances],
    colors: { openshiftInstances: helpers.pfPaletteColors.blue300 }
  };

  const rhelTime = {
    names: {
      rhelTime: 'RHEL Hours'
    },
    columns: [graphData.date, graphData.rhelTime],
    colors: { rhelTime: helpers.pfPaletteColors.orange }
  };

  const openshiftTime = {
    names: {
      openshiftTime: 'RHOCP Hours'
    },
    columns: [graphData.date, graphData.openshiftTime],
    colors: { openshiftTime: helpers.pfPaletteColors.blue300 }
  };

  const tooltips = {
    format: {
      title: d => graphData.tooltipTitle[d] || `Data ${d}`
    },
    tooltip: {
      grouped: false
    }
  };

  return { openshiftInstances, rhelInstances, openshiftTime, rhelTime, tooltips };
};

const graphHelpers = { calculateGraphTotals, convertGraphData };

export { graphHelpers as default, graphHelpers, calculateGraphTotals, convertGraphData };
