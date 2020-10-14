#!/usr/bin/env bash

set -euo pipefail

#cd frontend/phonebook/ && npm run dev
gnome-terminal --tab --active --title="frontend" -- bash -lc "cd $(pwd)/frontend/phonebook; npm start"
gnome-terminal --tab --active --title="server" -- bash -lc "cd $(pwd); npm run dev"
