#!/usr/bin/env bash

# Configuration
CONFIG_DIR="$HOME/.node-red"
ENV_FILE="$CONFIG_DIR/nodered.env"

# Load environment variables
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    echo "ERROR: Environment file $ENV_FILE missing!" >&2
    exit 1
fi

# Restart Node-RED
pm2 restart node-red

# Save PM2 process list
pm2 save

echo "Node-RED restarted."
