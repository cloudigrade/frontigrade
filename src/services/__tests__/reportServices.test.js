import moxios from 'moxios';
import { reportServices } from '../';

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

  it('Should have specific methods', () => {
    expect(reportServices.getReport).toBeDefined();
  });

  it('Should return promises for every method', done => {
    const promises = Object.keys(reportServices).map(value => reportServices[value]());

    Promise.all(promises).then(success => {
      expect(success.length).toEqual(Object.keys(reportServices).length);
      done();
    });
  });
});
