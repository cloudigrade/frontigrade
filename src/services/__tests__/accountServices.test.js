import moxios from 'moxios';
import * as accountServices from '../accountServices';

describe('AccountServices', () => {
  beforeEach(() => {
    moxios.install();

    moxios.stubRequest(/\/(account|images|instances).*?/, {
      status: 200,
      responseText: 'success',
      timeout: 1
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should export a specific number of methods and classes', () => {
    expect(Object.keys(accountServices)).toHaveLength(7);
  });

  it('should have specific methods', () => {
    expect(accountServices.addAccount).toBeDefined();
    expect(accountServices.getAccount).toBeDefined();
    expect(accountServices.getAccounts).toBeDefined();
    expect(accountServices.getAccountImages).toBeDefined();
    expect(accountServices.getAccountInstances).toBeDefined();
    expect(accountServices.updateAccount).toBeDefined();
    expect(accountServices.updateAccountField).toBeDefined();
  });

  it('should return promises for every method against known endpoints', done => {
    const promises = Object.keys(accountServices).map(value => accountServices[value]());

    expect(Object.keys(accountServices).includes('default')).toEqual(false);

    Promise.all(promises).then(success => {
      expect(success.length).toEqual(Object.keys(accountServices).length);
      done();
    });
  });
});
