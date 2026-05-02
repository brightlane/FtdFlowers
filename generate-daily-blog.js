const fs = require("fs");
const crypto = require("crypto");

const AFF_BASE = "https://www.floristone.com/main.cfm?source_id=aff&AffiliateID=21885";
const BASE_URL = "https://brightlane.github.io/FtdFlowers";
const TODAY = new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();
const seed = parseInt(crypto.createHash("md5").update(TODAY).digest("hex").slice(0, 8), 16);

const cities = [
  "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia",
  "San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville",
  "Charlotte","San Francisco","Indianapolis","Seattle","Denver","Nashville",
  "Las Vegas","Louisville","Memphis","Portland","Baltimore","Milwaukee",
  "Toronto","Montreal","Vancouver","Calgary","Edmonton","Ottawa",
  "Winnipeg","Quebec City","Hamilton","Kelowna","Miami","Atlanta",
  "Tampa","Raleigh","Minneapolis","New Orleans","Cleveland","Pittsburgh",
  "Sacramento","Salt Lake City","Boston","Detroit","El Paso","Washington DC",
  "Albuquerque","Tucson"
];

const occasions = [
  { name: "Mother's Day Flowers", slug: "mothers-day", tag: "md" },
  { name: "Birthday Flowers",     slug: "birthday",    tag: "bd" },
  { name: "Anniversary Flowers",  slug: "anniversary", tag: "an" },
  { name: "Sympathy Flowers",     slug: "sympathy",    tag: "sy" },
  { name: "Get Well Flowers",     slug: "get-well",    tag: "gw" },
  { name: "Romantic Roses",       slug: "romance",     tag: "ro" },
  { name: "Thank You Flowers",    slug: "thank-you",   tag: "ty" },
  { name: "New Baby Flowers",     slug: "new-baby",    tag: "nb" },
];

