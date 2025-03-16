#!/usr/bin/env bash

# Check Node-RED status
pm2 show node-red | grep -E 'status|cwd|port'
