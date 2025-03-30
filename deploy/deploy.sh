#!/bin/bash

# Deploys the current version of the project to the prodction

SYNC_DIR="$1"
SERVER_USER="$2"

PATH=$PATH:/home/$SERVER_USER/.bun/bin/

if [ -z "$SYNC_DIR" ]; then
    echo "Sync directory not found passed as argument"
    exit 1
fi

# Checking the directory existence in server
if [ ! -d "$SYNC_DIR" ]; then
    echo "Sync directory not found on server"
    exit 1
fi

# Finally copying the env file to the production dir

cp $SYNC_DIR/.env $SYNC_DIR/production/.env

# Changing to the deployment directory
cd $SYNC_DIR/production

#  Checking for previously running pm2 instances
if [[ -z $(pm2 ls | grep "applicat") ]]; then
    echo "Applicat is not running starting it"
    pm2 start "bun run start" --name "applicat" -i 1
    exit 1
else
    echo "Applicat is Already running restarting"
    pm2 restart "applicat"
fi