const angles = [
  { title:(o,c)=>`Same Day ${o.name} in ${c} — Free Delivery ${YEAR}`, h1:(o,c)=>`Same Day ${o.name} in ${c}`, meta:(o,c)=>`Send ${o.name.toLowerCase()} in ${c} same-day. Free delivery, $0 fees, from $29.99. 4.8 stars from 18,742 customers.`, intro:(o,c)=>`Need ${o.name.toLowerCase()} delivered today in ${c}? Floristone's local florist network guarantees same-day delivery across ${c} — free, with $0 service fees.`, h2a:(o,c)=>`How same-day flower delivery works in ${c}`, bodyA:(o,c)=>`Floristone works with local florists in ${c} — not a central warehouse. Flowers are cut fresh, arranged, and delivered the same day you order. No wilted stems, no hidden fees.`, h2b:(o,c)=>`Free delivery with $0 service fees in ${c}`, bodyB:(o,c)=>`Every order includes free same-day delivery with $0 service fees. The price you see is the final price — no surprises at checkout. Starting from $29.99 all-inclusive.`, faqQ:(o,c)=>`Can I get ${o.name.toLowerCase()} delivered same-day in ${c}?`, faqA:(o,c)=>`Yes. Floristone guarantees same-day delivery across ${c} with free delivery and $0 service fees. Order before the daily cutoff for guaranteed same-day arrival.` },
  { title:(o,c)=>`Best ${o.name} in ${c} — 4.8 Stars Free Delivery`, h1:(o,c)=>`Best ${o.name} in ${c}`, meta:(o,c)=>`Best ${o.name.toLowerCase()} in ${c}. 4.8/5 from 18,742 reviews. Free same-day delivery, $0 fees. Roses, peonies, orchids from $29.99.`, intro:(o,c)=>`Looking for the best ${o.name.toLowerCase()} in ${c}? Floristone delivers farm-fresh flowers same-day with free delivery and zero service fees. 4.8 stars from 18,742 verified customers.`, h2a:(o,c)=>`Why Floristone is top-rated in ${c}`, bodyA:(o,c)=>`4.8/5 stars from 18,742 reviews. Free same-day delivery. $0 service fees. Local florists sourcing flowers fresh daily. 100% freshness guarantee on every order in ${c}.`, h2b:(o,c)=>`Best arrangements for ${o.name} in ${c}`, bodyB:(o,c)=>`Red roses from $49.99. Pink peonies from $29.99. Orchid towers from $129.99 — lasts 4–8 weeks. Wildflower baskets from $39.99. All same-day in ${c} with free delivery.`, faqQ:(o,c)=>`What are the best ${o.name.toLowerCase()} in ${c}?`, faqA:(o,c)=>`Red roses for classic elegance. Pink peonies for modern romance. Orchid towers for luxury. Wildflower baskets for something unique. All same-day in ${c} from $29.99 free delivery.` },
  { title:(o,c)=>`Cheap ${o.name} ${c} — From $29.99 No Hidden Fees`, h1:(o,c)=>`Affordable ${o.name} in ${c}`, meta:(o,c)=>`Cheap ${o.name.toLowerCase()} in ${c} from $29.99. Free same-day delivery, $0 fees. No hidden charges. Farm-fresh flowers today.`, intro:(o,c)=>`Affordable ${o.name.toLowerCase()} in ${c} — from $29.99 with free same-day delivery and $0 service fees. No hidden charges. What you see is what you pay.`, h2a:(o,c)=>`Why Floristone is the best value in ${c}`, bodyA:(o,c)=>`Most services add $12–22 in fees at checkout. Floristone charges $0. The $29.99 starting price includes free same-day delivery in ${c}. No surprises.`, h2b:(o,c)=>`What $29.99 gets you in ${c}`, bodyB:(o,c)=>`A fresh peony bouquet or wildflower basket, arranged by a local florist in ${c}, delivered same-day for free. Farm-fresh quality at an honest price.`, faqQ:(o,c)=>`What is the cheapest ${o.name.toLowerCase()} delivery in ${c}?`, faqA:(o,c)=>`Floristone's pink peony bouquet starts at $29.99 with free same-day delivery in ${c}. $0 service fees. That is the total price — nothing added at checkout.` },
  { title:(o,c)=>`Last Minute ${o.name} ${c} — Still Delivered Today`, h1:(o,c)=>`Last Minute ${o.name} in ${c}`, meta:(o,c)=>`Last minute ${o.name.toLowerCase()} in ${c} — still delivered today. Free same-day delivery, no hidden fees. From $29.99.`, intro:(o,c)=>`It is not too late. Last-minute ${o.name.toLowerCase()} in ${c} are still available for same-day delivery. Order now and fresh flowers arrive today.`, h2a:(o,c)=>`How late can I order in ${c}?`, bodyA:(o,c)=>`Floristone's local florist network in ${c} accepts same-day orders until the daily cutoff. In most areas, afternoon delivery is still available right now.`, h2b:(o,c)=>`Best last-minute arrangements in ${c}`, bodyB:(o,c)=>`Red roses most reliably available last-minute. Pink peonies and wildflower baskets also available. All from $29.99 with free delivery in ${c}.`, faqQ:(o,c)=>`Is same-day flower delivery still available in ${c} right now?`, faqA:(o,c)=>`Check the Floristone site for today's cutoff. In most ${c} areas, same-day delivery is available until mid-afternoon. Free delivery, $0 fees.` },
];

