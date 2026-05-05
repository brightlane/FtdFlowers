#!/bin/bash
# deploy-ftd.sh

echo "Copying FTD 5K pages into FtdFlowers..."
cp -r output/ftd-pages/* FtdFlowers/

cd FtdFlowers
echo "Adding / committing / pushing to GitHub..."
git add .
git commit -m "Add 3M+ FTD 5K‑style pages"
git push origin main

echo "Done."
