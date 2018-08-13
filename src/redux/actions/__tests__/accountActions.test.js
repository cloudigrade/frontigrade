import moxios from 'moxios';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { accountActions } from '..';
import {
  accountReducers,
  accountEditModalReducers,
  accountImagesReducers,
  accountWizardReducers
} from '../../reducers';
import apiTypes from '../../../constants/apiConstants';

describe('UserActions', () => {
  const middleware = [promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({
        account: accountReducers,
        accountEditModal: accountEditModalReducers,
        accountImages: accountImagesReducers,
        accountWizard: accountWizardReducers
      }),
      applyMiddleware(...middleware)
    );

  beforeEach(() => {
    moxios.install();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          test: 'success',
          [apiTypes.API_RESPONSE_ACCOUNTS]: ['success'],
          [apiTypes.API_RESPONSE_IMAGES]: ['success'],
          [apiTypes.API_RESPONSE_INSTANCES_USAGE]: ['success']
        }
      });
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should return response content for addAccount method', done => {
    const store = generateStore();
    const dispatcher = accountActions.addAccount();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountWizard;

      expect(response.account.test).toEqual('success');
      done();
    });
  });

  it('Should return response content for getAccount method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccount();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().account.view;

      expect(response.accounts.length).toEqual(0);
      done();
    });
  });

  it('Should return response content for getAccountImages method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccountImages();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountImages.view;

      expect(response.images[0]).toEqual('success');
      done();
    });
  });

  it('Should return response content for getAccountImagesInstances method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccountImagesInstances();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountImages.instances;

      expect(response.dailyUsage[0]).toEqual('success');
      done();
    });
  });

  it('Should return response content for getAccountInstances method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccountInstances();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().account.instances;

      expect(response.dailyUsage[0]).toEqual('success');
      done();
    });
  });

  it('Should return response content for getAccounts method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccounts();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().account.view;

      expect(response.accounts[0]).toEqual('success');
      done();
    });
  });

  it('Should return response content for updateAccount method', () => {
    expect(accountActions.updateAccount).toBeDefined();
  });

  // FixMe: API - patch not allowed by preflight, temporarily using put instead which uses "updateAccount"
  it('Should return response content for updateAccountField method', done => {
    const store = generateStore();
    const dispatcher = accountActions.updateAccountField();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountEditModal;

      expect(response.fulfilled).toEqual(true);
      done();
    });
  });
});
