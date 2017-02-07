#!/bin/bash
echo "Starting npm server"
pm2 start /home/pi/Desktop/ctpb/index.js --name CTPBServer
echo "Starting Client & accessing chrome"
cd /home/pi/Desktop/ctpb/ && npm start & chromium-browser http://localhost:3002 --start-fullscreen