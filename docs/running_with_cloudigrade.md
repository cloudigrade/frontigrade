### Running with the Cloudigrade API toolset
[Cloudigrade](https://gitlab.com/cloudigrade/cloudigrade), with Frontigrade, is laid out with the intent to run
against a specific version of Openshift in production. Frontigrade, currently, uses a `.env.oc` `dotenv` file to direct the API calls to the
locally running Openshift and Cloudigrade API.

#### Setup Cloudigrade
To develop the UI with Cloudigrade you'll need:
1. To setup Docker appropriately. [Guidance for working with Openshift can be found on the Github Origin repo](https://github.com/openshift/origin/blob/master/docs/cluster_up_down.md#getting-started). The basics aimed at setting up an insecure registry of 172.30.0.0/16
1. Next, you'll need to install the Openshift-CLI, you can use [homebrew](https://brew.sh/), [see shiftigrade for exact install directions and CLI version](https://github.com/cloudigrade/shiftigrade#running-cloudigrade), but basically:
   ```
   $ brew update
   $ brew install [correct version of openshift-cli]
   ```
1. You'll need to Git clone the [Shiftigrade repository](https://gitlab.com/cloudigrade/shiftigrade):
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
   
#### OpenShift local serve within Frontigrade: Archived
*This script is currently non-functioning, and will most likely be removed in the future.*

Once you've gone through the [Cloudigrade install process](https://gitlab.com/cloudigrade/cloudigrade#developer-environment), and confirmed [tooling for Cloudigrade](https://github.com/cloudigrade/cloudigrade#developer-environment) works you can make use of the local Openshift convenience scripting
  ```
  $ yarn start:oc
  ```

#### Having issues running Cloudigrade on Openshift locally?
If you're having issues running Cloudigrade on Openshift, run through some of the following solutions.

1. Docker isn't quite playing along. _It should be noted these are extreme, you will be removing data_. You can try **one**, or all of these:
   - `$ docker rmi -f $(docker images -aq)`
   - `$ docker volume rm -f $(docker volume ls -q)`
   - `$ docker rm $(docker ps -qa --no-trunc --filter "status=exited")`
   - `$ docker system prune -a`
2. [You forgot to set some of the AWS environment variables](https://gitlab.com/cloudigrade/cloudigrade#configure-aws-account-credentials). Try running, within the Cloudigrade repo directory context:
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
