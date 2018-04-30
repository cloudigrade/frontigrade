# Frontigrade UI
[![Build Status](https://travis-ci.org/cloudigrade/frontigrade.svg?branch=master)](https://travis-ci.org/cloudigrade/frontigrade) 
[![codecov](https://codecov.io/gh/cloudigrade/frontigrade/branch/master/graph/badge.svg)](https://codecov.io/gh/cloudigrade/frontigrade)

Web user interface for [Cloudigrade](https://github.com/cloudigrade/cloudigrade), based on [Patternfly <img src="https://www.patternfly.org/assets/img/logo.svg" height="30" />](https://www.patternfly.org/)

## Requirements
Before developing for Frontigrade, the basic requirements:
 * Your system needs to be running [NodeJS version 8+](https://nodejs.org/)
 * [Docker](https://docs.docker.com/engine/installation/)
 * And optionally [Yarn 1.5+](https://yarnpkg.com), otherwise NPM should be adequate.
 
## Development

### Installing
1. Clone the repository::
```
  $ git clone git@github.com:cloudigrade/frontigrade.git
```

2. Within the Frontigrade repo, install project dependencies
```
  $ npm install
```

### Development Serve
This is the default context for running the UI
```
  $ npm start
```

### Unit Testing
To run the unit tests, use this command
```
  $ npm test
```

