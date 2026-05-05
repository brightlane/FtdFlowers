const fs = require('fs');
const path = require('path');

// --------------------
// CONFIG
// --------------------
const BASE_URL = 'https://brightlane.github.io/FtdFlowers/';

const KEYWORDS = [
  'flower-delivery',
  'send-flowers',
  'same-day-flowers',
  'mothers-day-flowers',
  'buy-flowers',
  'order-flowers',
  'florist-near-me',
  'fresh-flower-delivery',
  'flower-bouquets',
  'anniversary-flowers'
];

const CITIES = [
  'new-york',
  'los-angeles',
  'chicago',
  'houston',
  'toronto',
  'miami',
  'vancouver',
  'boston',
  'seattle',
  'phoenix'
];

const FLOWERS = [
  'roses',
  'tulips',
  'lilies',
  'peonies',
  'orchids'
];

// --------------------
// OUTPUT
// --------------------
const OUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// --------------------
// GENERATE URLS
// --------------------
const urls = [];

for (let i = 0; i < CITIES.length; i++) {
  for (let j = 0; j < KEYWORDS.length; j++) {
    for (let k = 0; k < FLOWERS.length; k++) {

      const city = CITIES[i];
      const keyword = KEYWORDS[j];
      const flower = FLOWERS[k];

      const slug = `${keyword}-${flower}-in-${city}`;

      const url = `${BASE_URL}${slug}.html`;

      urls.push(url);
    }
  }
}

// --------------------
// WRITE SITEMAP TXT
// --------------------
fs.writeFileSync(
  path.join(OUT_DIR, 'sitemap.txt'),
  urls.join('\n')
);

// --------------------
// WRITE SIMPLE SITEMAP XML
// --------------------
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml);

// --------------------
// DEBUG OUTPUT
// --------------------
console.log("✅ URLS GENERATED:", urls.length);
console.log("📁 sitemap.txt + sitemap.xml written");
console.log("🌐 sample URL:", urls[0]);
