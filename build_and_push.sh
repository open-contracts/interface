git submodule update --recursive --remote
yarn run build
git rm -r build/client-protocol
rm -rf .git/modules/build/client-protocol
# cp -r public/client-protocol build/client-protcol
rm -r build/client-protocol/.git
git add .
git commit -m "Building"

# push build to main
# git subtree push --prefix build origin gh-pages
git push origin `git subtree split --prefix build main`:gh-pages --force 