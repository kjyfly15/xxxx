#!/bin/bash

# System check for macOS

echo ""
echo "====== System Check ======"
echo ""

# Check Node.js
echo "[1] Node.js:"
if command -v node &> /dev/null; then
    node --version
    echo "    OK"
else
    echo "    NOT INSTALLED - Please install from https://nodejs.org/"
fi
echo ""

# Check npm
echo "[2] npm:"
if command -v npm &> /dev/null; then
    npm --version
    echo "    OK"
else
    echo "    NOT INSTALLED"
fi
echo ""

# Check git
echo "[3] Git:"
if command -v git &> /dev/null; then
    git --version
    echo "    OK"
else
    echo "    NOT INSTALLED (optional)"
fi
echo ""

# Check disk space
echo "[4] Current folder:"
echo "    $(pwd)"
echo ""

# Check if node_modules exists
echo "[5] node_modules:"
if [ -d node_modules ]; then
    echo "    EXISTS"
else
    echo "    NOT FOUND - Run 'npm install' first"
fi
echo ""

# Check if package.json exists
echo "[6] package.json:"
if [ -f package.json ]; then
    echo "    EXISTS"
else
    echo "    NOT FOUND - Make sure you're in the right folder"
fi
echo ""

# Check Xcode
echo "[7] Xcode Command Line Tools:"
if xcode-select -p &> /dev/null; then
    echo "    $(xcode-select -p)"
    echo "    OK"
else
    echo "    NOT FOUND (required for Mac builds)"
    echo "    Install with: xcode-select --install"
fi
echo ""

echo "============================="
echo "If anything shows NOT INSTALLED, you need to install it first."
echo ""
