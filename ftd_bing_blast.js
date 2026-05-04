const fs = require("fs");
const https = require("https");
const crypto = require("crypto");

// ─────────────────────────────────────────────
// 1. CONFIG
// ─────────────────────────────────────────────
// REPAIR: Updated AffiliateID to match your previous hub (2013017799) 
// and ensured the parameter name is 'AffiliateID' per FloristOne spec.
const AFF_BASE = "https://www.floristone.com/main.cfm?source_id=aff&AffiliateID=2013017799";
const BASE_URL = "https://brightlane.github.io/FtdFlowers";
const TODAY = new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();
const seed = parseInt(crypto.createHash("md5").update(TODAY).digest("hex").slice(0, 8), 16);
const INDEXNOW_KEY = "3dd8ef03a39841008c6f5fe0c38144d5";

// ─────────────────────────────────────────────
// 2. CITIES (Truncated for brevity, keep your full list)
// ─────────────────────────────────────────────
const ALL_CITIES = [
  "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia",
  "Toronto","Montreal","Vancouver","Calgary" // ... keep your 1500+ list here
];
const UNIQUE_CITIES = [...new Set(ALL_CITIES)];

// ─────────────────────────────────────────────
// 3. OCCASIONS
// ─────────────────────────────────────────────
const OCCASIONS = [
  { en:"Sympathy Flowers",    fr:"Fleurs de sympathie",    zh:"慰问花卉",      es:"Flores de condolencia", ru:"Цветы соболезнования", slug:"sympathy",    tag:"sy" },
  { en:"Funeral Flowers",     fr:"Fleurs funéraires",      zh:"葬礼花卉",      es:"Flores fúnebres",       ru:"Траурные цветы",        slug:"funeral",     tag:"fu" },
  { en:"Birthday Flowers",    fr:"Fleurs d'anniversaire", zh:"生日花卉",      es:"Flores de cumpleaños",  ru:"Цветы на день рождения",slug:"birthday",    tag:"bd" },
  { en:"Anniversary Flowers", fr:"Fleurs d'anniversaire de mariage", zh:"周年纪念花卉", es:"Flores de aniversario", ru:"Цветы на годовщину", slug:"anniversary", tag:"an" },
  { en:"Get Well Flowers",    fr:"Fleurs de rétablissement", zh:"祝愿康复花卉", es:"Flores de recuperación", ru:"Цветы пожелания здоровья", slug:"get-well", tag:"gw" },
  { en:"Mother's Day Flowers",fr:"Fleurs fête des mères", zh:"母亲节花卉",   es:"Flores día de la madre", ru:"Цветы на День матери",  slug:"mothers-day", tag:"md" },
  { en:"Romance Flowers",     fr:"Fleurs romantiques",     zh:"浪漫花卉",      es:"Flores románticas",     ru:"Романтические цветы",   slug:"romance",     tag:"ro" },
  { en:"Thank You Flowers",   fr:"Fleurs de remerciement",zh:"感谢花卉",      es:"Flores de agradecimiento", ru:"Цветы благодарности", slug:"thank-you",  tag:"ty" },
];

