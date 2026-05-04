const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const DOMAIN = "https://brightlane.github.io/FtdFlowers";

// --- DATABASE: CITIES, REGIONS, AND HYPERLOCAL LANDMARKS ---
const baseCities = [
    "New York|NY|near Central Park", "Los Angeles|CA|near the Hollywood Sign", "Chicago|IL|along the Magnificent Mile", 
    "Houston|TX|near the Museum District", "Toronto|ON|near the CN Tower", "Phoenix|AZ|near Camelback Mountain", 
    "Philadelphia|PA|near Rittenhouse Square", "San Antonio|TX|along the Riverwalk", "San Diego|CA|near Balboa Park", 
    "Dallas|TX|in the Arts District", "Montreal|QC|in Old Montreal", "Austin|TX|near Lady Bird Lake", 
    "Jacksonville|FL|near the St. Johns River", "Fort Worth|TX|near the Stockyards", "Columbus|OH|in the Short North", 
    "Charlotte|NC|near Uptown", "Indianapolis|IN|near Monument Circle", "San Francisco|CA|near the Golden Gate", 
    "Seattle|WA|near the Space Needle", "Denver|CO|near Union Station", "Washington|DC|near the National Mall", 
    "Boston|MA|near Faneuil Hall", "El Paso|TX|near the Franklin Mountains", "Nashville|TN|on Broadway", 
    "Vancouver|BC|near Stanley Park", "Oklahoma City|OK|near Bricktown", "Las Vegas|NV|on the Strip", 
    "Portland|OR|near Washington Park", "Detroit|MI|near Belle Isle", "Louisville|KY|near Churchill Downs", 
    "Memphis|TN|on Beale Street", "Baltimore|MD|at the Inner Harbor", "Milwaukee|WI|near the Lakefront", 
    "Albuquerque|NM|near Old Town", "Tucson|AZ|near Saguaro National Park", "Fresno|CA|near Woodward Park", 
    "Sacramento|CA|in Old Sacramento", "Kansas City|MO|at Country Club Plaza", "Mesa|AZ|near the Arts Center", 
    "Atlanta|GA|near Piedmont Park", "Ottawa|ON|near Parliament Hill", "Calgary|AB|near the Calgary Tower",
    "Edmonton|AB|near West Edmonton Mall", "Winnipeg|MB|at The Forks", "Mississauga|ON|near Celebration Square",
    "Brampton|ON|near Gage Park", "Hamilton|ON|near the Royal Botanical Gardens", "Surrey|BC|near Bear Creek Park",
    "Quebec City|QC|near Château Frontenac", "Laval|QC|near Centropolis", "Halifax|NS|on the Waterfront",
    "London|ON|near Victoria Park", "Victoria|BC|at the Inner Harbour", "Saskatoon|SK|along the South Saskatchewan River"
];

const fullCityList = [];
for (let i = 0; i < 2000; i++) {
    fullCityList.push(baseCities[i % baseCities.length]);
}

const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

function generateProNodes() {
    console.log("🦅 VULTURE 10K PRO: Generating 2,000 Hyperlocal Nodes...");
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const isoDate = new Date().toISOString().split('T')[0];

    let sitemapEntries = [];

    fullCityList.forEach((entry, index) => {
        const [name, region, landmark] = entry.split('|');
        const filename = `flower-delivery-${name.toLowerCase().replace(/\s+/g, '-')}-${region.toLowerCase()}-${index}.html`;
        const slug = `dist/${filename}`;
        
        // 1. Generate HTML Content
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mother's Day Flower Delivery in ${name}, ${region} | Delivering ${landmark}</title>
    <style>
        :root { --primary: #ff4757; --bg: #0a0b10; --card: #11141d; --text: #e0e0e0; }
        body { background: var(--bg); color: var(--text); font-family: sans-serif; line-height: 1.6; text-align: center; margin: 0; }
        .hero { padding: 80px 20px; background: linear-gradient(180deg, var(--card) 0%, var(--bg) 100%); }
        .cta { display: inline-block; background: var(--primary); color: white; padding: 20px 50px; border-radius: 50px; font-weight: 900; text-decoration: none; margin-top: 30px; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Mother's Day Flowers in ${name}, ${region}</h1>
        <p>Premium artisan bouquets hand-delivered <span style="color:var(--primary)">${landmark}</span>.</p>
        <a href="https://www.floristone.com/index.cfm?AffiliateID=2013017799&occ=md" class="cta">ORDER FOR ${name.toUpperCase()}</a>
    </section>
    <footer style="padding:40px; font-size:0.8rem; color:#57606f;">Updated ${today}</footer>
</body>
</html>`;

        fs.writeFileSync(path.join(outputDir, filename), html);

        // 2. Add to Sitemap List
        sitemapEntries.push(`  <url>
    <loc>${DOMAIN}/${slug}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
    });

    // 3. Write Sitemap.xml
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent);
    console.log(`✅ SUCCESS: 2,000 nodes generated and sitemap.xml updated.`);
}

generateProNodes();
