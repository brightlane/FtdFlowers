const fs = require('fs');
const path = require('path');

// 🔥 FIX: correct domain
const DOMAIN = "https://brightlane.github.io/FtdFlowers";

// Output folder MUST match GitHub Pages structure
const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// ----------------------
// DATA
// ----------------------
const rawData = "New York|NY,Toronto|ON,Los Angeles|CA,Chicago|IL,Houston|TX,Montreal|QC,Phoenix|AZ,Philadelphia|PA,San Antonio|TX,San Diego|CA,Dallas|TX";

const cities = rawData.split(',');

// ----------------------
// STORAGE
// ----------------------
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

let indexLinks = "";

// ----------------------
// GENERATION
// ----------------------
cities.forEach((entry) => {
    const [name, region] = entry.split('|');

    const slug = `flower-delivery-${name.toLowerCase().replace(/\s+/g, '-')}-${region.toLowerCase()}.html`;

    const url = `${DOMAIN}/${slug}`;

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Flower Delivery in ${name}, ${region}</title>
</head>
<body>
    <h1>Flower Delivery ${name}, ${region}</h1>

    <a href="https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799">
        🌸 Order Flowers in ${name}
    </a>

    <p>Same day delivery available in ${name}, ${region}.</p>
</body>
</html>`;

    fs.writeFileSync(path.join(outputDir, slug), html);

    // sitemap fix
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>2026-05-05</lastmod>
  </url>\n`;

    // index fix (THIS WAS MISSING)
    indexLinks += `<li><a href="${slug}">${name}, ${region}</a></li>\n`;
});

// ----------------------
// CLOSE SITEMAP
// ----------------------
sitemap += `</urlset>`;
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);

// ----------------------
// FIXED INDEX (IMPORTANT)
// ----------------------
const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Flower Delivery Hub</title>
</head>
<body>
  <h1>City Pages Index</h1>
  <ul>
    ${indexLinks}
  </ul>

  <footer>
    <a href="${DOMAIN}">Main Site</a>
  </footer>
</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);

console.log("✅ FIXED: Pages + Index + Sitemap generated in /dist");
