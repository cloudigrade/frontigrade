import moxios from 'moxios';
import { accountServices } from '../';

describe('AccountServices', () => {
  beforeEach(() => {
    moxios.install();

    moxios.stubRequest(/\/account.*?/, {
      status: 200,
      responseText: 'success',
      timeout: 1
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should have specific methods', () => {
    expect(accountServices.getAccounts).toBeDefined();
    expect(accountServices.getAccount).toBeDefined();
  });

  it('should return promises for every method', done => {
    const promises = Object.keys(accountServices).map(value => accountServices[value]());

    expect(Object.keys(accountServices).includes('default')).toEqual(false);

    Promise.all(promises).then(success => {
      expect(success.length).toEqual(Object.keys(accountServices).length);
      done();
    });
  });
});
