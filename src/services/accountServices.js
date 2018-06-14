import axios from 'axios';
import serviceConfig from './index';

/**
 * @api {get} /api/v1/account/ Get accounts
 * @apiDescription List all accounts.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Number} count
 * @apiSuccess {String} next
 * @apiSuccess {String} previous
 * @apiSuccess {Array} results
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "count": 1,
 *       "next": null,
 *       "previous": null,
 *       "results": [
 *         {
 *           "account_arn": "arn:aws:iam::518028203513:role/grant_cloudi_to_372779871274",
 *           "aws_account_id": "518028203513",
 *           "created_at": "2018-03-19T20:26:10.798690Z",
 *           "id": 1,
 *           "resourcetype": "AwsAccount",
 *           "updated_at": "2018-03-19T20:26:10.798727Z",
 *           "url": "http://localhost:8080/api/v1/account/1/"
 *         }
 *       ]
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const getAccounts = (id = '') =>
  axios(
    serviceConfig({
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}`
    })
  );

/**
 * @api {get} /api/v1/account/:id Get account
 * @apiDescription Retrieve a specific account.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
         "account_arn": "arn:aws:iam::518028203513:role/grant_cloudi_to_372779871274",
         "aws_account_id": "518028203513",
         "created_at": "2018-03-19T20:26:10.798690Z",
         "id": 1,
         "resourcetype": "AwsAccount",
         "updated_at": "2018-03-19T20:26:10.798727Z",
         "url": "http://localhost:8080/api/v1/account/1/"
       }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const getAccount = id => getAccounts(id);

export { getAccounts, getAccount };
