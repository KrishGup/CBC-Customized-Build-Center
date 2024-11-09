
#!/bin/bash

# Exit if any command fails
set -e

# Build the project
ng build --configuration production --base-href "https://krishgup.github.io/CBC-Customized-Build-Center/"

# Navigate into the build output directory
cd dist/angular-app

# Initialize a new git repository
git init
git add -A
git commit -m 'deploy'

# Push to the gh-pages branch
git push -f git@github.com:krishgup/CBC-Customized-Build-Center.git master:gh-pages

# Navigate back to the root directory
cd -
