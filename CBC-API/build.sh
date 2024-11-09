#!/bin/bash
echo "Updating package list..."
apt-get update
echo "Installing libfuse..."
apt-get install -y libfuse2
echo "Making OpenSCAD AppImage executable..."
chmod +x ./bin/openscad.AppImage
echo "Checking OpenSCAD Accessible"
./bin/openscad.AppImage -v
echo "Installing Python dependencies..."
pip install -r requirements.txt
