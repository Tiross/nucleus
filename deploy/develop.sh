#! /bin/bash

git config user.name 'Travis CI'

git remote set-url origin https://${GITHUB_CREDENTIALS}@github.com/${TRAVIS_REPO_SLUG}.git
git fetch origin

git add build
git commit -m '[ci skip] Automatic build update'
git push origin HEAD:$TRAVIS_BRANCH
