const fs = require('fs');
const path = require('path');
const cities = require('./cities');

const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ===============================
// LOCAL DATA MAP (SAFE KEYS)
// ===============================
const localHooks = {
  ny: "Central Park inspired arrangements",
  on: "GTA-wide express delivery",
  ca: "West Coast fresh blooms",
  tx: "Texas-sized Mother's Day bouquets",
  default: "Local boutique florist designs"
};

// ===============================
// UTILITIES
// ===============================
function normalizeRegion(region) {
  return region.toLowerCase().trim();
}

function slugify(name, region) {
  return `flower-delivery-${name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')}-${region
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')}`;
}

// ===============================
// MAIN GENERATOR
// ===============================
function generateProNodes() {
  console.log("🦅 VULTURE PRO: Generating 2,000 contextual nodes...");

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  let count = 0;

  for (const entry of cities) {
    const [name, regionRaw] = entry.split('|');

    const region = normalizeRegion(regionRaw);
    const hook = localHooks[region] || localHooks.default;

    const slug = slugify(name, region);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fresh Flower Delivery in ${name}, ${regionRaw}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background:#0f172a; color:#f1f5f9; font-family:Arial; max-width:900px; margin:auto; padding:40px; }
    .card { background:#1e293b; padding:30px; border-radius:12px; }
    .live { color:#22c55e; font-weight:bold; font-size:12px; }
    .cta { display:block; background:#ef4444; color:white; padding:18px; text-align:center; text-decoration:none; margin-top:20px; border-radius:8px; }
  </style>
</head>
<body>

<div class="card">
  <div class="live">● Live: ${today}</div>

  <h1>Mother's Day Flowers in ${name}</h1>

  <p>
    Our ${regionRaw} florist network is preparing <strong>${hook}</strong>
    for delivery across ${name}.
  </p>

  <p>
    Same-day delivery available in most ${name} neighborhoods until early afternoon cutoff.
  </p>

  <a class="cta"
     href="https://www.floristone.com/index.cfm?AffiliateID=2013017799&occ=md">
     VIEW ${name.toUpperCase()} FLOWERS
  </a>

  <p style="font-size:12px;color:#94a3b8;margin-top:20px;">
    Local florists serving ${name}, ${regionRaw}.
  </p>
</div>

</body>
</html>`;

    const filePath = path.join(outputDir, `${slug}.html`);
    fs.writeFileSync(filePath, html);

    count++;

    if (count % 250 === 0) {
      console.log(`✅ Generated ${count} pages...`);
    }
  }

  console.log(`🎉 DONE: ${count} contextual pages generated.`);
}

// RUN
generateProNodes();