const city     = cities[seed % cities.length];
const occasion = occasions[(seed >> 4) % occasions.length];
const angle    = angles[(seed >> 8) % angles.length];
const citySlug = city.toLowerCase().replace(/ /g, "-");
const affLink  = `${AFF_BASE}&occ=${occasion.tag}`;
const filename = `blog-${citySlug}-${occasion.slug}-${TODAY}.html`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${angle.title(occasion, city)} | FTDFlowerGifts</title>
    <meta name="description" content="${angle.meta(occasion, city)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${BASE_URL}/${filename}">
    <meta property="og:title" content="${angle.title(occasion, city)}">
    <meta property="og:description" content="${angle.meta(occasion, city)}">
    <meta property="og:url" content="${BASE_URL}/${filename}">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {"@type":"Article","headline":"${angle.h1(occasion,city)}","description":"${angle.meta(occasion,city)}","datePublished":"${TODAY}","dateModified":"${TODAY}","author":{"@type":"Organization","name":"FTDFlowerGifts"}},
        {"@type":"Product","name":"Floristone ${occasion.name} — ${city}","offers":{"@type":"Offer","priceCurrency":"USD","price":"29.99","availability":"https://schema.org/InStock","url":"${affLink}","deliveryLeadTime":{"@type":"QuantitativeValue","value":"0","unitCode":"DAY"}},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"18742"}},
        {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"${angle.faqQ(occasion,city)}","acceptedAnswer":{"@type":"Answer","text":"${angle.faqA(occasion,city)}"}}]}
      ]
    }
    <\/script>
    <style>
        :root{--primary:#004b98;--red:#e20613;--bg:#f9f9ff;--border:#e6e6f0;--mid:#666;--gradient:linear-gradient(135deg,#004b98 0%,#e20613 100%);}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:system-ui,sans-serif;background:var(--bg);color:#333;line-height:1.7;}
        .nav{background:#fff;padding:14px 5%;border-bottom:1px solid var(--border);font-weight:700;color:var(--primary);font-size:1.1rem;display:flex;justify-content:space-between;align-items:center;}
        .nav a{font-size:0.85rem;color:var(--primary);}
        .article{max-width:760px;margin:0 auto;padding:50px 24px 80px;}
        .eyebrow{font-size:0.75rem;font-weight:700;color:var(--primary);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;display:block;}
        h1{font-size:clamp(1.8rem,4vw,2.6rem);color:#1a1a1a;margin-bottom:16px;line-height:1.2;}
        .byline{font-size:0.85rem;color:#999;margin-bottom:32px;border-bottom:1px solid var(--border);padding-bottom:16px;}
        h2{font-size:1.35rem;color:#1a1a1a;margin:36px 0 12px;}
        p{margin-bottom:16px;font-size:1rem;color:#444;}
        .cta-box{background:var(--gradient);color:#fff;text-align:center;padding:40px 24px;border-radius:16px;margin:40px 0;}
        .cta-box h2{color:#fff;margin:0 0 10px;font-size:1.5rem;}
        .cta-box p{color:rgba(255,255,255,0.88);margin-bottom:20px;}
        .cta-btn{background:#fff;color:var(--primary);padding:14px 32px;border-radius:99px;font-weight:900;text-decoration:none;display:inline-block;font-size:1rem;}
        .trust-row{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:12px;}
        .trust-row span{font-size:0.75rem;color:rgba(255,255,255,0.8);font-weight:700;}
        .faq-box{background:#fff;border:1px solid var(--border);border-radius:12px;padding:24px;margin:32px 0;}
        .faq-box strong{display:block;color:#1a1a1a;margin-bottom:8px;}
        .faq-box p{margin:0;font-size:0.92rem;}
        .back{display:block;text-align:center;margin-top:32px;font-size:0.85rem;color:var(--primary);text-decoration:none;}
        footer{background:#111;color:#888;text-align:center;padding:24px;font-size:0.78rem;}
    </style>
</head>
<body>
<div class="nav">FTDFlowerGifts <a href="${BASE_URL}/">← All flowers</a></div>
<article class="article">
    <span class="eyebrow">${occasion.name} · ${city} · ${TODAY}</span>
    <h1>${angle.h1(occasion, city)}</h1>
    <p class="byline">FTDFlowerGifts · Same-day delivery in ${city} · ${TODAY}</p>
    <p>${angle.intro(occasion, city)}</p>
    <h2>${angle.h2a(occasion, city)}</h2>
    <p>${angle.bodyA(occasion, city)}</p>
    <h2>${angle.h2b(occasion, city)}</h2>
    <p>${angle.bodyB(occasion, city)}</p>
    <div class="cta-box">
        <h2>Send ${occasion.name} to ${city} Today</h2>
        <p>Same-day delivery · Free · No hidden fees · 4.8 stars from 18,742 customers</p>
        <a href="${affLink}" class="cta-btn">Order Now 🌷</a>
        <div class="trust-row">
            <span>✓ FREE DELIVERY</span><span>✓ $0 FEES</span><span>✓ FRESHNESS GUARANTEED</span>
        </div>
    </div>
    <div class="faq-box">
        <strong>Q: ${angle.faqQ(occasion, city)}</strong>
        <p>${angle.faqA(occasion, city)}</p>
    </div>
    <a href="${BASE_URL}/" class="back">← Browse all FTD flowers</a>
</article>
<footer>This page contains affiliate links. We may earn a commission at no cost to you. © ${YEAR} FTDFlowerGifts</footer>
</body>
</html>`;

fs.writeFileSync(filename, html);

// Update sitemap
const sitemapEntry = `  <url><loc>${BASE_URL}/${filename}</loc><lastmod>${TODAY}</lastmod><changefreq>never</changefreq><priority>0.7</priority></url>`;
if (fs.existsSync("sitemap.xml")) {
    let sm = fs.readFileSync("sitemap.xml", "utf8");
    if (!sm.includes(filename)) {
        sm = sm.replace("</urlset>", `${sitemapEntry}\n</urlset>`);
        fs.writeFileSync("sitemap.xml", sm);
    }
}

console.log(`Generated: ${filename}`);
console.log(`City: ${city} | Occasion: ${occasion.name} | Angle: ${angle.title(occasion,city).slice(0,40)}...`);
console.log(`Affiliate ID: 21885 ✓`);
