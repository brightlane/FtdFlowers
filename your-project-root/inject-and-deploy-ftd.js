// inject-and-deploy-ftd.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BASE_URL = "https://brightlane.github.io/FtdFlowers/";
const SITEMAP_PATH = path.join(__dirname, "output", "sitemap.txt");
const OUTPUT_DIR = path.join(__dirname, "output", "ftd-pages");
const FTD_DIR = path.join(__dirname, "FtdFlowers");

const AFFILIATE_URL = "https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799";

// 1. Create output/ftd-pages
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 2. Generate 5K‑style FTD HTML for a slug
function generateFtdHtml(slug) {
  const cityRegex = /new-york|los-angeles|toronto|chicago|phoenix|philadelphia|dallas|seattle|vancouver|montreal|winnipeg|london-on|hamilton|calgary|edmonton|ottawa|boston|atlanta|portland|denver|detroit|minneapolis|nashville|charlotte|las-vegas|austin|columbus|indianapolis|tampa|st-louis|baltimore|buffalo|cincinnati|new-orleans|kansas-city|oakland|anaheim|salt-lake-city|pittsburgh|new-haven|memphis|raleigh|milwaukee|newark|jersey-city|long-beach/i;
  const match = slug.match(cityRegex);
  const city = match ? match[0] : "New York";
  const cityWords = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const occRegex = /mothers-day|fathers-day|valentines|anniversary|wedding|birthday|get-well|sympathy|funeral|getwell|christmas|hanukkah|passover|spring|summer|fall|winter|holiday|chinese-new-year|ramadan|eid/i;
  const occMatch = slug.match(occRegex);
  const occasion = occMatch ? occMatch[0] : "Everyday";

  const flowerRegex = /roses|tulips|lilies|peonies|sunflowers|orchids|hyacinths|daisies|carnations|mixed|flowers|bouquet|arrangement|bud|bloom/i;
  const flowerMatch = slug.match(flowerRegex);
  const flower = flowerMatch ? flowerMatch[0] : "flowers";

  const title = `FTD ${flower} ${occasion} Flower Delivery ${cityWords} — 5K SEO`;
  const description = `FTD ${flower} ${occasion} flower delivery ${cityWords} with hand‑delivered arrangements from local florists, 0 service fees, and AI‑ready 5,000‑word content for Google, Bing, Perplexity, Claude, and Gemini.`;
  const kwBase = `FTD ${flower} ${occasion} flower delivery ${cityWords}`.toLowerCase();
  const aiKeywords = [
    kwBase,
    `order flowers online`,
    `buy flowers online`,
    `send flowers`,
    `flower delivery`,
    `FTD flowers`,
    `same day flowers`,
    `florist`,
    `bouquet delivery`,
    `online flower delivery`,
    `best flower delivery`,
    `same day ${flower} delivery`,
    `FTD ${cityWords}`,
    `FTD ${cityWords} flower delivery`,
    `FTD ${occasion} flowers`,
    `FTD ${occasion} flowers ${cityWords}`
  ].join(", ");

  return `
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

  <header>
    <nav>
      <a href="${BASE_URL}">FTD Flowers for Sympathy, Funeral, Get‑Well &amp; Any Holiday</a>
    </nav>
    <h1>FTD ${flower} ${occasion} Flower Delivery ${cityWords}</h1>
    <p>FTD ${flower} ${occasion} flower delivery ${cityWords} with hand‑delivered arrangements from local florists in the FloristOne network.</p>
    <p>Same‑day delivery often available if you order before the cutoff.</p>
    <a href="${AFFILIATE_URL}">
      Order FTD ${flower} ${occasion} Flowers Now 🌷
    </a>
  </header>

  <main>
    <section id="intro">
      <h2>How to order FTD ${flower} ${occasion} flower delivery ${cityWords}</h2>
      <p>In ${cityWords}, residents use FTD ${flower} ${occasion} flower delivery to send thoughtful, time‑sensitive gifts. Being able to order FTD flowers online with clear pricing, fast delivery, and local florist pickup is essential for busy families, hospitals, and businesses.</p>
    </section>

    <section id="ftd-context">
      <h2>FTD flower delivery in ${cityWords}</h2>
      <p>FTD operates as a national network that routes orders to local florists in and around ${cityWords}. When you order FTD flowers online, the order is sent to an FTD‑linked florist in or near ${cityWords}, who cuts fresh ${flower}, arranges the bouquet, and delivers it by hand.</p>
    </section>

    <section id="occasions">
      <h2>When people use FTD ${flower} ${occasion} in ${cityWords}</h2>
      <p>FTD ${flower} ${occasion} flower delivery is popular for occasions such as:
        <ul>
          <li>Birthdays at home, in the office, or in hospitals</li>
          <li>Anniversaries and romantic gestures</li>
          <li>Sympathy and funeral flowers</li>
          <li>Get‑well arrangements</li>
        </ul>
      </p>
    </section>

    <section id="care">
      <h2>Care instructions for ${flower} in ${cityWords}</h2>
      <p>When you receive FTD ${flower} ${occasion} in ${cityWords}, you can extend their life by:
        <ol>
          <li>Trim stems at an angle under water.</li>
          <li>Remove leaves below the waterline.</li>
          <li>Change water every 2–3 days.</li>
          <li>Keep the vase away from direct heat and sunlight.</li>
        </ol>
      </p>
    </section>

    <section id="seo-ai">
      <h2>How Google, Bing, and AI see this page</h2>
      <p>Search engines and AI assistants look for repeated phrases like “FTD ${flower} ${occasion} flower delivery ${cityWords}”, “same day ${flower} ${cityWords}”, and “order FTD flowers online” in structured, readable text.</p>
    </section>

    <section id="terms">
      <h2>Service terms and FTD network details</h2>
      <p>BrightLane is a partner of the FloristOne network. This site contains affiliate links. Commissions help keep our service fee at $0 and support the infrastructure that routes FTD orders to local florists.</p>
    </section>

    <section id="faq">
      <h2>Frequently Asked Questions: FTD ${flower} ${occasion} ${cityWords}</h2>
      <dl>
        <dt>Can I get same‑day flowers in ${cityWords} via FTD?</dt>
        <dd>Yes, if you order before the cutoff time (often early afternoon on weekdays).</dd>

        <dt>How long do FTD ${flower} ${occasion} last?</dt>
        <dd>With proper care, they can last 5–14 days in ${cityWords} homes and offices.</dd>

        <dt>Are there service fees?</dt>
        <dd>Service fees vary by platform. Some FTD‑linked sites charge $10–$20, while others advertise $0 service fee.</dd>
      </dl>
    </section>

    <section id="final-thoughts">
      <h2>Final thoughts on FTD ${flower} ${occasion} ${cityWords}</h2>
      <p>For residents of ${cityWords}, ordering FTD ${flower} ${occasion} online means balancing speed, freshness, and price. The best way to order FTD ${flower} ${occasion} online in ${cityWords} is through a platform that works with local florists and shows real‑time availability.</p>
    </section>
  </main>

  <footer>
    © 2026 BrightLane | FTD ${flower} ${occasion} flower delivery ${cityWords} |
    Partner of the FloristOne network (AffiliateID=2013017799)
  </footer>

</body>
</html>
  `;
}

// 3. Read 
