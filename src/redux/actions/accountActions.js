import { accountTypes } from '../constants';
import { accountServices } from '../../services/';

const getAccount = id => dispatch =>
  dispatch({
    type: accountTypes.GET_ACCOUNT,
    payload: accountServices.getAccount(id)
  });

const getAccounts = () => dispatch =>
  dispatch({
    type: accountTypes.GET_ACCOUNTS,
    payload: accountServices.getAccounts()
  });

export { getAccount, getAccounts };
