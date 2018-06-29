import moxios from 'moxios';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { systemConfigActions } from '../';
import { systemConfigReducers } from '../../reducers';

describe('UserActions', () => {
  const middleware = [promiseMiddleware()];
  const generateStore = () =>
    createStore(combineReducers({ systemConfig: systemConfigReducers }), applyMiddleware(...middleware));

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

  it('Should return response content for getSystemConfig method', done => {
    const store = generateStore();
    const dispatcher = systemConfigActions.getSystemConfig();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().systemConfig;

      expect(response.configuration).toEqual('success');
      done();
    });
  });
});
