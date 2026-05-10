#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

console.log("🚀 SAFE 1M FLOWER ENGINE STARTING...");

// Ensure output folder exists
const OUT = path.join(__dirname, "output");
if (!fs.existsSync(OUT)) {
  fs.mkdirSync(OUT, { recursive: true });
}

// =========================
// AFFILIATE CONFIG
// =========================
const AFFILIATE_ID = "2013017799";
const SOURCE_ID = "aff";

// Attach affiliate tracking safely
function aff(url) {
  if (!url) return "";

  if (url.includes("AffiliateID=")) return url;

  const sep = url.includes("?") ? "&" : "?";

  return `${url}${sep}AffiliateID=${AFFILIATE_ID}&source_id=${SOURCE_ID}`;
}

// DATA
const CITIES = ["new-york","los-angeles","chicago","toronto","vancouver"];
const FLOWERS = ["roses","tulips","lilies","orchids","daisies"];
const ADJECTIVES = ["luxury","premium","same-day","express","elite"];
const LANGS = ["en","fr","es"];

// STREAM WRITER
const sitemapPath = path.join(OUT, "sitemap.txt");
const stream = fs.createWriteStream(sitemapPath, { flags: "w" });

let count = 0;

for (const lang of LANGS) {
  for (const adj of ADJECTIVES) {
    for (const flower of FLOWERS) {
      for (const city of CITIES) {

        // ORIGINAL PAGE URL
        const baseUrl =
          `https://brightlane.github.io/MothersDayFlowers/${lang}-${adj}-${flower}-in-${city}.html`;

        // AFFILIATE-ENABLED URL
        const url = aff(baseUrl);

        stream.write(url + "\n");
        count++;

        if (count % 100000 === 0) {
          console.log(`✅ Generated ${count} URLs`);
        }
      }
    }
  }
}

stream.end();

console.log(`\n🎉 DONE`);
console.log(`Affiliate ID: ${AFFILIATE_ID}`);
console.log(`Total URLs: ${count}`);
console.log(`File: output/sitemap.txt`);
