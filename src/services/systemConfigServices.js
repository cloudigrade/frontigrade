import axios from 'axios';
import serviceConfig from './config';

/**
 * @api {get} /api/v1/sysconfig/ Get system configuration
 * @apiDescription Return system configuration strings.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} count
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "aws_account_id": "123456789012",
 *       "aws_policies": {
 *         "traditional_inspection": {
 *           "Version":"2012-10-17",
 *           "Statement": [
 *             {
 *               "Sid":"VisualEditor0",
 *               "Effect":"Allow",
 *               "Action":[
 *                 "ec2:DescribeImages",
 *                 "ec2:DescribeInstances",
 *                 "ec2:ModifySnapshotAttribute",
 *                 "ec2:DescribeSnapshotAttribute",
 *                 "ec2:DescribeSnapshots",
 *                 "ec2:CopyImage",
 *                 "ec2:CreateTags",
 *                 "cloudtrail:CreateTrail",
 *                 "cloudtrail:UpdateTrail",
 *                 "cloudtrail:PutEventSelectors",
 *                 "cloudtrail:DescribeTrails",
 *                 "cloudtrail:StartLogging",
 *                 "cloudtrail:StopLogging"
 *               ],
 *               "Resource":"*"
 *             }
 *           ]
 *         }
 *       },
 *       "version": "XXX-cloudigrade-version - 0000000000000000000000000000000000000000"
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const getSystemConfig = () =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_SYSTEM_CONFIG_SERVICE
    })
  );

export { getSystemConfig as default, getSystemConfig };
