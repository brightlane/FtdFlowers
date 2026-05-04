const fs = require('fs');
const path = require('path');
const cities = require('./cities'); // Importing our 2,000 cities

const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

let sitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

function runVulture() {
    console.log(`🦅 VULTURE 10K: Deploying 2,000 Nodes for Mother's Day...`);

    cities.forEach((entry, i) => {
        const [name, region] = entry.split('|');
        const slug = `flower-delivery-${name.toLowerCase().replace(/\s+/g, '-')}-${region.toLowerCase()}`;
        
        // Anti-Duplicate Content Engine
        const openers = ["Freshly cut", "Hand-arranged", "Artisan", "Beautifully prepared"];
        const closers = ["delivered by local florists", "available for same-day arrival", "ready for Sunday morning", "straight to her doorstep"];
        const pitch = `${openers[i % 4]} Mother's Day bouquets ${closers[i % 4]} in ${name}.`;

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mother's Day Flowers ${name}, ${region} | Same Day Delivery May 10</title>
    <style>
        body { background: #0b0f19; color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; }
        .hero { padding: 100px 20px; }
        .btn { background: #ff4757; color: #fff; padding: 25px 60px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 1.4rem; box-shadow: 0 10px 20px rgba(255, 71, 87, 0.3); }
        .footer { margin-top: 100px; color: #4b5563; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>💐 ${name} Mother's Day Delivery</h1>
        <p style="font-size: 1.2rem; margin-bottom: 40px;">${pitch}</p>
        <a href="https://www.floristone.com/index.cfm?AffiliateID=2013017799&occ=md" class="btn">Order Flowers for ${name}</a>
    </div>
    <div class="footer">
        Radical Transparency: We partner with local ${region} florists. No middle-man box shipping.
    </div>
</body>
</html>`;

        fs.writeFileSync(path.join(outputDir, `${slug}.html`), html);
        sitemap += `<url><loc>https://yourdomain.com/${slug}.html</loc><lastmod>2026-05-04</lastmod></url>`;
    });

    sitemap += '</urlset>';
    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);
    console.log("✅ 2,000 files generated in /dist. Ready for push.");
}

runVulture();
