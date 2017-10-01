#! /bin/bash

git config user.name 'Travis CI'

git clone https://${GITHUB_CREDENTIALS}@github.com/${TRAVIS_REPO_SLUG}.git pages

cd pages
git checkout gh-pages

cp -r ../docs/build/* .
cp -r ../styleguide/* demo/

git add .
git commit -m "Rebuild pages at $TRAVIS_COMMIT"
git push origin HEAD:gh-pages
