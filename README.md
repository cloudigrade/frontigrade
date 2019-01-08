# Frontigrade
[![License](https://img.shields.io/github/license/cloudigrade/frontigrade.svg)](https://github.com/cloudigrade/frontigrade/blob/master/LICENSE)
[![Build Status](https://gitlab.com/cloudigrade/frontigrade/badges/master/pipeline.svg)](https://gitlab.com/cloudigrade/frontigrade)
[![codecov](https://codecov.io/gl/cloudigrade/frontigrade/branch/master/graph/badge.svg)](https://codecov.io/gl/cloudigrade/frontigrade)

Web user interface for [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade), based on [Patternfly <img src="https://www.patternfly.org/assets/img/logo.svg" height="30" />](https://www.patternfly.org/)

## Requirements
Before developing for Frontigrade, the basic requirements:
 * Your system needs to be running [NodeJS version 8+](https://nodejs.org/)
 * [Docker](https://docs.docker.com/engine/installation/)
 * And [Yarn 1.12+](https://yarnpkg.com) for dependency and script management.

### Docker & Mac
Setting Docker up on a Mac? Install the appropriate package and you should be good to go. To check if everything installed correctly you can try these steps.
  * At a terminal prompt type

    ```
    $ docker run hello-world
    ```

### Docker & Linux
Setting Docker up on a Linux machine can include an additional convenience step. If you're having to prefix "sudo" in front of your Docker commands you can try these steps.
  * [Docker postinstall documentation](https://docs.docker.com/install/linux/linux-postinstall/)

### Yarn
 We recommend using [Homebrew](https://brew.sh/) to do the install.

  ```
  $ brew update
  $ brew install yarn
  ```

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

Make sure **Docker** is running, then run
  ```
  $ yarn start
  ```
There are limitations in running against the mock serve, accuracy in API responses is much more lenient. This means server responses may not throw the appropriate errors where needed.
  
#### Testing Features, Review serve
*Review serve in it's original form has been removed from test.cloudigra.de.*

[The Cloudigrade project uses multiple environments](https://gitlab.com/cloudigrade/shiftigrade#our-environments) including a review enivronment. 

To test a new feature a feature branch, with the exact same name, needs to be created on both the Frontigrade and [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade) repositories.
Once the feature branches are created on both repositories you can access them via the browser here
- https://cloudireview-FEATURE_BRANCH_NAME_GOES_HERE.5a9f.insights-dev.openshiftapps.com/

#### Using review serve against a local run Frontigrade
You can take advantage of the review serve setup by running your local copy of Frontigrade against the feature branch generated host.

1. First, make sure that feature branches, with the same names, have been created on both Frontigrade and [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade)
1. Next create a `.env.local` file in the root of your local Frontigrade

   You can run this terminal command to create a `.env.local` file with the appropriate host reference. Make sure to replace `FEATURE_BRANCH_NAME_GOES_HERE` with the correct feature branch name: 
   ```
   cat > .env.local << 'EOL'
   API_HOST=https://cloudireview-FEATURE_BRANCH_NAME_GOES_HERE.5a9f.insights-dev.openshiftapps.com
   EOL
   ```
1. Run the command
   ```
   $ yarn start:review
   ```
1. After you've completed your testing make sure to clean up, either by removing or merging, the feature branches on Frontigrade and [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade)

**NOTE:** 
- Any time you want to change `API_HOST`, you must `ctl-c` out of `$ yarn start:review` update the `.env.local` file and then restart it. 

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
To run the unit tests with a watch during development you'll need to open an additional terminal instance, then run
  ```
  $ yarn test:dev
  ```
  
### Integration Testing
Our testing team handles integration testing. To help with integration tests occasionally we add the attribute `data-test`, for example:
  ```
  <someElement data-test="some value">
  ```

If you come across these attributes the HTML can be modified, but the attributes and values should be retained.

#### Updating snapshots
To update snapshots from the terminal run 
  ```
  $ yarn test:dev
  ```
  
From there you'll be presented with a few choices, one of them is "update", you can then hit the "u" key. Once the update script has run you should see additional changed files within Git, make sure to commit them along with your changes or testing will fail.

#### Checking code coverage
To check the coverage report from the terminal run
  ```
  $ yarn test
  ```
  
#### Code coverage failing to update?
If you're having trouble getting an accurate code coverage report, or it's failing to provide updated results (i.e. you renamed files) you can try running
  ```
  $ yarn test:clearCache
  ```

### Running with the Cloudigrade API toolset locally

Frontigrade is the web user interface for [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade), held together with [Shiftigrade](https://gitlab.com/cloudigrade/shiftigrade). Please refer to [Shiftigrade](https://gitlab.com/cloudigrade/shiftigrade) for up to date instructions on how to run [Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade). These instructions are a prerequisite for setting up your developer environment.
