#!/bin/bash
echo "Starting npm server"
pm2 start /home/pi/ctpb/index.js --name CTPBServer
echo "Starting Client & accessing chrome"
cd /home/pi/ctpb/ && npm start & sleep 5 && chromium-browser http://localhost:3666 --start-fullscreen