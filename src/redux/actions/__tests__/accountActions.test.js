import moxios from 'moxios';
import { createPromise } from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { accountActions } from '..';
import {
  accountReducers,
  accountEditReducers,
  accountGraphReducers,
  accountImagesReducers,
  accountImageEditReducers,
  accountWizardReducers
} from '../../reducers';
import apiTypes from '../../../constants/apiConstants';

describe('UserActions', () => {
  const middleware = [createPromise()];
  const generateStore = () =>
    createStore(
      combineReducers({
        account: accountReducers,
        accountEdit: accountEditReducers,
        accountGraph: accountGraphReducers,
        accountImages: accountImagesReducers,
        accountImageEdit: accountImageEditReducers,
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

  it('Should return a response for deleteAccount method', done => {
    const store = generateStore();
    const dispatcher = accountActions.deleteAccount();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountEdit.del;

      expect(response.fulfilled).toEqual(true);
      done();
    });
  });

  it('Should return response content for getAccount method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccount();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountImages.account;

      expect(response.fulfilled).toEqual(true);
      done();
    });
  });

  it('Should return response content for getAccountImage method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccountImage('testId');

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountImageEdit;

      expect(response.testId).toBeDefined();
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

  it('Should return response content for images with getAccountInstances method and passed parameter', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccountInstances(1);

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountGraph;

      expect(response.graphData.dailyUsage[0]).toEqual('success');
      done();
    });
  });

  it('Should return response content for getAccountInstances method', done => {
    const store = generateStore();
    const dispatcher = accountActions.getAccountInstances();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountGraph;

      expect(response.graphData.dailyUsage[0]).toEqual('success');
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

  it('Should return response content for updateAccountField method', done => {
    const store = generateStore();
    const dispatcher = accountActions.updateAccountField();

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountEdit.modal;

      expect(response.fulfilled).toEqual(true);
      done();
    });
  });

  it('Should return response content for updateAccountImage method', () => {
    expect(accountActions.updateAccountImage()).toBeDefined();
  });

  it('Should return response content for updateAccountImageFieldRhel method', done => {
    const store = generateStore();
    const dispatcher = accountActions.updateAccountImageFieldRhel('testId');

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountImageEdit;

      expect(response.testId).toBeDefined();
      done();
    });
  });

  it('Should return response content for updateAccountImageFieldRhocp method', done => {
    const store = generateStore();
    const dispatcher = accountActions.updateAccountImageFieldRhocp('testId');

    dispatcher(store.dispatch).then(() => {
      const response = store.getState().accountImageEdit;

      expect(response.testId).toBeDefined();
      done();
    });
  });
});
