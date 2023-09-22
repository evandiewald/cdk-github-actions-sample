#!/usr/bin/env bash

# build.sh
# This script is used to build runtime code in Python.
# Usage example:
# chmod +x build.sh && build.sh synth

python3 -m pip install -r runtime/requirements.txt -t runtime/python # Install python libraries in a layer folder
cd runtime
zip -r layer.zip python  # Zip the layer folder

# Move utils to each lambda function locally.
rm -rf layer_utils tests/layer_utils
mkdir layer_utils
mkdir tests/layer_utils/
cp -r shared/python/runtime/layer_utils/* layer_utils/
cp -r shared/python/runtime/layer_utils/* tests/layer_utils/
