import moment from 'moment';
import apiTypes from '../constants/apiConstants';
import helpers from './helpers';

const calculateGraphTotals = ({ dailyUsage, totalInstancesOpenshift, totalInstancesRhel }) => {
  const openshiftMemoryTime = dailyUsage.reduce(
    (acc, val) => acc + Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_MEMORY]),
    0
  );

  const openshiftRuntimeTime = dailyUsage.reduce(
    (acc, val) => acc + Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME]),
    0
  );

  const openshiftVcpuTime = dailyUsage.reduce(
    (acc, val) => acc + Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_VCPU]),
    0
  );

  const rhelMemoryTime = dailyUsage.reduce(
    (acc, val) => acc + Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_MEMORY]),
    0
  );

  const rhelRuntimeTime = dailyUsage.reduce(
    (acc, val) => acc + Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME]),
    0
  );

  const rhelVcpuTime = dailyUsage.reduce(
    (acc, val) => acc + Number.parseFloat(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_VCPU]),
    0
  );

  return {
    instancesOpenshift: totalInstancesOpenshift,
    instancesRhel: totalInstancesRhel,
    openshiftMemoryTime: helpers.generateHoursFromSeconds(openshiftMemoryTime).hours,
    openshiftRuntimeTime: helpers.generateHoursFromSeconds(openshiftRuntimeTime).hours,
    openshiftVcpuTime: helpers.generateHoursFromSeconds(openshiftVcpuTime).hours,
    rhelMemoryTime: helpers.generateHoursFromSeconds(rhelMemoryTime).hours,
    rhelRuntimeTime: helpers.generateHoursFromSeconds(rhelRuntimeTime).hours,
    rhelVcpuTime: helpers.generateHoursFromSeconds(rhelVcpuTime).hours
  };
};

const convertGraphData = ({ dailyUsage }) => {
  const graphData = {
    date: ['x'],
    tooltipTitle: [],
    openshiftInstances: ['openshiftInstances'],
    openshiftMemoryTime: ['openshiftMemoryTime'],
    openshiftRuntimeTime: ['openshiftRuntimeTime'],
    openshiftVcpuTime: ['openshiftVcpuTime'],
    rhelInstances: ['rhelInstances'],
    rhelMemoryTime: ['rhelMemoryTime'],
    rhelRuntimeTime: ['rhelRuntimeTime'],
    rhelVcpuTime: ['rhelVcpuTime']
  };

  dailyUsage.forEach(val => {
    const formattedDate = moment
      .utc(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_DATE])
      .local()
      .format('YYYY-MM-DD');

    graphData.tooltipTitle.push(formattedDate);
    graphData.date.push(formattedDate);

    graphData.openshiftInstances.push(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT]);

    graphData.openshiftMemoryTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_MEMORY]).hours
    );
    graphData.openshiftRuntimeTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME]).hours
    );
    graphData.openshiftVcpuTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_VCPU]).hours
    );

    graphData.rhelInstances.push(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL]);

    graphData.rhelMemoryTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_MEMORY]).hours
    );
    graphData.rhelRuntimeTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME]).hours
    );
    graphData.rhelVcpuTime.push(
      helpers.generateHoursFromSeconds(val[apiTypes.API_RESPONSE_INSTANCES_USAGE_RHEL_VCPU]).hours
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

  const openshiftMemoryTime = {
    names: {
      openshiftMemoryTime: 'RHOCP GB Memory Hours'
    },
    columns: [graphData.date, graphData.openshiftMemoryTime],
    colors: { openshiftMemoryTime: helpers.pfPaletteColors.blue300 }
  };

  const openshiftRuntimeTime = {
    names: {
      openshiftRuntimeTime: 'RHOCP Instance Hours'
    },
    columns: [graphData.date, graphData.openshiftRuntimeTime],
    colors: { openshiftRuntimeTime: helpers.pfPaletteColors.blue300 }
  };

  const openshiftVcpuTime = {
    names: {
      openshiftVcpuTime: 'RHOCP Core Hours'
    },
    columns: [graphData.date, graphData.openshiftVcpuTime],
    colors: { openshiftVcpuTime: helpers.pfPaletteColors.blue300 }
  };

  const rhelMemoryTime = {
    names: {
      rhelMemoryTime: 'RHEL GB Memory Hours'
    },
    columns: [graphData.date, graphData.rhelMemoryTime],
    colors: { rhelMemoryTime: helpers.pfPaletteColors.orange }
  };

  const rhelRuntimeTime = {
    names: {
      rhelRuntimeTime: 'RHEL Instance Hours'
    },
    columns: [graphData.date, graphData.rhelRuntimeTime],
    colors: { rhelRuntimeTime: helpers.pfPaletteColors.orange }
  };

  const rhelVcpuTime = {
    names: {
      rhelVcpuTime: 'RHEL Core Hours'
    },
    columns: [graphData.date, graphData.rhelVcpuTime],
    colors: { rhelVcpuTime: helpers.pfPaletteColors.orange }
  };

  const tooltips = {
    format: {
      title: d => graphData.tooltipTitle[d] || `Data ${d}`
    },
    tooltip: {
      grouped: false
    }
  };

  return {
    openshiftInstances,
    rhelInstances,
    openshiftMemoryTime,
    openshiftRuntimeTime,
    openshiftVcpuTime,
    rhelMemoryTime,
    rhelRuntimeTime,
    rhelVcpuTime,
    tooltips
  };
};

const graphHelpers = { calculateGraphTotals, convertGraphData };

export { graphHelpers as default, graphHelpers, calculateGraphTotals, convertGraphData };
