#!/usr/bin/env bash

set -euo pipefail

#npx json-server --port 3001 --watch db.json
gnome-terminal --tab --active --title="db" -- bash -lc "cd $(pwd); npm run server"
gnome-terminal --tab --active --title="server" -- bash -lc "cd $(pwd); npm start"
