import axios from 'axios';
import serviceConfig from './config';
import apiTypes from '../constants/apiConstants';

/**
 * @api {post} /api/v1/account/ Post account
 * @apiDescription Add an account.
 * @apiDescription Use this endpoint to add an account.
 *
 * Reference [cloudigrade/account/tests/views/test_accountviewset.py#L190](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/tests/views/test_accountviewset.py#L190)
 *
 * @apiParam (Request message body) {String} [name] Account name
 * @apiParam (Request message body) {String} account_arn ARN in the form of "arn:aws:iam::123456789012:role/Cloud-Meter-role"
 * @apiParam (Request message body) {String} resourcetype Resource type, standard is currently "AwsAccount"
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:01:30.046910Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "account_arn": [
 *          "account_arn is required"
 *       ]
 *     }
 */
const addAccount = (data = {}) =>
  axios(
    serviceConfig({
      method: 'post',
      url: process.env.REACT_APP_ACCOUNTS_SERVICE,
      data
    })
  );

/**
 * @apiMock {DelayResponse} 2000
 * @api {delete} /api/v1/account/:id/ Delete account
 * @apiDescription Delete a specific account.
 *
 * @apiParam {Number} id Account identifier
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 *
 * @apiError {String} detail
 * @apiErrorExample {text} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "detail": "Account deletion failed because of {reasons}"
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const deleteAccount = id =>
  axios(
    serviceConfig({
      method: 'delete',
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}/`
    })
  );

/**
 * @api {get} /api/v1/account/:id/ Get account
 * @apiDescription Retrieve a specific account.
 *
 * Reference [cloudigrade/account/tests/views/test_accountviewset.py#L73](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/tests/views/test_accountviewset.py#L73)
 *
 * @apiParam {Number} id Account identifier
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem Ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:01:30.046910Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const getAccount = id =>
  axios(
    serviceConfig({
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}/`
    })
  );

/**
 * @api {get} /api/v1/report/accounts/ Get accounts overview
 * @apiDescription List all accounts, and their summaries.
 *
 * Reference [cloudigrade/account/reports.py#L323](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/reports.py#L323)
 *
 * @apiParam (Query string) {Mixed} [account_id] Identifier to filter result set by account
 * @apiParam (Query string) {String} [name_pattern] Identifier associated with a specific user
 * @apiParam (Query string) {Date} start Start date in ISO format
 * @apiParam (Query string) {Date} end End date in ISO format
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Array} cloud_account_overviews
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "cloud_account_overviews": [
 *         {
 *           "arn": "arn:aws:iam::114204391493:role/role-for-cloudigrade",
 *           "cloud_account_id": "114204391493",
 *           "creation_date": "2018-07-06T15:09:21.442412Z",
 *           "id": 1,
 *           "images": 1,
 *           "instances": 2,
 *           "name": "Lorem ipsum",
 *           "openshift_images_challenged": 1,
 *           "openshift_instances": null,
 *           "openshift_memory_seconds": 7600.0,
 *           "openshift_runtime_seconds": 0.0,
 *           "openshift_vcpu_seconds": 1000.0,
 *           "rhel_images_challenged": 0,
 *           "rhel_instances": 2,
 *           "rhel_memory_seconds": 147507.5,
 *           "rhel_runtime_seconds": 87600.4,
 *           "rhel_vcpu_seconds": 77516.9,
 *           "type": "aws",
 *           "user_id": 1
 *         },
 *         {
 *           "arn": "arn:aws:iam::114204391460:role/role-for-cloudigrade",
 *           "cloud_account_id": "114204391460",
 *           "creation_date": "2018-07-06T15:09:10.442412Z",
 *           "id": 2,
 *           "images": 1,
 *           "instances": 1,
 *           "name": "Dolor",
 *           "openshift_images_challenged": 0,
 *           "openshift_instances": 1,
 *           "openshift_memory_seconds": 11600.0,
 *           "openshift_runtime_seconds": 8000.0,
 *           "openshift_vcpu_seconds": 1000.0,
 *           "rhel_images_challenged": 0,
 *           "rhel_instances": null,
 *           "rhel_memory_seconds": 67000.4,
 *           "rhel_runtime_seconds": 10000.0,
 *           "rhel_vcpu_seconds": 32900.2,
 *           "type": "aws",
 *           "user_id": 1
 *         }
 *       ]
 *     }
 * @apiError {String} end
 * @apiError {String} start
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "end": [
 *         "This field is required."
 *       ],
 *       "start": [
 *         "This field is required."
 *       ]
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const getAccounts = (query = {}) =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_ACCOUNTS_SERVICE_OVERVIEW,
      params: query
    })
  );

/**
 * @api {get} /api/v1/report/images/ Get images
 * @apiDescription Get images for an account (or account detail).
 *
 * Reference [cloudigrade/account/reports.py#L499](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/reports.py#L499)
 *
 * Reference [cloudigrade/account/reports.py#L464](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/reports.py#L464)
 *
 * @apiParam (Query string) {Mixed} [user_id] Identifier associated with a specific user
 * @apiParam (Query string) {Mixed} account_id Identifier to filter result set by account
 * @apiParam (Query string) {Date} start Start date in ISO format
 * @apiParam (Query string) {Date} end End date in ISO format
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Array} images
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "images": [
 *         {
 *           "cloud_image_id": "ami-rhel7",
 *           "id": 2,
 *           "instances_seen": 2,
 *           "is_encrypted": false,
 *           "name": null,
 *           "openshift": false,
 *           "openshift_challenged": false,
 *           "openshift_detected": false,
 *           "rhel": true,
 *           "rhel_challenged": false,
 *           "rhel_detected": true,
 *           "memory_seconds": 133907.5,
 *           "runtime_seconds": 77600.4,
 *           "vcpu_seconds": 77016.9,
 *           "status": "inspected"
 *         },
 *         {
 *           "cloud_image_id": "ami-plain",
 *           "id": 7,
 *           "instances_seen": 1,
 *           "is_encrypted": false,
 *           "name": null,
 *           "openshift": false,
 *           "openshift_challenged": false,
 *           "openshift_detected": false,
 *           "rhel": false,
 *           "rhel_challenged": true,
 *           "rhel_detected": true,
 *           "memory_seconds": 0.0,
 *           "runtime_seconds": 0.0,
 *           "vcpu_seconds": 0.0,
 *           "status": "inspecting"
 *         },
 *         {
 *           "cloud_image_id": "ami-rhel8",
 *           "id": 9,
 *           "instances_seen": 1,
 *           "is_encrypted": false,
 *           "name": null,
 *           "openshift": true,
 *           "openshift_challenged": false,
 *           "openshift_detected": true,
 *           "rhel": true,
 *           "rhel_challenged": false,
 *           "rhel_detected": false,
 *           "memory_seconds": 11600.0,
 *           "runtime_seconds": 8000.0,
 *           "vcpu_seconds": 1500.0,
 *           "status": "inspected"
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
/**
 * FixMe: API - issue
 * The API requires the account id be passed as a query param. In order to emulate consistent
 * routing behavior we handle that query bundle at the service level instead.
 */
