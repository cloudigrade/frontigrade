import { userTypes } from '../constants';
import { userServices } from '../../services/';

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

const whoami = () => dispatch =>
  dispatch({
    type: userTypes.USER_INFO,
    payload: userServices.whoami()
  });

export { createUser, deleteUser, loginUser, logoutUser, whoami };
