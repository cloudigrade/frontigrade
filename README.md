# Frontigrade
[![License](https://img.shields.io/github/license/cloudigrade/frontigrade.svg)](https://github.com/cloudigrade/frontigrade/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/cloudigrade/frontigrade.svg?branch=master)](https://travis-ci.org/cloudigrade/frontigrade)
[![codecov](https://codecov.io/gh/cloudigrade/frontigrade/branch/master/graph/badge.svg)](https://codecov.io/gh/cloudigrade/frontigrade)

Web user interface for [Cloudigrade](https://github.com/cloudigrade/cloudigrade), based on [Patternfly <img src="https://www.patternfly.org/assets/img/logo.svg" height="30" />](https://www.patternfly.org/)

## Requirements
Before developing for Frontigrade, the basic requirements:
 * Your system needs to be running [NodeJS version 8+](https://nodejs.org/)
 * [Docker](https://docs.docker.com/engine/installation/)
 * And optionally [Yarn 1.5+](https://yarnpkg.com), otherwise NPM should be adequate.

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
     $ git clone git@github.com:cloudigrade/frontigrade.git
     ```

  1. Within the Frontigrade repo, install project dependencies
     ```
     $ npm install
     ```

### Development Serve
This is the default context for running the UI with a local mock API. You need the base Frontigrade requirements to run this context.
  ```
  $ npm start
  ```
There are limitations in running against the mock serve, accuracy in API responses is much more lenient. Meaning server responses may not throw the appropriate errors where needed.

#### OpenShift local serve

Once you've gone through the [Cloudigrade install process](https://github.com/cloudigrade/cloudigrade#developer-environment), and confirmed [tooling for Cloudigrade](https://github.com/cloudigrade/cloudigrade#developer-environment) works you can make use of the local Openshift convenience scripting
  ```
  $ npm run start:oc
  ```
  
#### Review serve
An alternative to running the development or OpenShift serve is the review serve. This allows you to view an environment without having to use OpenShift locally. You only need the base Frontigrade requirements to run this context.
  ```
  $ npm run start:review
  ```
 

#### Debugging Redux
This project makes use of React & Redux. To enable Redux console logging, within the `[REPO]/client` directory, add a `.env.local` (dotenv) file with the follow line
  ```
  REACT_APP_DEBUG_MIDDLEWARE=true
  ```

Once you've made the change, restart the project and console browser logging should appear.


*Any changes you make to the `.env.local` file should be ignored with `.gitignore`.*

### Unit Testing
To run the unit tests, use this command
  ```
  $ npm test
  ```
  
To run the unit tests with a watch during development
  ```
  $ npm run test:dev
  ```

### Development with a Cloudigrade API toolset
[Cloudigrade](https://github.com/cloudigrade/cloudigrade), with Frontigrade, is laid out with the intent to run
against a specific version of Openshift in production. Frontigrade, currently, uses `.env.development` `dotenv` file to direct the API calls to the
locally running Openshift and Cloudigrade API.

#### Setup Cloudigrade
To develop the UI with Cloudigrade you'll need:
1. To setup Docker appropriately. [Guidance for working with Openshift can be found on the Github Origin repo](https://github.com/openshift/origin/blob/master/docs/cluster_up_down.md#getting-started). The basics aimed at setting up an insecure registry of 172.30.0.0/16
1. Next, you'll need to install the Openshift-CLI, you can use [homebrew](https://brew.sh/), [see shiftigrade for exact install directions and CLI version](https://github.com/cloudigrade/shiftigrade#running-cloudigrade), but basically:
   ```
   $ brew update
   $ brew install [correct version of openshift-cli]
   ```
1. You'll need to Git clone the [Shiftigrade repository](https://github.com/cloudigrade/shiftigrade):
   ```
   $ git clone git@github.com:cloudigrade/shiftigrade.git
   ```
1. Change directories into the cloned Cloudigrade repo, and start the app:
   ```
   $ cd [local shiftigrade repo]
   $ make oc-clean && make oc-up
   ```
1. From there you should be able to navigate to the [Openshift Control Panel](https://127.0.0.1:8443).
1. To power Cloudigrade down run the following while still within the shiftigrade repo:
   ```
   $ make oc-down
   ```

#### Having issues running Cloudigrade on Openshift locally?
If you're having issues running Cloudigrade on Openshift, run through some of the following solutions.

1. Docker isn't quite playing along. _It should be noted these are extreme, you will be removing data_. You can try **one**, or all of these:
   - `$ docker rmi -f $(docker images -aq)`
   - `$ docker volume rm -f $(docker volume ls -q)`
   - `$ docker rm $(docker ps -qa --no-trunc --filter "status=exited")`
   - `$ docker system prune -a`
2. [You forgot to set some of the AWS environment variables](https://github.com/cloudigrade/cloudigrade#configure-aws-account-credentials). Try running, within the Cloudigrade repo directory context:
   ```
   $ export AWS_ACCESS_KEY_ID=[YOUR KEY ID]
   $ export AWS_SECRET_ACCESS_KEY=[YOUR ACCESS KEY]
   $ make oc-create-cloudigrade
   $ make oc-up
   ```
3. An aspect of Cloudigrade failed to deploy within Openshift. Try running, within the Cloudigrade repo directory context:
   ```
   $ make oc-clean
   $ make oc-up-all
   ```
   You may have to wait a minute or two for the containers to be up and running, you can `$ docker ps` to check.