const getAccountImages = (id, query = {}) =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_ACCOUNTS_SERVICE_IMAGES,
      params: {
        ...{ [apiTypes.API_QUERY_ACCOUNT_ID]: id },
        ...query
      }
    })
  );

/**
 * @api {get} /api/v1/report/instances/ Get instances
 * @apiDescription Get instances to graph, for an account (or account detail).
 *
 * Reference [cloudigrade/account/reports.py#L167](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/reports.py#L167)
 *
 * @apiParam (Query string) {Mixed} [user_id] Identifier associated with a specific user
 * @apiParam (Query string) {Mixed} [account_id] Identifier to filter result set by account
 * @apiParam (Query string) {Mixed} [name_pattern] Filter the result set
 * @apiParam (Query string) {Date} start Start date in ISO format
 * @apiParam (Query string) {Date} end End date in ISO format
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Array} daily_usage
 * @apiSuccess {Number} instances_seen_with_openshift
 * @apiSuccess {Number} instances_seen_with_rhel
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "daily_usage": [
 *         {
 *           "date": "2018-08-01T00:00:00Z",
 *           "openshift_instances": 0,
 *           "openshift_memory_seconds": 0.0,
 *           "openshift_runtime_seconds": 0.0,
 *           "openshift_vcpu_seconds": 0.0,
 *           "rhel_instances": 1,
 *           "rhel_memory_seconds": 107607.0,
 *           "rhel_runtime_seconds": 50400.4,
 *           "rhel_vcpu_seconds": 49216.0
 *         },
 *         {
 *           "date": "2018-08-02T00:00:00Z",
 *           "openshift_instances": 0,
 *           "openshift_memory_seconds": 0.0,
 *           "openshift_runtime_seconds": 0.0,
 *           "openshift_vcpu_seconds": 0.0,
 *           "rhel_instances": 1,
 *           "rhel_memory_seconds": 1200.4,
 *           "rhel_runtime_seconds": 500.0,
 *           "rhel_vcpu_seconds": 300.6
 *         },
 *         {
 *           "date": "2018-08-03T00:00:00Z",
 *           "openshift_instances": 0,
 *           "openshift_memory_seconds": 0.0,
 *           "openshift_runtime_seconds": 0.0,
 *           "openshift_vcpu_seconds": 0.0,
 *           "rhel_instances": 2,
 *           "rhel_memory_seconds": 10200.1,
 *           "rhel_runtime_seconds": 9600.0,
 *           "rhel_vcpu_seconds": 9500.3
 *         },
 *         {
 *           "date": "2018-08-04T00:00:00Z",
 *           "openshift_instances": 1,
 *           "openshift_memory_seconds": 11600.0,
 *           "openshift_runtime_seconds": 8000.0,
 *           "openshift_vcpu_seconds": 1000.0,
 *           "rhel_instances": 2,
 *           "rhel_memory_seconds": 10000.0,
 *           "rhel_runtime_seconds": 9500.0,
 *           "rhel_vcpu_seconds": 9400.0
 *         },
 *         {
 *           "date": "2018-08-05T00:00:00Z",
 *           "openshift_instances": 0,
 *           "openshift_memory_seconds": 0.0,
 *           "openshift_runtime_seconds": 0.0,
 *           "openshift_vcpu_seconds": 0.0,
 *           "rhel_instances": 2,
 *           "rhel_memory_seconds": 10500.0,
 *           "rhel_runtime_seconds": 10000.0,
 *           "rhel_vcpu_seconds": 1900.0
 *         },
 *         {
 *           "date": "2018-08-06T00:00:00Z",
 *           "openshift_instances": 0,
 *           "openshift_memory_seconds": 0.0,
 *           "openshift_runtime_seconds": 0.0,
 *           "openshift_vcpu_seconds": 0.0,
 *           "rhel_instances": 2,
 *           "rhel_memory_seconds": 8000.0,
 *           "rhel_runtime_seconds": 7600.0,
 *           "rhel_vcpu_seconds": 7200.0
 *         }
 *       ],
 *       "instances_seen_with_openshift": 1,
 *       "instances_seen_with_rhel": 3
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
/**
 * FixMe: API - review
 * The API requires the account id be passed as a query param. This scenario
 * appears to mesh a little better since it's not part of the primary display
 * list. See "getAccountImages" for similar behavior
 */
