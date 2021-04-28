#!/bin/bash

app_name="me"
yarn install
yarn build
pm2 stop $app_name
pm2 delete $app_name
pm2 start "NODE_ENV=production node serve.js" --name $app_name
