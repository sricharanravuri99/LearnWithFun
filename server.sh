#!/bin/bash

PORT=3000
DIR="$(cd "$(dirname "$0")" && pwd)"

case "$1" in
  start)
    if lsof -ti:$PORT > /dev/null 2>&1; then
      echo "Already running → http://localhost:$PORT"
    else
      cd "$DIR" && python3 -m http.server $PORT > /dev/null 2>&1 &
      echo "Started → http://localhost:$PORT"
      open "http://localhost:$PORT"
    fi
    ;;
  stop)
    if lsof -ti:$PORT > /dev/null 2>&1; then
      kill $(lsof -ti:$PORT)
      echo "Stopped."
    else
      echo "Not running."
    fi
    ;;
  status)
    if lsof -ti:$PORT > /dev/null 2>&1; then
      echo "Running → http://localhost:$PORT"
    else
      echo "Not running."
    fi
    ;;
  *)
    echo "Usage: ./server.sh [start|stop|status]"
    ;;
esac
