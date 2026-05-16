#!/usr/bin/env bash
set -euo pipefail

publish_dir="build/web"

rm -rf "$publish_dir"
mkdir -p "$publish_dir"

cp -R \
  AI_terms \
  about \
  assets \
  connect \
  privacy_policy \
  terms_and_condition \
  index.html \
  legal-page.js \
  robots.txt \
  sitemap.xml \
  styles.css \
  "$publish_dir/"
