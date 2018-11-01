import { graphHelpers, calculateGraphTotals, convertGraphData } from '../graphHelpers';

describe('GraphHelpers', () => {
  const exampleGraphData = {
    dailyUsage: [
      {
        date: null,
        openshift_instances: 0,
        openshift_runtime_seconds: 0.0,
        rhel_instances: 1,
        rhel_runtime_seconds: 54000.0
      },
      {
        date: null,
        openshift_instances: 0,
        openshift_runtime_seconds: 0.0,
        rhel_instances: 1,
        rhel_runtime_seconds: 500.0
      },
      {
        date: null,
        openshift_instances: 0,
        openshift_runtime_seconds: 0.0,
        rhel_instances: 2,
        rhel_runtime_seconds: 9600.0
      },
      {
        date: null,
        openshift_instances: 1,
        openshift_runtime_seconds: 8000.0,
        rhel_instances: 2,
        rhel_runtime_seconds: 9500.0
      },
      {
        date: null,
        openshift_instances: 0,
        openshift_runtime_seconds: 0.0,
        rhel_instances: 2,
        rhel_runtime_seconds: 10000.0
      },
      {
        date: null,
        openshift_instances: 0,
        openshift_runtime_seconds: 0.0,
        rhel_instances: 2,
        rhel_runtime_seconds: 7600.0
      }
    ]
  };

  it('should export the same number of methods as imported', () => {
    expect(Object.keys(graphHelpers)).toHaveLength(2);
  });

  it('should have defined methods', () => {
    expect(graphHelpers.calculateGraphTotals).toBeDefined();

    const graphTotals = calculateGraphTotals({ ...exampleGraphData });
    expect(Object.keys(graphTotals)).toMatchSnapshot('calculateGraphTotals keys');

    expect(graphHelpers.convertGraphData).toBeDefined();

    const graphData = convertGraphData({ ...exampleGraphData });
    expect(Object.keys(graphData)).toMatchSnapshot('convertGraphData keys');
  });

  it('should consistently calculate totals', () => {
    expect(calculateGraphTotals({ ...exampleGraphData })).toMatchSnapshot('totals');
  });

  it('should consistently convert data', () => {
    expect(convertGraphData({ ...exampleGraphData })).toMatchSnapshot('converted');
  });

  it('should have a specific convertGraphData methods for tooltip titles', () => {
    const graphData = convertGraphData({ ...exampleGraphData });
    expect(graphData.tooltips.format.title('Lorem Ipsum')).toMatchSnapshot('tooltip title');
  });
});