const getAccountInstances = (id = null, query = {}) =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_ACCOUNTS_SERVICE_INSTANCES,
      params: {
        ...{ [apiTypes.API_QUERY_ACCOUNT_ID]: id },
        ...query
      }
    })
  );

/**
 * @api {put} /api/v1/account/:id/ Put account
 * @apiDescription Update a specific account.
 *
 * @apiParam {Number} id Account identifier
 * @apiParam (Request message body) {String} name Account name
 * @apiParam (Request message body) {String} account_arn ARN in the form of "arn:aws:iam::123456789012:role/Cloud-Meter-role"
 * @apiParam (Request message body) {String} resourcetype Resource type, standard is currently "AwsAccount".
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:07:47.078088Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const updateAccount = (id, data = {}) =>
  axios(
    serviceConfig({
      method: 'put',
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}/`,
      data
    })
  );

/**
 * @api {patch} /api/v1/account/:id/ Patch account field
 * @apiDescription Update a specific field for account.
 *
 * Reference for name updates [cloudigrade/account/tests/views/test_accountviewset.py#L261](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/tests/views/test_accountviewset.py#L261)
 *
 * @apiParam {Number} id Account identifier
 * @apiParam (Request message body) {String} [name] Account name
 * @apiParam (Request message body) {String} resourcetype Resource type, standard is currently "AwsAccount". API limitation this is a REQUIRED property when submitting patched data.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:07:47.078088Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const updateAccountField = (id, data = {}) =>
  axios(
    serviceConfig({
      method: 'patch',
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}/`,
      data
    })
  );

/**
 * @api {put} /api/v1/image/:id/ Put image
 * @apiDescription Update a specific image.
 *
 * Reference [cloudigrade/account/models.py#L53](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/models.py#L53)
 *
 * Reference [cloudigrade/account/tests/views/test_machineimageviewset.py](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/tests/views/test_machineimageviewset.py)
 *
 * @apiParam {Number} id Image identifier
 * @apiParam (Request message body) {Boolean} rhel_challenged Is RHEL detected
 * @apiParam (Request message body) {Boolean} openshift_challenged Is OCP detected
 * @apiParam (Request message body) {String} resourcetype Resource type, standard is currently "AwsMachineImage"
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Date} created_at
 * @apiSuccess {String} ec2_ami_id
 * @apiSuccess {Number} id
 * @apiSuccess {Unknown} inspection_json
 * @apiSuccess {Boolean} is_encrypted
 * @apiSuccess {Boolean} openshift
 * @apiSuccess {Boolean} openshift_challenged
 * @apiSuccess {Boolean} openshift_detected
 * @apiSuccess {String} owner_aws_account_id
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Boolean} rhel
 * @apiSuccess {Boolean} rhel_challenged
 * @apiSuccess {Boolean} rhel_detected
 * @apiSuccess {Enum} status
 * - pending
 * - preparing
 * - inspecting
 * - inspected
 * - error
 * @apiSuccess {Date} updated_at
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "created_at": "2018-07-30T15:41:16.310031Z",
 *       "ec2_ami_id": "ami-plain",
 *       "id": 2,
 *       "inspection_json": null,
 *       "is_encrypted": false,
 *       "openshift": false,
 *       "openshift_challenged": true,
 *       "openshift_detected": false,
 *       "owner_aws_account_id": "273470430754",
 *       "resourcetype": "AwsMachineImage",
 *       "rhel": true,
 *       "rhel_challenged": true,
 *       "rhel_detected": false,
 *       "status": "pending",
 *       "updated_at": "2018-07-30T15:31:02.026393Z"
 *     }
 *
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const updateAccountImage = (id, data = {}) =>
  axios(
    serviceConfig({
      method: 'put',
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE_IMAGE}${id}/`,
      data
    })
  );

/**
 * @apiMock {DelayResponse} 2000
 * @api {patch} /api/v1/image/:id/ Patch image field
 * @apiDescription Update a specific field for an image.
 *
 * Reference [cloudigrade/account/models.py#L53](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/models.py#L53)
 *
 * Reference [cloudigrade/account/tests/views/test_machineimageviewset.py](https://gitlab.com/cloudigrade/cloudigrade/blob/master/cloudigrade/account/tests/views/test_machineimageviewset.py)
 *
 * @apiParam {Number} id Image identifier
 * @apiParam (Request message body) {Boolean} [rhel_challenged] Is RHEL detected
 * @apiParam (Request message body) {Boolean} [openshift_challenged] Is OCP detected
 * @apiParam (Request message body) {String} resourcetype Resource type, standard is currently "AwsMachineImage". API limitation this is a REQUIRED property when submitting patched data.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Date} created_at
 * @apiSuccess {String} ec2_ami_id
 * @apiSuccess {Number} id
 * @apiSuccess {Unknown} inspection_json
 * @apiSuccess {Boolean} is_encrypted
 * @apiSuccess {Boolean} openshift
 * @apiSuccess {Boolean} openshift_challenged
 * @apiSuccess {Boolean} openshift_detected
 * @apiSuccess {String} owner_aws_account_id
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Boolean} rhel
 * @apiSuccess {Boolean} rhel_challenged
 * @apiSuccess {Boolean} rhel_detected
 * @apiSuccess {Enum} status
 * - pending
 * - preparing
 * - inspecting
 * - inspected
 * - error
 * @apiSuccess {Date} updated_at
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "created_at": "2018-07-30T15:41:16.310031Z",
 *       "ec2_ami_id": "ami-plain",
 *       "id": 2,
 *       "inspection_json": null,
 *       "is_encrypted": false,
 *       "openshift": false,
 *       "openshift_challenged": true,
 *       "openshift_detected": false,
 *       "owner_aws_account_id": "273470430754",
 *       "resourcetype": "AwsMachineImage",
 *       "rhel": true,
 *       "rhel_challenged": true,
 *       "rhel_detected": false,
 *       "status": "pending",
 *       "updated_at": "2018-07-30T15:31:02.026393Z"
 *     }
 *
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const updateAccountImageField = (id, data = {}) =>
  axios(
    serviceConfig({
      method: 'patch',
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE_IMAGE}${id}/`,
      data
    })
  );

export {
  addAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  getAccountImages,
  getAccountInstances,
  updateAccount,
  updateAccountField,
  updateAccountImage,
  updateAccountImageField
};
