import moxios from 'moxios';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { accountActions } from '../';
import { accountReducers } from '../../reducers';

describe('UserActions', () => {
  const middleware = [promiseMiddleware()];
  const generateStore = () =>
    createStore(combineReducers({ account: accountReducers }), applyMiddleware(...middleware));

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

  it('Should return response content for getAccount method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccount();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().account.view;

      expect(response.accounts).toEqual('success');
      done();
    });
  });

  it('Should return response content for getAccounts method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccounts();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().account.view;

      expect(response.accounts).toEqual('success');
      done();
    });
  });
});