// ─────────────────────────────────────────────
// 4. MULTILINGUAL CONTENT (Kept your logic, added 2026 to titles)
// ─────────────────────────────────────────────
const LANG_CONTENT = {
  en: { code: "en", dir: "bing", titleFn: (o,c) => `${o.en} in ${c} — 2026 Same Day Delivery`, h1Fn: (o,c) => `${o.en} Delivered Same Day in ${c}`, metaFn: (o,c) => `Send ${o.en.toLowerCase()} in ${c}. Free same-day delivery, $0 service fees, from $29.99.`, introFn: (o,c) => `Need ${o.en.toLowerCase()} in ${c} today?`, h2aFn: (o,c) => `Same-day ${o.en.toLowerCase()} delivery in ${c}`, bodyAFn: (o,c) => `Local florists in ${c} ensure freshness.`, h2bFn: (o,c) => `Free delivery in ${c}`, bodyBFn: (o,c) => `No surprises at checkout.`, ctaFn: (o,c) => `Order ${o.en} in ${c}`, faqQFn: (o,c) => `Same-day ${o.en.toLowerCase()} in ${c}?`, faqAFn: (o,c) => `Yes, guaranteed.`, note: "From $29.99 · Free delivery", backFn: () => "← Back", footer: `© ${YEAR} FTDFlowerGifts` },
  fr: { code: "fr", dir: "bing-fr", titleFn: (o,c) => `${o.fr} à ${c} — Livraison 2026`, h1Fn: (o,c) => `${o.fr} à ${c}`, metaFn: (o,c) => `${o.fr} à ${c}.`, introFn: (o,c) => `Besoin de ${o.fr}?`, h2aFn: (o,c) => `Livraison à ${c}`, bodyAFn: (o,c) => `Fleuristes locaux.`, h2bFn: (o,c) => `Zéro frais.`, bodyBFn: (o,c) => `Prix final.`, ctaFn: (o,c) => `Commander`, faqQFn: (o,c) => `Livraison aujourd'hui?`, faqAFn: (o,c) => `Oui.`, note: "Dès 29,99$", backFn: () => "← Retour", footer: `© ${YEAR}` },
  zh: { code: "zh", dir: "bing-zh", titleFn: (o,c) => `${c}${o.zh}当日配送 — 2026`, h1Fn: (o,c) => `${c}${o.zh}当日送达`, metaFn: (o,c) => `在${c}发送${o.zh}。`, introFn: (o,c) => `需要${o.zh}？`, h2aFn: (o,c) => `当日配送`, bodyAFn: (o,c) => `新鲜花卉。`, h2bFn: (o,c) => `零服务费`, bodyBFn: (o,c) => `价格透明。`, ctaFn: (o,c) => `立即订购`, faqQFn: (o,c) => `当日送达吗？`, faqAFn: (o,c) => `是的。`, note: "低至$29.99", backFn: () => "← 返回", footer: `© ${YEAR}` },
  es: { code: "es", dir: "bing-es", titleFn: (o,c) => `${o.es} en ${c} — Entrega 2026`, h1Fn: (o,c) => `${o.es} en ${c}`, metaFn: (o,c) => `Envía ${o.es} en ${c}.`, introFn: (o,c) => `¿Necesitas ${o.es}?`, h2aFn: (o,c) => `Entrega hoy`, bodyAFn: (o,c) => `Floristas locales.`, h2bFn: (o,c) => `Sin cargos.`, bodyBFn: (o,c) => `Precio final.`, ctaFn: (o,c) => `Pedir ahora`, faqQFn: (o,c) => `¿Entrega hoy?`, faqAFn: (o,c) => `Sí.`, note: "Desde $29.99", backFn: () => "← Volver", footer: `© ${YEAR}` },
  ru: { code: "ru", dir: "bing-ru", titleFn: (o,c) => `${o.ru} в ${c} — Доставка 2026`, h1Fn: (o,c) => `${o.ru} в ${c}`, metaFn: (o,c) => `Отправьте ${o.ru} в ${c}.`, introFn: (o,c) => `Нужны ${o.ru}?`, h2aFn: (o,c) => `Доставка сегодня`, bodyAFn: (o,c) => `Свежие цветы.`, h2bFn: (o,c) => `Без сборов.`, bodyBFn: (o,c) => `Финальная цена.`, ctaFn: (o,c) => `Заказать`, faqQFn: (o,c) => `Сегодня?`, faqAFn: (o,c) => `Да.`, note: "От $29.99", backFn: () => "← Назад", footer: `© ${YEAR}` },
};

