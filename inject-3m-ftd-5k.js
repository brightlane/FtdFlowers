const fs = require("fs");
const path = require("path");

// 🚨 FIX: WRITE DIRECTLY INTO PUBLIC SITE DIRECTORY
const OUTPUT_DIR = path.join(__dirname, "FtdFlowers");

// Sitemap (fix path if needed)
const SITEMAP_PATH = path.join(__dirname, "sitemap.xml");

// KEEP AFFILIATE ID SAFE
const AFFILIATE_URL =
  "https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate page HTML
function generateFtdPageHtml(slug) {
  const city = slug || "new-york";
  const cityWords = city.replace(/-/g, " ");

  return `
<!DOCTYPE html>
<html>
<head>
  <title>FTD Flowers ${cityWords}</title>
  <meta name="description" content="FTD flower delivery ${cityWords}" />
</head>
<body>

<h1>FTD Flower Delivery ${cityWords}</h1>

<p>Order fresh flowers online in ${cityWords}.</p>

<a href="${AFFILIATE_URL}">
  Order Flowers Now
</a>

</body>
</html>
  `;
}

// MAIN GENERATOR
function run() {
  let urls = [];

  try {
    const sitemapRaw = fs.readFileSync(SITEMAP_PATH, "utf8");

    urls = sitemapRaw
      .split("\n")
      .filter(Boolean)
      .map(line =>
        line
          .replace("https://brightlane.github.io/FtdFlowers/", "")
          .replace(".html", "")
          .trim()
      );
  } catch (e) {
    console.log("⚠️ sitemap not found, using fallback cities");
    urls = ["new-york", "los-angeles", "toronto", "chicago"];
  }

  console.log(`🚀 Generating ${urls.length} pages...`);

  let count = 0;

  for (const slug of urls) {
    const html = generateFtdPageHtml(slug);
    const filePath = path.join(OUTPUT_DIR, `${slug}.html`);

    fs.writeFileSync(filePath, html);
    count++;
  }

  console.log(`✅ Created ${count} pages in FtdFlowers/`);

  console.log(`
NEXT STEP REQUIRED:
-------------------
Run GitHub commit:

git add FtdFlowers sitemap.xml
git commit -m "generated pages"
git push
`);
}

run();
