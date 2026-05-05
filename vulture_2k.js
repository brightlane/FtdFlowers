const fs = require('fs');
const path = require('path');
const cities = require('./cities');

const DOMAIN = "https://brightlane.github.io/FtdFlowers";
const outputDir = path.join(__dirname, 'dist');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ================================
// SAFE SITEMAP BUILDER
// ================================
const sitemapEntries = [];

function slugify(name, region) {
  return `flower-delivery-${name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')}-${region
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')}`;
}

// ================================
// MAIN GENERATOR
// ================================
function runVulture() {
  console.log(`🦅 VULTURE 10K: Generating ${cities.length} pages...`);

  const indexLinks = [];

  cities.forEach((entry, i) => {
    const [name, region] = entry.split('|');
    const slug = slugify(name, region);

    const openers = ["Freshly cut", "Hand-arranged", "Artisan", "Beautifully prepared"];
    const closers = [
      "delivered by local florists",
      "available for same-day arrival",
      "ready for Mother's Day",
      "straight to the doorstep"
    ];

    const pitch = `${openers[i % openers.length]} Mother's Day bouquets ${closers[i % closers.length]} in ${name}.`;

    const url = `${DOMAIN}/dist/${slug}.html`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mother's Day Flowers ${name}, ${region} | Same Day Delivery</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #0b0f19; color: #f0f4f8; font-family: Arial, sans-serif; text-align: center; }
    .hero { padding: 80px 20px; }
    .btn { background: #ff4757; color: white; padding: 20px 50px; border-radius: 40px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 20px; }
    .footer { margin-top: 80px; color: #666; font-size: 0.85rem; }
  </style>
</head>
<body>

  <div class="hero">
    <h1>💐 Mother's Day Flowers in ${name}</h1>
    <p>${pitch}</p>

    <a class="btn" href="https://www.floristone.com/index.cfm?AffiliateID=2013017799&occ=md">
      Order Flowers for ${name}
    </a>
  </div>

  <div class="footer">
    Local florist delivery network serving ${region}. No box shipping.
  </div>

</body>
</html>`;

    const filePath = path.join(outputDir, `${slug}.html`);
    fs.writeFileSync(filePath, html);

    // Sitemap entry (FIXED DOMAIN)
    sitemapEntries.push(
      `<url>
        <loc>${url}</loc>
        <lastmod>2026-05-04</lastmod>
      </url>`
    );

    // Index linking (IMPORTANT FIX)
    indexLinks.push(`<li><a href="./${slug}.html">${name}, ${region}</a></li>`);
  });

  // ================================
  // WRITE SITEMAP
  // ================================
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);

  // ================================
  // WRITE INDEX PAGE (CRITICAL FIX)
  // ================================
  const indexHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Flower Delivery Directory</title>
</head>
<body>
  <h1>All City Flower Pages</h1>
  <ul>
    ${indexLinks.join('\n')}
  </ul>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);

  console.log(`✅ DONE: ${cities.length} pages + sitemap + index generated.`);
}

runVulture();
