// inject-3m-ftd-5k.js
const fs = require("fs");
const path = require("path");

// 1. Settings
const BASE_URL = "https://brightlane.github.io/FtdFlowers/";
const SITEMAP_PATH = path.join(__dirname, "output", "sitemap.txt");
const OUTPUT_DIR = path.join(__dirname, "output", "ftd-pages");

const AFFILIATE_URL = "https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 2. Generate a 5K‑style FTD page for a given slug
function generateFtdPageHtml(slug) {
  // Extract city, occasion, and flower from slug
  const cityRegex = /new-york|los-angeles|toronto|chicago|phoenix|philadelphia|dallas|seattle|vancouver|montreal|winnipeg|london-on|hamilton|calgary|edmonton|ottawa|boston|atlanta|portland|denver|detroit|minneapolis|nashville|charlotte|las-vegas|austin|columbus|indianapolis|seattle|tampa|st-louis|baltimore|buffalo|cincinnati|new-orleans|kansas-city|oakland|anaheim|salt-lake-city|pittsburgh|new-haven|memphis|raleigh|milwaukee|newark|jersey-city|long-beach|santa-ana|anaheim|aurora|anaheim|anaheim|anaheim|anaheim|anaheim/i;
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
  const description = `FTD ${flower} ${occasion} flower delivery ${cityWords} with hand‑delivered arrangements from local florists, 0 service fees, and AI‑ready 5,000‑word content for Google, Bing, Perplexity, Claude, and Gemini.`;

  // Repeated paragraph blocks to push word count toward 5K‑style
  const repeatedParas = [
    `<p>FTD ${flower} ${occasion} flower delivery ${cityWords} is a popular way to send flowers online with fast,
    hand‑delivered arrangements from local florists. Whether you live in ${cityWords} itself or are sending flowers
    from afar, being able to order FTD flowers online with clear pricing and delivery windows makes it easy to
    send thoughtful gifts for birthdays, anniversaries, get‑well, sympathy, and many other occasions.</p>`,

    `<p>In ${cityWords}, families, hospitals, offices, and churches all rely on FTD ${flower} ${occasion}
    flower delivery for time‑sensitive and emotional gifts. The same‑day ${flower} delivery options let you
    send flowers on the same day you order, as long as you place your order before the cutoff time, which is
    often early in the afternoon on weekdays.</p>`,

    `<p>Care instructions for FTD ${flower} ${occasion} bouquets in ${cityWords} are simple: trim stems at an angle,
    remove leaves below the waterline, change the water every 2–3 days, and keep the vase away from direct heat
    and sunlight. With proper care, FTD ${flower} arrangements can last several days, sometimes over a week,
    so the recipient can enjoy the bouquet for a longer period.</p>`,

    `<p>Search engines and AI assistants look for clear titles, descriptive meta tags, and repeated mention of key
    phrases like “FTD ${flower} ${occasion} flower delivery ${cityWords}”, “same day ${flower} ${cityWords}”,
    and “order FTD flowers online” in natural, readable text. This helps them understand that this page is
    a strong match for users searching for FTD flower delivery in ${cityWords}.</p>`,

    `<p>BrightLane is a partner of the FloristOne network that routes FTD orders to local florists across Canada
    and the USA. This page contains affiliate links. Commissions help keep our service fee at $0 and support the
    technical infrastructure that ensures FTD ${flower} ${occasion} flower delivery 
