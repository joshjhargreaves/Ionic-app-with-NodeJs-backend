#!/bin/bash

echo "Deploying develop branch at $(date)" >> ~/home/dev/deployment_log.txt

git pull

npm install

bower install

forever restartall