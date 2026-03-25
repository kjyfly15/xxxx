#!/bin/bash

# Debug mode - Show all commands and output

echo ""
echo "========== DEBUG MODE =========="
echo "All commands and results will be shown"
echo "==================================="
echo ""

# Check Node.js
echo "[CHECK] Node.js installation..."
node --version
npm --version
echo ""

# Check project folder
echo "[CHECK] Project folder structure..."
ls -la | head -20
echo ""

# Install dependencies
echo "[STEP 1] Installing dependencies..."
echo "Running: npm install"
npm install
echo "Return code: $?"
echo ""

# Build
echo "[STEP 2] Building React app..."
echo "Running: npm run build"
npm run build
echo "Return code: $?"
echo ""

# Create macOS installer
echo "[STEP 3] Creating macOS installer..."
echo "Running: npx electron-builder -m"
npx electron-builder -m
echo "Return code: $?"
echo ""

# Check results
echo "[CHECK] Results..."
if [ -d dist ]; then
    echo "dist/ folder contents:"
    ls -lh dist/
else
    echo "ERROR: dist/ folder not created!"
fi

echo ""
echo "[COMPLETE]"
