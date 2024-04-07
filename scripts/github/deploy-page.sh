#!/usr/bin/env sh

# 部署到其他仓库page

set -e

mkdir gh-pages-branch
cd gh-pages-branch

git init
githubUrl="https://${OWNER}:${ACCESS_TOKEN}@github.com/${OWNER}/uniapp-vue3-ts-skeleton"
git checkout -b gh-pages

BUNDLE_DIST=dist/build/h5

cp -a ../$BUNDLE_DIST/* .
cp -a ../README.md .

echo ${DOMAIN} > CNAME
git config --global user.email $EMAIL
git config --global user.name $OWNER
git add . -A
git commit -m 'update page'

git push -f $githubUrl -q gh-pages

cd ..
rm -rf gh-pages-branch
echo deploy successfully
