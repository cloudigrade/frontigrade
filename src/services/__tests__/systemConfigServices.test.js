import moxios from 'moxios';
import * as systemConfigServices from '../systemConfigServices';

describe('SystemConfigServices', () => {
  beforeEach(() => {
    moxios.install();

    moxios.stubRequest(/\/sysconfig.*?/, {
      status: 200,
      responseText: 'success',
      timeout: 1
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should export a specific number of methods and classes', () => {
    expect(Object.keys(systemConfigServices)).toHaveLength(2);
  });

  it('should have specific methods', () => {
    expect(systemConfigServices.getSystemConfig).toBeDefined();
  });

  it('should return promises for every method', done => {
    const promises = Object.keys(systemConfigServices).map(value => systemConfigServices[value]());

    expect(Object.keys(systemConfigServices).includes('default')).toEqual(true);

    Promise.all(promises).then(success => {
      expect(success.length).toEqual(Object.keys(systemConfigServices).length);
      done();
    });
  });
});
