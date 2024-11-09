#!/bin/bash
echo "Updating package list..."
apt-get update
echo "Installing OpenSCAD..."
apt-get install -y openscad
echo "Checking OpenSCAD version..."
openscad --version
echo "Installing Python dependencies..."
pip install -r requirements.txt
