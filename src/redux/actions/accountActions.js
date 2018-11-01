import { accountTypes } from '../constants';
import { accountServices } from '../../services';

const addAccount = data => dispatch =>
  dispatch({
    type: accountTypes.ADD_ACCOUNT,
    payload: accountServices.addAccount(data)
  });

const deleteAccount = id => dispatch =>
  dispatch({
    type: accountTypes.DELETE_ACCOUNT,
    payload: accountServices.deleteAccount(id)
  });

const getAccount = id => dispatch =>
  dispatch({
    type: accountTypes.GET_ACCOUNT,
    payload: accountServices.getAccount(id)
  });

const getAccountImages = (id, query) => dispatch =>
  dispatch({
    type: accountTypes.GET_ACCOUNT_IMAGES,
    payload: accountServices.getAccountImages(id, query)
  });

const getAccountInstances = (id, query) => dispatch =>
  dispatch({
    type: id ? accountTypes.GET_ACCOUNT_IMAGES_INSTANCES : accountTypes.GET_ACCOUNT_INSTANCES,
    payload: accountServices.getAccountInstances(id, query)
  });

const getAccounts = query => dispatch =>
  dispatch({
    type: accountTypes.GET_ACCOUNTS,
    payload: accountServices.getAccounts(query)
  });

const updateAccount = (id, data) => dispatch =>
  dispatch({
    type: accountTypes.UPDATE_ACCOUNT,
    payload: accountServices.updateAccount(id, data)
  });

const updateAccountField = (id, data) => dispatch =>
  dispatch({
    type: accountTypes.UPDATE_ACCOUNT_FIELD,
    payload: accountServices.updateAccountField(id, data)
  });

const updateAccountImage = (id, data) => dispatch =>
  dispatch({
    type: accountTypes.UPDATE_ACCOUNT_IMAGE,
    payload: accountServices.updateAccountImage(id, data)
  });

const updateAccountImageField = (id, data) => dispatch =>
  dispatch({
    type: accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD,
    payload: accountServices.updateAccountImageField(id, data)
  });

export {
  addAccount,
  deleteAccount,
  getAccount,
  getAccountImages,
  getAccountInstances,
  getAccounts,
  updateAccount,
  updateAccountField,
  updateAccountImage,
  updateAccountImageField
};
