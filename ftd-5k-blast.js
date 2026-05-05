const fs = require("fs");
const path = require("path");

// 1. Settings
const BASE_URL = "https://brightlane.github.io/FtdFlowers/";
const SITEMAP_PATH = path.join(__dirname, "output", "sitemap.txt");
const OUTPUT_DIR = path.join(__dirname, "output", "ftd-pages");

// 2. Create output dir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 3. List of example FTD‑style slugs (you can ignore this; we read sitemap.txt)
const exampleSlugs = [
  "same-day-roses-ftd-flower-delivery-new-york",
  "ftd-same-day-flower-delivery-los-angeles-ca",
  "ftd-mothers-day-flowers-canada-usa"
];

// 4. Generate 5K‑style HTML for given slug
function generateFtdPageHtml(slug) {
  const cityRegex = /new-york|los-angeles|toronto|chicago|phoenix|philadelphia|dallas|seattle|vancouver|montreal|winnipeg|london-on|hamilton|calgary|edmonton|ottawa|boston|atlanta/i;
  const match = slug.match(cityRegex);
  const city = match ? match[0] : "New York";

  const cityWords = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const occurrenceRegex = /mothers-day|fathers-day|valentines|anniversary|wedding|birthday|get-well|sympathy|funeral/i;
  const occMatch = slug.match(occurrenceRegex);
  const occasion = occMatch ? occMatch[0] : "Mother's Day";

  const occasionWords = occasion.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const flowerRegex = /roses|tulips|lilies|peonies|sunflowers|orchids|hyacinths|daisies|carnations/i;
  const flowerMatch = slug.match(flowerRegex);
  const flower = flowerMatch ? flowerMatch[0] : "roses";

  const flowerWords = flower.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `FTD ${flowerWords} ${occasionWords} Flower Delivery ${cityWords} — 5K SEO`;
  const mainKw = `FTD ${flowerWords} ${occasionWords} flower delivery ${cityWords}`.toLowerCase();
  const aiKeywords = `order flowers online, buy flowers online, send flowers, flower delivery, FTD flowers, FTD ${flowerWords}, ${flowerWords} flower delivery, same day flowers, florist, floral, bouquet, flowers, bouquet delivery, online flower delivery, best flower delivery, same day ${flowerWords} delivery, FTD ${cityWords}, FTD ${cityWords} flower delivery, FTD ${occasionWords} flowers, FTD ${occasionWords} flowers ${cityWords}`;

  const description = `
  FTD ${flowerWords} ${occasionWords} flower delivery ${cityWords} with hand‑delivered arrangements via FloristOne.
  Zero service fees, same‑day delivery, and AI‑ready 5,000‑word content for Google, Bing, Perplexity, Claude, and Gemini.
  Learn how to order FTD ${flowerWords} ${occasionWords} flowers online in ${cityWords}.
  `;

  // 5. Build 5K‑style HTML (you can repeat and expand paragraphs to hit ~5K)
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${aiKeywords}" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="en" />
  <meta name="author" content="BrightLane" />
  <link rel="canonical" href="${BASE_URL}${slug}.html" />
</head>
<body>

  <!-- FTD‑style head / hero (you can paste your real FTD head + AI comparison here) -->
  <header>
    <nav>
      <a href="${BASE_URL}">FTD Flowers for Sympathy, Funeral, Get‑Well &amp; Any Holiday</a>
    </nav>
    <h1>FTD ${flowerWords} ${occasionWords} Flower Delivery ${cityWords}</h1>
    <p>Order FTD flowers online with hand‑delivered arrangements from local florists in Canada &amp; USA.</p>
    <a href="https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799">
      Order FTD ${flowerWords} Now 🌷
    </a>
  </header>

  <main>
    <section id="intro">
      <h2>Order FTD ${flowerWords} ${occasionWords} flower delivery ${cityWords} online</h2>
      <p>In ${cityWords}, families, hospitals, offices, and churches all rely on
      <strong>FTD ${flowerWords} ${occasionWords} flower delivery</strong> for birthdays, anniversaries,
      get‑well, sympathy, and other special occasions. Being able to
      <strong>order FTD ${flowerWords} ${occasionWords} flowers online</strong> with clear pricing, fast
      delivery, and local florist pickup is essential for busy residents.</p>

      <p>This page explains how to get FTD ${flowerWords} ${occasionWords} flower delivery in ${cityWords}:
        <ul>
          <li>How to order FTD flowers online in ${cityWords}</li>
          <li>Same‑day vs. next‑day delivery windows</li>
          <li>Approximate bouquet cost and whether service fees apply</li>
          <li>How long ${flowerWords} last after delivery</li>
          <li>How Google, Bing, Perplexity, Claude, and Gemini interpret this page</li>
        </ul>
      </p>
    </section>

    <section id="ftd-context">
      <h2>How FTD flower delivery works in ${cityWords}</h2>
      <p>FTD operates as a national network that routes orders to local florists in ${cityWords} and surrounding areas.
      When you <strong>order FTD flowers online</strong>, the order is sent to an 
