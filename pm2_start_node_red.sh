#!/usr/bin/env bash

# Configuration
CONFIG_DIR="$HOME/.node-red"
ENV_FILE="$CONFIG_DIR/nodered.env"
SETTINGS_FILE="$CONFIG_DIR/settings.js"
FLOW_FILE="$CONFIG_DIR/flows.json"
PORT=1880

# Load environment variables
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    echo "ERROR: Environment file $ENV_FILE missing!" >&2
    exit 1
fi

# Navigate to the working directory
cd "$CONFIG_DIR" || {
    echo "ERROR: Cannot access $CONFIG_DIR" >&2
    exit 1
}

# Check if node-red process exists
if pm2 list | grep -q "node-red"; then
  # Stop and delete existing node-red process
  pm2 stop node-red || true
  pm2 delete node-red || true
fi

# Start Node-RED with explicit working directory
pm2 start "/home/hugues/.node_modules/bin/node-red" --name node-red -- \
    --userDir "$CONFIG_DIR" \
    --settings "$SETTINGS_FILE" \
    --flows "$FLOW_FILE" \
    --port "$PORT"

# Save PM2 process list
pm2 save

# Verification
sleep 2
pm2 show node-red | grep -E 'status|cwd|port'
