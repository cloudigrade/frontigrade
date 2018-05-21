import moxios from 'moxios';
import { userServices } from '../';

describe('UserServices', () => {
  beforeEach(() => {
    moxios.install();

    moxios.stubRequest(/\/auth.*?/, {
      status: 200,
      responseText: 'success',
      timeout: 1
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should have specific methods', () => {
    expect(userServices.createUser).toBeDefined();
    expect(userServices.deleteUser).toBeDefined();
    expect(userServices.loginUser).toBeDefined();
    expect(userServices.logoutUser).toBeDefined();
    expect(userServices.whoami).toBeDefined();
  });

  it('Should return promises for every method', done => {
    const promises = Object.keys(userServices).map(value => userServices[value]());

    Promise.all(promises).then(success => {
      expect(success.length).toEqual(Object.keys(userServices).length);
      done();
    });
  });
});
