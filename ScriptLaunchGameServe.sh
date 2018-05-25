#!/bin/bash

sudo apt-get
sudo apt-get install nodejs npm
sudo apt install nodejs-legacy

cd server
npm install 
node server.js