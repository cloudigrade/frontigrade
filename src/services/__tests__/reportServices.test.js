import moxios from 'moxios';
import * as reportServices from '../reportServices';

describe('ReportServices', () => {
  beforeEach(() => {
    moxios.install();

    moxios.stubRequest(/\/report.*?/, {
      status: 200,
      responseText: 'success',
      timeout: 1
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should export a specific number of methods and classes', () => {
    expect(Object.keys(reportServices)).toHaveLength(2);
  });

  it('should have specific methods', () => {
    expect(reportServices.getReport).toBeDefined();
  });

  it('should return promises for every method', done => {
    const promises = Object.keys(reportServices).map(value => reportServices[value]());

    expect(Object.keys(reportServices).includes('default')).toEqual(true);

    Promise.all(promises).then(success => {
      expect(success.length).toEqual(Object.keys(reportServices).length);
      done();
    });
  });
});
