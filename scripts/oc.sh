#!/usr/bin/env bash
#
#
# Setup user for Cloudigrade
setupUser()
{
  local CHECK_SUCCESS="{\"email\":\"\",\"username\":\"test\",\"id\":1}"
  local CHECK_EXISTS="{\"username\":[\"A user with that username already exists.\"]}"
  local COLOR=$RED
  local STATUS="ERROR"
  local USER_NAME=$1
  local USER_PASSWORD=$2
  local USER_ENDPOINT=$3

  checkOc 100
  echo "Test user logging in..."

  local RESPONSE=$(curl -d "{\"username\":\"$USER_NAME\", \"password\":\"$USER_PASSWORD\"}" -H "Content-Type: application/json" -X POST $USER_ENDPOINT)

  if [ "$RESPONSE" = "$CHECK_SUCCESS" ] || [ "$RESPONSE" = "$CHECK_EXISTS" ]; then
    COLOR=$GREEN
    STATUS="SUCCESS"
  fi

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

  printf "Check pod running..."

  while [ $COUNT -le $DURATION ]; do
    sleep $DELAY
    (( COUNT++ ))
    if [ ! -z "$(oc get pods | grep -e 'cloudigrade-nginx-1-build' -e 'Completed')" ]; then
      break
    fi
  done

  if [ -z "$(oc get pods | grep -e 'cloudigrade-nginx-1-build' -e 'Completed')" ]; then
    printf "  ${RED}POD ERROR... stopping oc local run\n"
    printf "${NOCOLOR}\n"
    oc cluster down
    exit 1
  fi

  printf "  ${GREEN}POD SUCCESS after ${COUNT} secs... continuing\n"
  printf "${NOCOLOR}\n"
}
#
#
# Basic start for Cloudigrade
startOc()
{
  local REPO_PATH="${HOME}/.frontigrade"
  local REPO_LOCAL="${HOME}/.frontigrade/cloudigrade"
  local REPO="https://github.com/cloudigrade/cloudigrade.git"
  local UPDATE=$1

  if [ -z "$(git version)" ]; then
    printf "\n${RED}Git missing.${NOCOLOR}\n"
    exit 0
  fi

  if [ -z "$(oc version)" ]; then
    printf "\n${RED}Openshift CLI missing.${NOCOLOR}\n"
    exit 0
  fi

  if [ -z "$(docker -v)" ]; then
    printf "\n${RED}Docker Daemon missing.${NOCOLOR}\n"
    exit 0
  fi

  if [ -z "$(checkOc 1 | grep SUCCESS)" ] || [ "$UPDATE" = true ]; then
    oc cluster down

    export AWS_ACCESS_KEY_ID=123
    export AWS_SECRET_ACCESS_KEY=456

    if [ ! -d "$REPO_LOCAL/.git" ]; then
      echo "Cloning Cloudigrade..."
      mkdir -p $REPO_PATH
      cd $REPO_PATH
      git clone $REPO
      cd $REPO_LOCAL
      make oc-clean
      make oc-create-cloudigrade
      make oc-up-all
      echo "sleep 60"
      sleep 60
    else
      echo "Updating Cloudigrade..."
      cd $REPO_LOCAL
      make oc-clean
      git fetch origin master
      git reset --hard origin/master
      make oc-up-all
      echo "sleep 30"
      sleep 30
    fi
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
  ENDPOINT="http://cloudigrade-myproject.127.0.0.1.nip.io/auth/users/create/"
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
  setupUser $USERNAME $PASSWORD $ENDPOINT

  printf "${GREEN}Cloudigrade ready to use!${NOCOLOR}\n"
}
