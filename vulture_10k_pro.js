const fs = require("fs");
const path = require("path");

const DOMAIN = "https://brightlane.github.io/FtdFlowers";

// =========================
// NETWORK (UNCHANGED)
// =========================
const networkSites = [
  { name: "Mother's Day Flowers", url: "https://brightlane.github.io/MothersDayFlowers/" },
  { name: "Bouquet Flowers", url: "https://brightlane.github.io/BouquetFlowers/" },
  { name: "Valentine's Day Flowers", url: "https://brightlane.github.io/ValentinesDayFlowers/" },
  { name: "Send Flowers Online", url: "https://brightlane.github.io/SendFlowersOnline/" },
  { name: "Easter Flower Gifts", url: "https://brightlane.github.io/EasterFlowerGifts/" },
  { name: "Same Day Flowers", url: "https://brightlane.github.io/SameDayFlowers/" },
  { name: "Christmas Flowers", url: "https://brightlane.github.io/ChristmasFlowers/" },
  { name: "Flower Delivery", url: "https://brightlane.github.io/FlowerDelivery/" },
  { name: "Same Day Florist", url: "https://brightlane.github.io/SameDayFlorist/" }
];

// =========================
// CLEAN CITY LIST (NO DUPES)
// =========================
const baseCities = [
  "New York|NY|Central Park",
  "Los Angeles|CA|Hollywood Sign",
  "Chicago|IL|Magnificent Mile",
  "Toronto|ON|CN Tower",
  "Vancouver|BC|Stanley Park",
  "Montreal|QC|Old Montreal",
  "Calgary|AB|Calgary Tower",
  "Edmonton|AB|West Edmonton Mall",
  "Seattle|WA|Space Needle",
  "Boston|MA|Faneuil Hall"
];

const fullCityList = baseCities; // FIX: stop fake duplication

// =========================
// OUTPUT
// =========================
const outputDir = path.join(__dirname, "dist");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const today = new Date().toISOString().split("T")[0];

// FIXED affiliate URL
const AFFILIATE_URL =
  "https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799";

// =========================
// GENERATOR
// =========================
function generate() {
  console.log("🚀 Generating clean linked network...");

  let sitemap = [];

  const networkHtml = networkSites
    .map(s => `<a href="${s.url}" style="color:#ff4757;margin:5px;">${s.name}</a>`)
    .join(" | ");

  fullCityList.forEach((entry, i) => {
    const [city, region, landmark] = entry;

    const slug = city.toLowerCase().replace(/\s+/g, "-");
    const file = `flower-${slug}-${i}.html`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Flower Delivery in ${city}</title>
</head>
<body>

<h1>${city} Flower Delivery</h1>
<p>Fresh flowers near ${landmark}</p>

<a href="${AFFILIATE_URL}">
  Order Flowers in ${city}
</a>

<div>
  ${networkHtml}
</div>

</body>
</html>
    `;

    fs.writeFileSync(path.join(outputDir, file), html);

    // FIXED sitemap (NO /dist PATH)
    sitemap.push(`
  <url>
    <loc>${DOMAIN}/dist/${file}</loc>
    <lastmod>${today}</lastmod>
  </url>`);
  });

  const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "sitemap.xml"), xml);

  console.log("✅ FIXED: pages + sitemap generated correctly");
}

generate();
