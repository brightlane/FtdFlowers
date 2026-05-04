const fs = require('fs');
const path = require('path');
const cities = require('./cities'); // Your 2,000 city array

const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// A library of "City Facts" or "Landmarks" to mix in
const localHooks = {
    "NY": "Central Park inspired arrangements",
    "ON": "GTA-wide express delivery",
    "CA": "West Coast fresh blooms",
    "TX": "Texas-sized Mother's Day bouquets",
    "default": "Local boutique florist designs"
};

async function generateProNodes() {
    console.log("🦅 VULTURE PRO: Injecting Live Data into 2,000 Nodes...");

    for (let entry of cities) {
        const [name, region] = entry.split('|');
        const slug = `flower-delivery-${name.toLowerCase().replace(/\s+/g, '-')}-${region.toLowerCase()}`;
        
        // Dynamic Content Injection
        const hook = localHooks[region] || localHooks["default"];
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fresh Flower Delivery in ${name}, ${region} | Today: ${today}</title>
    <style>
        body { background: #0f172a; color: #f1f5f9; font-family: sans-serif; max-width: 900px; margin: auto; padding: 40px; }
        .card { background: #1e293b; padding: 30px; border-radius: 15px; border: 1px solid #334155; }
        .live-tag { color: #22c55e; font-weight: bold; text-transform: uppercase; font-size: 0.8rem; }
        .cta { display: block; background: #ef4444; color: white; padding: 20px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="card">
        <span class="live-tag">● Live Update: ${today}</span>
        <h1>Mother's Day Flowers in ${name}, ${region}</h1>
        <p>Looking for the best delivery in <strong>${name}</strong>? Our local ${region} network is currently preparing ${hook} for Sunday arrival.</p>
        
        <div style="background: #0f172a; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p>🚚 <strong>Current Status:</strong> Same-Day Delivery available in ${name} until 1:00 PM local time.</p>
        </div>

        <a href="https://www.floristone.com/index.cfm?AffiliateID=2013017799&occ=md" class="cta">VIEW ${name.toUpperCase()} CATALOG</a>
        
        <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 20px;">
            Serving neighborhoods across ${name} and the greater ${region} area with radical transparency and $0 service fees.
        </p>
    </div>
</body>
</html>`;

        fs.writeFileSync(path.join(outputDir, `${slug}.html`), html);
    }
    console.log("✅ 2,000 High-Context Nodes Generated.");
}

generateProNodes();
