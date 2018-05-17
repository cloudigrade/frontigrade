import moxios from 'moxios';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { userActions } from '../';
import { userReducers } from '../../reducers';

describe('UserActions', () => {
  const middleware = [promiseMiddleware()];
  const generateStore = () => createStore(combineReducers({ user: userReducers }), applyMiddleware(...middleware));

  beforeEach(() => {
    moxios.install();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'success'
      });
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should return response content for createUser method', done => {
    const store = generateStore();
    const dispatcher = userActions.createUser();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().user.user;

      expect(response.other).toEqual('success');
      done();
    });
  });

  it('Should return response content for deleteUser method', done => {
    const store = generateStore();
    const dispatcher = userActions.deleteUser();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().user.user;

      expect(response.other).toEqual('success');
      done();
    });
  });

  it('Should return response content for loginUser method', done => {
    const store = generateStore();
    const dispatcher = userActions.loginUser();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().user.session;

      expect(response.authorized).toEqual(true);
      done();
    });
  });

  it('Should return response content for loginOut method', done => {
    const store = generateStore();
    const dispatcher = userActions.logoutUser();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().user.session;

      expect(response.authorized).toEqual(false);
      done();
    });
  });

  it('Should return response content for whoami method', done => {
    const store = generateStore();
    const dispatcher = userActions.whoami();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().user.user;

      expect(response.current).toEqual('success');
      done();
    });
  });
});
