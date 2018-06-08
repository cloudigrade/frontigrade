#!/usr/bin/env bash
#
#
# Setup user for Cloudigrade
setupUser()
{
  local CHECK_SUCCESS="{\"email\":\"\",\"username\":\"$1\",\"id\":1}"
  local CHECK_EXISTS="{\"username\":[\"A user with that username already exists.\"]}"
  local COLOR=$RED
  local STATUS="ERROR"
  local USER_NAME=$1
  local USER_PASSWORD=$2
  local USER_ENDPOINT=$3
  local RESPONSE=""

  echo "Test user logging in..."

  RESPONSE=$(curl -s -d "{\"username\":\"$USER_NAME\", \"password\":\"$USER_PASSWORD\"}" -H "Content-Type: application/json" -X POST $USER_ENDPOINT)

  if [ "$RESPONSE" = "$CHECK_SUCCESS" ] || [ "$RESPONSE" = "$CHECK_EXISTS" ]; then
    COLOR=$GREEN
    STATUS="SUCCESS"
  fi

  echo "Response: "$RESPONSE | cut -c 1-100

  printf "\n${COLOR}Test user ${STATUS}.\n"
  printf "\n${COLOR}  username=${USER_NAME}"
  printf "\n${COLOR}  password=${USER_PASSWORD}${NOCOLOR}\n\n"
}
#
#
# Check pod status
checkOc()
{
  local COUNT=1
  local DELAY=1
  local DURATION=$1

  printf "Is pod running..."

  while [ $COUNT -le $DURATION ]; do
    sleep $DELAY
    (( COUNT++ ))
    if [ ! -z "$(oc get pods | grep -e 'cloudigrade-api.*Completed' -e 'cloudigrade-nginx.*Completed' -e 'frontigrade.*Completed')" ] && [ -z "$(oc get pods | grep -e 'Error' -e 'Pending' -e 'ContainerCreating' -e '-hook-mid' -e '-deploy')" ]; then
      break
    fi
  done

  if [ -z "$(oc get pods | grep -e 'cloudigrade-api.*Completed' -e 'cloudigrade-nginx.*Completed' -e 'frontigrade.*Completed')" ] || [ ! -z "$(oc get pods | grep -e 'Error' -e 'Pending' -e 'ContainerCreating')" ]; then
    printf "  ${RED}POD ERROR... after ${COUNT} secs stopping oc local run\n"
    printf "${NOCOLOR}\n"
    oc get pods
    oc cluster down
    exit 1
  fi

  printf "  ${GREEN}POD SUCCESS after ${COUNT} secs... continuing\n"
  printf "${NOCOLOR}"
}
#
#
# Basic start for Cloudigrade
startOc()
{
  local LOCAL_CONFIG=.env.local
  local REPO_PATH="${HOME}/.frontigrade"
  local REPO_LOCAL="${HOME}/.frontigrade/shiftigrade"
  local REPO="https://github.com/cloudigrade/shiftigrade.git"
  local UPDATE=$1

  if [ -z "$(git version)" ]; then
    printf "\n${RED}Git missing.${NOCOLOR}\n"
    exit 0
  fi

  if [ -z "$(oc version)" ]; then
    printf "\n${RED}OpenShift CLI missing.${NOCOLOR}\n"
    exit 0
  fi

  if [ -z "$(docker -v)" ]; then
    printf "\n${RED}Docker Daemon missing.${NOCOLOR}\n"
    exit 0
  fi

  if [ -z "$(docker -v | grep -e ' 1.10' -e ' 1.12' -e ' 1.13')" ]; then
    printf "\n${RED}Docker version currently running may cause cluster issues.${NOCOLOR}"
    printf "\n  ${RED}See OpenShift documentation:${NOCOLOR} https://bit.ly/2JB7Kre\n"
  fi

  if [ -z "$(checkOc 1 | grep SUCCESS)" ] || [ "$UPDATE" = true ]; then
    oc cluster down

    if [ -f $LOCAL_CONFIG ]; then
      set -a
        . $LOCAL_CONFIG
      set +a
    fi

    if [ -z "$AWS_ACCESS_KEY_ID" ]; then
      echo "Missing local config for AWS_ACCESS_KEY_ID"
      echo "Exiting API setup..."
      exit 1
    fi

    if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
      echo "Missing local config for AWS_SECRET_ACCESS_KEY"
      echo "Exiting API setup..."
      exit 1
    fi

    if [ -z "$AWS_SQS_ACCESS_KEY_ID" ]; then
      echo "Missing local config for AWS_SQS_ACCESS_KEY_ID"
      echo "Exiting API setup..."
      exit 1
    fi

    if [ -z "$AWS_SQS_SECRET_ACCESS_KEY" ]; then
      echo "Missing local config for AWS_SQS_SECRET_ACCESS_KEY"
      echo "Exiting API setup..."
      exit 1
    fi

    if [ ! -d "$REPO_LOCAL/.git" ]; then
      echo "Cloning Shiftigrade..."
      mkdir -p $REPO_PATH
      cd $REPO_PATH
      git clone $REPO
      cd $REPO_LOCAL
    else
      echo "Updating Shiftigrade..."
      cd $REPO_LOCAL
      git fetch origin master
      git reset --hard origin/master
    fi

    make oc-clean
    oc cluster down
    make oc-up-all
  fi
}
#
#
# main()
#
{
  RED="\e[31m"
  GREEN="\e[32m"
  NOCOLOR="\e[39m"
  ENDPOINT="http://cloudigrade.127.0.0.1.nip.io/auth/users/create/"
  USERNAME="test@cloudigra.de"
  PASSWORD="developer"
  UPDATE=false

  while getopts e:n:p:u option;
  do
    case $option in
      e ) ENDPOINT=$OPTARG;;
      n ) USERNAME=$OPTARG;;
      p ) PASSWORD=$OPTARG;;
      u ) UPDATE=true;;
    esac
  done

  startOc $UPDATE
  checkOc 180
  setupUser $USERNAME $PASSWORD $ENDPOINT

  oc get pods
  printf "\n${GREEN}Cloudigrade ready to use!${NOCOLOR}\n"
}
