#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

console.log("🚀 Unified SEO Engine Starting...");

// =========================
// DIRECTORIES
// =========================
const ROOT = __dirname;

const DIRS = {
  generators: path.join(ROOT, "seo-engine/generators"),
  registry: path.join(ROOT, "seo-engine/registry"),
  output: path.join(ROOT, "seo-engine/output"),
  hub: path.join(ROOT, "seo-engine/hub")
};

// Ensure folders exist
Object.values(DIRS).forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// =========================
// REGISTRY (SOURCE OF TRUTH)
// =========================
const registryPath = path.join(DIRS.registry, "urls.json");

let registry = {
  generatedAt: new Date().toISOString(),
  urls: [],
  pages: []
};

// =========================
// LOAD GENERATORS
// =========================
// Each generator returns:
// { type, pages: [{slug, html, url, folder}] }

function runGenerators() {
  console.log("⚙️ Running generators...");

  const generators = fs.readdirSync(DIRS.generators)
    .filter(f => f.endsWith(".js"));

  for (const file of generators) {
    const generator = require(path.join(DIRS.generators, file));

    if (typeof generator !== "function") {
      console.log(`⚠️ Skipping ${file} (not a function export)`);
      continue;
    }

    const result = generator();

    if (!result || !result.pages) continue;

    for (const page of result.pages) {
      registry.pages.push(page);
      registry.urls.push(page.url);
    }

    console.log(`✅ Loaded generator: ${file} → ${result.pages.length} pages`);
  }
}

// =========================
// WRITE OUTPUT PAGES
// =========================
function writePages() {
  console.log("📄 Writing pages...");

  for (const page of registry.pages) {
    const folder = path.join(DIRS.output, page.folder || "misc");

    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const filePath = path.join(folder, page.slug + ".html");

    fs.writeFileSync(filePath, page.html);

    console.log(`✔ ${page.slug}.html`);
  }
}

// =========================
// BUILD HUB (FIXES YOUR LINKING ISSUE)
// =========================
function buildHub() {
  console.log("🏠 Building hub...");

  let links = "";

  for (const page of registry.pages) {
    links += `<li><a href="../output/${page.folder}/${page.slug}.html">${page.slug}</a></li>\n`;
  }

  const hubHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>SEO Hub Index</title>
</head>
<body>
  <h1>Unified SEO Hub</h1>
  <ul>
    ${links}
  </ul>
</body>
</html>
  `;

  fs.writeFileSync(
    path.join(DIRS.hub, "index.html"),
    hubHtml
  );
}

// =========================
// SAVE REGISTRY
// =========================
function saveRegistry() {
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
}

// =========================
// MAIN PIPELINE
// =========================
function build() {
  runGenerators();
  writePages();
  buildHub();
  saveRegistry();

  console.log("🎉 BUILD COMPLETE");
  console.log(`📦 Pages: ${registry.pages.length}`);
  console.log(`🔗 URLs: ${registry.urls.length}`);
}

build();
