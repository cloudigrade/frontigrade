# Frontigrade
[![License](https://img.shields.io/github/license/cloudigrade/frontigrade.svg)](https://github.com/cloudigrade/frontigrade/blob/master/LICENSE)
[![Build Status](https://gitlab.com/cloudigrade/frontigrade/badges/master/pipeline.svg)](https://gitlab.com/cloudigrade/frontigrade)
[![codecov](https://codecov.io/gl/cloudigrade/frontigrade/branch/master/graph/badge.svg)](https://codecov.io/gl/cloudigrade/frontigrade)

Web user interface for [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade), based on [Patternfly <img src="https://www.patternfly.org/assets/img/logo.svg" height="30" />](https://www.patternfly.org/)

## Requirements
Before developing for Frontigrade, the basic requirements:
 * Your system needs to be running [NodeJS version 8+](https://nodejs.org/)
 * [Docker](https://docs.docker.com/engine/installation/)
 * And **NOW REQUIRED** [Yarn 1.9+](https://yarnpkg.com) for the initial install. NPM can be used to run subsequent steps after Yarn has done the initial install.

### Docker & Mac
Setting Docker up on a Mac? Install the appropriate package and you should be good to go. To check if everything installed correctly you can try these steps.
  * At a terminal prompt type

    ```
    $ docker run hello-world
    ```

### Docker & Linux
Setting Docker up on a Linux machine can include an additional convenience step. If you're having to prefix "sudo" in front of your Docker commands you can try these steps.
  * [Docker postinstall documentation](https://docs.docker.com/install/linux/linux-postinstall/)

## Development

### Installing
  1. Clone the repository
     ```
     $ git clone https://gitlab.com/cloudigrade/frontigrade.git
     ```

  1. Within the Frontigrade repo, install project dependencies
     ```
     $ yarn
     ```

### Development Serve
This is the default context for running the UI with a local mock API. You need the base Frontigrade requirements to run this context.
  ```
  $ yarn start
  ```
There are limitations in running against the mock serve, accuracy in API responses is much more lenient. Meaning server responses may not throw the appropriate errors where needed.
  
#### Review serve
*Review serve has been suspended against the built in default test.cloudigra.de. The functionality 
still remains, however you'll need to run it against a custom Cloudigrade instance, directions below.*

An alternative to running the development serve is the review serve. `This allows you to interact with an OpenShift environment without having to install or update anything outside of Frontigrade.` You only need the base Frontigrade requirements to run this context, and a login for `test.cloudigra.de`
  ```
  $ yarn start:review
  ```
  
##### Don't want to run against the default test.cloudigra.de?

To run against a different instance of [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade), create a file in the root
of the `frontigrade` repo named `.env.local`, within it, set `API_HOST` to the desired cloudigrade instance.

Run this terminal command to create a `.env.local` file with the appropriate host reference: 
  ```
  cat > .env.local << 'EOL'
  API_HOST=https://your_url_for_some_cloudigrade_instance
  EOL
  ```

Then run `$ yarn start:review`.

**NOTE:** 
- Any time you want to change `API_HOST`, you must `ctl-c` out of `$ yarn start:review` and then restart it. 

### Debugging with the mock server

#### Force a specific http status for development responses
If you've run the development command `$ yarn start` you can spoof and force a specific http status for an endpoint.

To force a specific http status you'll need to add an annotation to the ApiDoc service file annotations located here:
- `src/services/*.js` 

Add a line similar to `* @apiMock {ForceStatus} 503` where `503` is the status you want to emulate. A "hot" reload means you can manipulate the status in real time. Example:
  ```js
  /**
   * @apiMock {ForceStatus} 503
   * 
   * @api {post} /api/v1/account/ Post account
   * @apiDescription Add an account.
   * @apiDescription Use this endpoint to add an account.
   *
   * @apiParam (Request message body) {String} 

   ...

   */
  ```
**NOTE:** 
- **False positives warning:** *Forcing http status moves outside normal server behavior and can lead to unexpected results and combinations. Correlation does not always equate to an issue.* 

#### Debugging Redux
This project makes use of React & Redux. To enable Redux console logging, within the repository root directory, add a `.env.local` (dotenv) file with the follow line
  ```
  REACT_APP_DEBUG_MIDDLEWARE=true
  ```

Once you've made the change, restart the project and console browser logging should appear.


*Any changes you make to the `.env.local` file should be ignored with `.gitignore`.*

### Unit Testing
To run the unit tests, use this command
  ```
  $ yarn test
  ```
  
To run the unit tests with a watch during development
  ```
  $ yarn test:dev
  ```

### Running with the Cloudigrade API toolset locally

[More detail regarding running Frontigrade with Cloudigrade](./docs/running_with_cloudigrade.md)
