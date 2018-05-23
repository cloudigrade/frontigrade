import axios from 'axios';
import cookies from 'js-cookie';
import serviceConfig from './index';

/**
 * @api {get} /auth/me/ User information
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} email
 * @apiSuccess {String} username
 * @apiSuccess {Number} id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "test@redhat.com",
 *       "id": 1,
 *       "username": "developer"
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const checkUser = () =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_USER_SERVICE_CURRENT
    })
  );

/**
 * @api {post} /auth/users/create/ Create user
 * @apiDescription Use this endpoint to register new user.
 *
 * @apiParam (Request message body) {String} [email] Email address test
 * @apiParam (Request message body) {String} username Username
 * @apiParam (Request message body) {Number} [id] ID
 * @apiParam (Request message body) {String} password Password
 *
 * @apiSuccess {String} email
 * @apiSuccess {String} username
 * @apiSuccess {Number} id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "test@redhat.com",
 *       "username": "developer",
 *       "id":1
 *     }
 */
const createUser = (data = {}) =>
  axios(
    serviceConfig(
      {
        method: 'post',
        url: process.env.REACT_APP_USER_SERVICE_CREATE,
        data
      },
      false
    )
  );

/**
 * @api {post} /auth/users/delete/ Delete user
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "detail": "Invalid token"
 *     }
 */
const deleteUser = (data = {}) =>
  axios(
    serviceConfig({
      method: 'post',
      url: process.env.REACT_APP_USER_SERVICE_DELETE,
      data
    })
  );

/**
 * @api {post} /auth/token/create/ Login user
 * @apiDescription Use this endpoint to obtain user authentication token.
 *
 * @apiParam (Request message body) {String} [username] Username
 * @apiParam (Request message body) {String} [password] Password
 *
 * @apiSuccess {String} auth_token
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth_token": "b704c9fc3655635646356ac2950269f352ea1139"
 *     }
 */
const loginUser = (data = {}) =>
  axios(
    serviceConfig(
      {
        method: 'post',
        url: process.env.REACT_APP_USER_SERVICE_LOGIN,
        data
      },
      false
    )
  ).then(success => {
    // ToDo: review using session/local storage instead of session cookie
    if (success.data && success.data.auth_token) {
      cookies.set(process.env.REACT_APP_AUTH_TOKEN, success.data.auth_token);
      return success;
    }

    throw new Error('User not authorized.');
  });

/**
 * @api {post} /auth/token/destroy/ Logout user
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "detail": "Invalid token"
 *     }
 */
const logoutUser = () =>
  axios(
    serviceConfig({
      method: 'post',
      url: process.env.REACT_APP_USER_SERVICE_LOGOUT
    })
  ).then(() => {
    // ToDo: review using session/local storage instead of session cookie
    cookies.remove(process.env.REACT_APP_AUTH_TOKEN);
  });

export { checkUser, createUser, deleteUser, loginUser, logoutUser };
