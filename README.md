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
This is the default context for running the UI
  ```
  $ npm start
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

