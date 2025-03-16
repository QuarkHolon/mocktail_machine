#!/usr/bin/env bash

# Stop Node-RED
pm2 stop node-red

# Delete Node-RED from PM2 process list
pm2 delete node-red

# Save PM2 process list
pm2 save

echo "Node-RED stopped and removed from PM2."
