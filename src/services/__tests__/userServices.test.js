import moxios from 'moxios';
import { userServices } from '../';

describe('UserServices', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should have specific methods', () => {
    expect(userServices.checkUser).toBeDefined();
    expect(userServices.createUser).toBeDefined();
    expect(userServices.deleteUser).toBeDefined();
    expect(userServices.loginUser).toBeDefined();
    expect(userServices.logoutUser).toBeDefined();
  });

  it('should return promises for most methods and resolve successfully', done => {
    const promises = Object.keys(userServices).map(value => userServices[value]());

    moxios.stubRequest(/\/auth.*?/, {
      status: 200,
      responseText: { auth_token: 'test' },
      timeout: 1
    });

    Promise.all(promises).then(success => {
      expect(success.length).toEqual(Object.keys(userServices).length);
      done();
    });
  });

  it('should be rejected when login fails', done => {
    moxios.stubRequest(/\/auth.*?/, {
      status: 200,
      responseText: {},
      timeout: 1
    });

    userServices.loginUser().catch(error => {
      expect(error.toString()).toContain('User not authorized.');
      done();
    });
  });
});
