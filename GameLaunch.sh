#!/bin/bash

sudo apt-get update
sudo apt-get install nodejs npm 
sudo apt install nodejs-legacy
sudo apt-get install git
sudo npm install -g gulp
sudo npm install gulp

git clone https://github.com/Starbeuck/GameServer.git
cd GameServer
git checkout refonte
git pull

npm install
gulp
