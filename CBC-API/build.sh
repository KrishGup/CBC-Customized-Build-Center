#!/bin/bash
echo "Updating package list..."
sudo apt-get update
echo "Making OpenSCAD AppImage executable..."
chmod +x ./bin/openscad.AppImage
echo "Installing Python dependencies..."
pip install -r requirements.txt
