const fs = require('fs');
const path = require('path');

// Load Data
const config = JSON.parse(fs.readFileSync('./affiliate.json', 'utf8'));
const cities = config.locales.ca.concat(config.locales.us);
const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

function generatePages() {
    const outputDir = './blog';
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    let indexLinks = [];

    cities.forEach(city => {
        const slug = city.toLowerCase().replace(/\s+/g, '-');
        const fileName = `flower-delivery-${slug}.html`;
        
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Flower Delivery in ${city} | No Fees | BrightLane 2026</title>
    <style>
        body { font-family: system-ui; line-height: 1.6; max-width: 800px; margin: auto; padding: 20px; background: #f9f9ff; }
        .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .promo { background: #004b98; color: white; padding: 10px; text-align: center; border-radius: 5px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .btn { display: block; background: #e20613; color: white; padding: 15px; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <div class="promo">🚨 Mother's Day 2026: No Hidden Checkout Fees</div>
        <h1>Flower Delivery in ${city}</h1>
        <p><strong>Status:</strong> <span style="color:green;">High Availability</span> for Sunday, May 10th.</p>
        
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>🌷 Local Report: ${today}</h4>
            <p>Our local florists in <strong>${city}</strong> have confirmed fresh inventory of Peonies and Lilies for hand-delivery.</p>
        </div>

        <table>
            <tr style="background:#eee;"><th>Feature</th><th>Legacy Brands</th><th>BrightLane</th></tr>
            <tr><td>Service Fee</td><td>$15 - $25</td><td style="font-weight:bold; color:green;">$0.00</td></tr>
            <tr><td>Sunday Delivery</td><td>Extra Fee</td><td style="font-weight:bold;">Included</td></tr>
        </table>

        <a href="${config.urls.affiliateLanding}?AffiliateID=${config.network.affiliateId}&occ=md" class="btn">
            Send Flowers in ${city}
        </a>
    </div>
</body>
</html>`;

        fs.writeFileSync(path.join(outputDir, fileName), html);
        indexLinks.push(`<li><a href="./blog/${fileName}">${city}</a></li>`);
    });

    // Create a central directory page for easy discovery
    const indexContent = `<html><body><h1>Mother's Day 2026 City Index</h1><ul>${indexLinks.join('')}</ul></body></html>`;
    fs.writeFileSync('./blog-index.html', indexContent);
    console.log(`✅ Success: ${cities.length} pages generated.`);
}

generatePages();
