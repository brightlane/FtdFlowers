// ... (Your previous code above)

// ══════════════════════════════════════════════════════════
//  RELATED POSTS (3 links to other occasions — same city)
// ══════════════════════════════════════════════════════════
const relatedOccs = occasions
  .filter(o => o.slug !== occasion.slug)
  .sort(() => 0.5 - Math.random()) // Shuffle for variety
  .slice(0, 3);

const relatedHTML = relatedOccs.map(ro => {
  // Generates a link to a theoretical sibling page (good for internal linking)
  const roSlug = `blog-${citySlug}-${ro.slug}-${angle.label}-${TODAY}.html`;
  return `<li><a href="${roSlug}">${ro.name} in ${city}</a></li>`;
}).join("");

// ══════════════════════════════════════════════════════════
//  HTML TEMPLATE
// ══════════════════════════════════════════════════════════
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${angle.title(occasion, city)}</title>
    <meta name="description" content="${angle.meta(occasion, city)}">
    <link rel="canonical" href="${canonical}">
    <style>
        :root { --primary: #004b98; --accent: #e20613; --text: #333; --bg: #fdfdfd; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: var(--text); background: var(--bg); margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; border: 1px solid #eee; }
        h1 { color: var(--primary); font-size: 2.2rem; line-height: 1.2; }
        h2 { color: var(--primary); margin-top: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
        .cta-box { background: #f0f7ff; border: 2px dashed var(--primary); padding: 30px; text-align: center; margin: 40px 0; border-radius: 12px; }
        .btn { display: inline-block; background: var(--accent); color: white; padding: 15px 35px; text-decoration: none; font-weight: bold; border-radius: 50px; font-size: 1.2rem; }
        .fact-box { background: #fff9e6; border-left: 5px solid #f39c12; padding: 20px; margin: 20px 0; font-style: italic; }
        footer { margin-top: 50px; font-size: 0.9rem; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
        .related { background: #fafafa; padding: 20px; border-radius: 8px; margin-top: 40px; }
    </style>
</head>
<body>

<div class="container">
    <p><strong>Local Delivery Update:</strong> ${TODAY} in ${city}</p>
    <h1>${angle.h1(occasion, city)} ${occasion.emoji}</h1>
    
    <p>${angle.intro(occasion, city)}</p>

    <div class="cta-box">
        <h3>Order ${occasion.name} for ${city}</h3>
        <p>Guaranteed Same-Day Delivery | $0 Service Fees | From $29.99</p>
        <a href="${affLink}" class="btn">Shop ${occasion.name} Now →</a>
    </div>

    <h2>${angle.h2a(occasion, city)}</h2>
    <p>${angle.bodyA(occasion, city)}</p>

    <div class="fact-box">
        <strong>Did you know?</strong> ${fact}
    </div>

    <h2>${angle.h2b(occasion, city)}</h2>
    <p>${angle.bodyB(occasion, city)}</p>

    <h2>${angle.h2c(occasion, city)}</h2>
    <p>${angle.bodyC(occasion, city)}</p>

    <div class="cta-box" style="background: var(--primary); color: white;">
        <h3 style="color: white;">Need ${occasion.name} Fast?</h3>
        <p>Free Delivery in ${city} is currently available for orders placed by noon.</p>
        <a href="${affLink}" class="btn" style="background: white; color: var(--primary);">Claim Free Delivery</a>
    </div>

    <section class="faq">
        <h2>Frequently Asked Questions</h2>
        <p><strong>Q: ${angle.faqQ(occasion, city)}</strong><br>A: ${angle.faqA(occasion, city)}</p>
        <p><strong>Q: ${angle.faqQ2(occasion, city)}</strong><br>A: ${angle.faqA2(occasion, city)}</p>
    </section>

    <div class="related">
        <h3>Other Flower Delivery in ${city}</h3>
        <ul>${relatedHTML}</ul>
    </div>

    <footer>
        <p>&copy; ${YEAR} ${SITE_NAME}. Hand-arranged by local florists in ${city}.</p>
    </footer>
</div>

</body>
</html>`;

// ══════════════════════════════════════════════════════════
//  EXECUTION
// ══════════════════════════════════════════════════════════
try {
    fs.writeFileSync(filename, html);
    console.log(`✅ Success: Generated ${filename}`);
} catch (err) {
    console.error("❌ Error writing file:", err);
}
