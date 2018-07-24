import { accountTypes } from '../constants';
import { accountServices } from '../../services/';

const addAccount = data => dispatch =>
  dispatch({
    type: accountTypes.ADD_ACCOUNT,
    payload: accountServices.addAccount(data)
  });

const getAccount = id => dispatch =>
  dispatch({
    type: accountTypes.GET_ACCOUNT,
    payload: accountServices.getAccount(id)
  });

const getAccounts = query => dispatch =>
  dispatch({
    type: accountTypes.GET_ACCOUNTS,
    payload: accountServices.getAccounts(query)
  });

const updateAccount = (id, data) => dispatch =>
  dispatch({
    type: accountTypes.ADD_ACCOUNT,
    payload: accountServices.updateAccount(id, data)
  });

export { addAccount, getAccount, getAccounts, updateAccount };
