const fs = require('fs');
const path = require('path');

// 1. Define the missing 'occasions' data (The Fix)
const occasions = [
    { name: "Mother's Day", slug: "mothers-day-delivery-2026", code: "md", emoji: "🌷", headline: "Last-Minute Mother's Day Flowers: $0 Service Fees" },
    { name: "Sympathy", slug: "sympathy-flower-delivery", code: "sy", emoji: "🕊️", headline: "Express Sympathy & Funeral Flowers - Hand Delivered" },
    { name: "Birthday", slug: "birthday-flower-delivery", code: "bd", emoji: "🎂", headline: "Same-Day Birthday Delivery & Surprise Gifts" },
    { name: "Anniversary", slug: "anniversary-roses-delivery", code: "an", emoji: "💍", headline: "Romantic Anniversary Roses - Premium Quality" }
];

// 2. Reference the occasions (Fixes the Line 6 ReferenceError)
const relatedOccs = occasions;

const FTD_CONFIG = {
    baseUrl: 'https://brightlane.github.io/FtdFlowers/',
    affiliateBase: 'http://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799',
    year: 2026
};

// 3. The Generator Logic
function generateBlog() {
    const today = new Date().toISOString().split('T')[0];
    const outputDir = './blog';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    relatedOccs.forEach(occ => {
        const fileName = `${today}-${occ.slug}.html`;
        const filePath = path.join(outputDir, fileName);

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${occ.headline} | BrightLane ${FTD_CONFIG.year}</title>
    <meta name="description" content="Get ${occ.name} flowers delivered same-day. No service fees. Hand-delivered for May 10, 2026.">
    <style>
        body{font-family:system-ui; line-height:1.6; max-width:800px; margin:auto; padding:20px; background:#f9f9ff;}
        .promo-banner{background:#e20613; color:#white; padding:15px; text-align:center; border-radius:8px; font-weight:bold; color:white;}
        .btn{display:inline-block; background:#004b98; color:white; padding:15px 30px; text-decoration:none; border-radius:50px; font-weight:bold; margin-top:20px;}
    </style>
</head>
<body>
    <div class="promo-banner">🚨 2026 UPDATE: All Service Fees Waived - Save $24.99 vs FTD</div>
    
    <h1>${occ.emoji} ${occ.headline}</h1>
    <p>Published: ${today}</p>
    
    <p>Finding reliable ${occ.name} delivery in ${FTD_CONFIG.year} shouldn't come with hidden checkout fees. While legacy brands like FTD and ProFlowers add "service" and "handling" charges at the final step, BrightLane offers <strong>Radical Transparency</strong>.</p>
    
    <h2>Why Choose BrightLane for ${occ.name}?</h2>
    <ul>
        <li><strong>$0 Service Fees:</strong> The price you see is the price you pay.</li>
        <li><strong>Hand-Delivered:</strong> We utilize a network of 10,000+ local florists. No "flowers in a box" via FedEx.</li>
        <li><strong>Same-Day Reliability:</strong> Orders placed before 1:00 PM local time are delivered today.</li>
    </ul>

    <a href="${FTD_CONFIG.affiliateBase}&occ=${occ.code}" class="btn">Order ${occ.name} Flowers Now</a>

    <p style="margin-top:50px; font-size:0.8em; color:#666;">
        Back to <a href="${FTD_CONFIG.baseUrl}">Home</a> | Part of the BrightLane pSEO Network.
    </p>
</body>
</html>`;

        fs.writeFileSync(filePath, htmlContent);
        console.log(`✅ Generated: ${fileName}`);
    });
}

// Run the script
generateBlog();
