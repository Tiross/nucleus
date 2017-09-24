#! /bin/bash

git add build
git commit -m '[ci skip] Automatic build update'
git push origin HEAD:develop
