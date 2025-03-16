#!/usr/local/bin/bash
while true; do
  inotifywait -e modify -e create -e delete ~/.node-red/flows/*
  ~/.node-red/merge_flows.sh
done