// ─────────────────────────────────────────────
// 5. HTML TEMPLATE (Fixed LD+JSON closing tag)
// ─────────────────────────────────────────────
function buildPage(lang, occasion, city, affLink, slug) {
  const L = LANG_CONTENT[lang];
  return `<!DOCTYPE html>
<html lang="${L.code}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${L.titleFn(occasion, city)} | FTDFlowerGifts</title>
    <meta name="description" content="${L.metaFn(occasion, city)}">
    <link rel="canonical" href="${BASE_URL}/${L.dir}/${slug}">
    <script type="application/ld+json">
    {
      "@context":"https://schema.org",
      "@graph":[
        {"@type":"Article","headline":"${L.h1Fn(occasion,city)}","datePublished":"${TODAY}","author":{"@type":"Organization","name":"FTDFlowerGifts"}},
        {"@type":"Product","name":"${occasion.en} - ${city}","offers":{"@type":"Offer","price":"29.99","priceCurrency":"USD","url":"${affLink}"}}
      ]
    }
    </script>
    <style>
        :root{--primary:#004b98;--red:#e20613;--bg:#f9f9ff;--border:#e6e6f0;}
        body{font-family:sans-serif;background:var(--bg);padding:20px;line-height:1.6;}
        .article{max-width:700px;margin:auto;background:#fff;padding:40px;border-radius:12px;border:1px solid var(--border);}
        .cta-box{background:linear-gradient(135deg, #004b98, #e20613);color:#fff;padding:30px;border-radius:10px;text-align:center;margin-top:20px;}
        .cta-btn{display:inline-block;background:#fff;color:#004b98;padding:15px 30px;text-decoration:none;font-weight:bold;border-radius:50px;margin-top:10px;}
        footer{text-align:center;margin-top:40px;font-size:0.8rem;color:#777;}
    </style>
</head>
<body>
<div class="article">
    <h1>${L.h1Fn(occasion, city)}</h1>
    <p>${L.introFn(occasion, city)}</p>
    <h2>${L.h2aFn(occasion, city)}</h2>
    <p>${L.bodyAFn(occasion, city)}</p>
    <div class="cta-box">
        <h3>${L.ctaFn(occasion, city)}</h3>
        <p>${L.note}</p>
        <a href="${affLink}" class="cta-btn">Order Now →</a>
    </div>
</div>
<footer>${L.footer}</footer>
</body>
</html>`;
}

// ─────────────────────────────────────────────
// 6. GENERATION ENGINE
// ─────────────────────────────────────────────
const LANGS = Object.keys(LANG_CONTENT);
const PAGES_PER_LANG = 400;
const CITIES_PER_LANG = Math.floor(PAGES_PER_LANG / OCCASIONS.length);

const batchStart = (seed % UNIQUE_CITIES.length);
const cityBatch = [];
for (let i = 0; i < CITIES_PER_LANG; i++) {
  cityBatch.push(UNIQUE_CITIES[(batchStart + i) % UNIQUE_CITIES.length]);
}

const allGeneratedUrls = [];

LANGS.forEach(lang => {
  const L = LANG_CONTENT[lang];
  if (!fs.existsSync(L.dir)) fs.mkdirSync(L.dir, { recursive: true });

  cityBatch.forEach(city => {
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]/g, "-");
    OCCASIONS.forEach(occasion => {
      const slug = `${occasion.slug}-${citySlug}.html`;
      const affLink = `${AFF_BASE}&occ=${occasion.tag}`;
      const html = buildPage(lang, occasion, city, affLink, slug);
      fs.writeFileSync(`${L.dir}/${slug}`, html);
      allGeneratedUrls.push(`${BASE_URL}/${L.dir}/${slug}`);
    });
  });
});

// ─────────────────────────────────────────────
// 7. SITEMAP REPAIR
// ─────────────────────────────────────────────
const newEntries = allGeneratedUrls
  .map(url => `  <url><loc>${url}</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq></url>`)
  .join("\n");

let sm = fs.existsSync("sitemap.xml") 
  ? fs.readFileSync("sitemap.xml", "utf8") 
  : `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;

// REPAIR: Regex logic to clear only current language directories to prevent sitemap corruption
sm = sm.replace(/<url><loc>.*?\/(bing|bing-fr|bing-zh|bing-es|bing-ru)\/.*?<\/loc>.*?<\/url>\n?/gs, "");
sm = sm.replace("</urlset>", `${newEntries}\n</urlset>`);
fs.writeFileSync("sitemap.xml", sm);

// ─────────────────────────────────────────────
// 8. INDEXNOW (Safe-Ping)
// ─────────────────────────────────────────────
const payload = JSON.stringify({
  host: "brightlane.github.io",
  key: INDEXNOW_KEY,
  keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: allGeneratedUrls
});

const req = https.request({
  hostname: "api.indexnow.org",
  path: "/IndexNow",
  method: "POST",
  headers: { "Content-Type": "application/json" }
}, res => {
  console.log(`✅ Success: ${allGeneratedUrls.length} URLs submitted (Status ${res.statusCode})`);
});
req.on("error", e => console.error("❌ IndexNow Error:", e.message));
req.write(payload);
req.end();
