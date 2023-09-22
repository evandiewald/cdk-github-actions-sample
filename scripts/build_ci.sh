#!/usr/bin/env bash

# build_ci.sh
# This script is used to build runtime code in Python.
# Usage example:
# chmod +x build_ci.sh && build_ci.sh synth

python3 -m pip install -r runtime/requirements.txt -t runtime/python # Install python libraries in a layer folder
cd runtime
zip -r layer.zip python  # Zip the layer folder
