const fs = require("fs");
const path = require("path");

const registryPath = path.join(__dirname, "../registry/urls.json");
const outputDir = path.join(__dirname, "../output");

// Load registry (single source of truth)
const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

const DOMAIN = "https://brightlane.github.io/FtdFlowers";

// Remove duplicates safely
function dedupe(arr) {
  return [...new Set(arr)];
}

// Chunk helper (Google-safe sitemap splitting)
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function buildSitemaps() {
  const urls = dedupe(registry.urls);

  console.log(`🧭 Building sitemap for ${urls.length} URLs...`);

  const chunks = chunkArray(urls, 40000); // safe limit per file

  const sitemapFiles = [];

  chunks.forEach((chunk, index) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk
  .map(url => {
    const fullUrl = url.startsWith("http") ? url : DOMAIN + url;
    return `
  <url>
    <loc>${fullUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

    const fileName = `sitemap-${index + 1}.xml`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, xml);

    sitemapFiles.push(`${DOMAIN}/output/${fileName}`);

    console.log(`✔ Generated ${fileName} (${chunk.length} URLs)`);
  });

  // MASTER sitemap index
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(file => {
    return `
  <sitemap>
    <loc>${file}</loc>
  </sitemap>`;
  })
  .join("\n")}
</sitemapindex>`;

  fs.writeFileSync(
    path.join(outputDir, "sitemap.xml"),
    indexXml
  );

  console.log("🏁 MASTER sitemap.xml created");
  console.log(`📦 Total sitemap files: ${chunks.length}`);
  console.log(`🔗 Total URLs: ${urls.length}`);
}

buildSitemaps();
