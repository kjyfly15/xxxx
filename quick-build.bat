@echo off
npm install && npm run build && npx electron-builder -w --config.win.target=portable
pause
