import { userTypes } from '../constants';
import { userServices } from '../../services/';

const checkUser = () => dispatch =>
  dispatch({
    type: userTypes.USER_INFO,
    payload: userServices.checkUser()
  });

const createUser = data => dispatch =>
  dispatch({
    type: userTypes.USER_CREATE,
    payload: userServices.createUser(data)
  });

const deleteUser = data => dispatch =>
  dispatch({
    type: userTypes.USER_DELETE,
    payload: userServices.deleteUser(data)
  });

const loginUser = data => dispatch =>
  dispatch({
    type: userTypes.USER_LOGIN,
    payload: userServices.loginUser(data)
  });

const logoutUser = () => dispatch =>
  dispatch({
    type: userTypes.USER_LOGOUT,
    payload: userServices.logoutUser()
  });

export { checkUser, createUser, deleteUser, loginUser, logoutUser };
