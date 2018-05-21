import axios from 'axios';
import serviceConfig from './index';

/**
 * @api {get} /api/v1/report/ Get report
 * @apiDescription Retrieve usage report.
 *
 * @apiParam (Request message body) {String} cloud_provider
 * @apiParam (Request message body) {String} cloud_account_id
 * @apiParam (Request message body) {Date} start
 * @apiParam (Request message body) {Date} end
 *
 * @apiSuccess {String} aws-ami-000000-nano
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "aws-ami-09648c5666e4f95c7-t2.nano": 1049629.191022
 *     }
 */
const getReport = (data = {}) =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_REPORTS_SERVICE,
      data
    })
  );

export { getReport as default, getReport };
