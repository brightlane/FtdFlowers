const fs = require("fs");
const path = require("path");

const registryPath = path.join(__dirname, "../registry/urls.json");
const outputPath = path.join(__dirname, "index.html");

// Load registry (single source of truth)
const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

function groupByType(pages) {
  const groups = {
    ftd: [],
    cities: [],
    blog: [],
    other: []
  };

  for (const page of pages) {
    if (page.folder === "ftd") groups.ftd.push(page);
    else if (page.folder === "cities") groups.cities.push(page);
    else if (page.folder === "blog") groups.blog.push(page);
    else groups.other.push(page);
  }

  return groups;
}

function buildHub() {
  const groups = groupByType(registry.pages);

  const renderLinks = (arr) =>
    arr.map(p => `<li><a href="../output/${p.folder}/${p.slug}.html">${p.slug}</a></li>`).join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Unified SEO Hub Index</title>
  <meta name="description" content="Central hub for all generated SEO pages: FTD, cities, and blog content.">
  <style>
    body { font-family: Arial; background:#0b0f19; color:#e5e7eb; padding:40px; }
    h1 { color:#ff4757; }
    h2 { margin-top:40px; color:#60a5fa; }
    a { color:#93c5fd; text-decoration:none; }
    a:hover { text-decoration:underline; }
    ul { line-height:1.8; }
    .box { background:#111827; padding:20px; border-radius:10px; margin-bottom:20px; }
  </style>
</head>
<body>

  <h1>🌐 Unified SEO Hub</h1>
  <p>Central index for all generated flower marketing pages.</p>

  <div class="box">
    <h2>💐 FTD Pages</h2>
    <ul>
      ${renderLinks(groups.ftd)}
    </ul>
  </div>

  <div class="box">
    <h2>🏙️ City Pages</h2>
    <ul>
      ${renderLinks(groups.cities)}
    </ul>
  </div>

  <div class="box">
    <h2>📝 Blog Pages</h2>
    <ul>
      ${renderLinks(groups.blog)}
    </ul>
  </div>

  <div class="box">
    <h2>📦 Other Pages</h2>
    <ul>
      ${renderLinks(groups.other)}
    </ul>
  </div>

  <footer style="margin-top:50px; opacity:0.6;">
    Generated: ${new Date().toISOString()}
  </footer>

</body>
</html>
  `;

  fs.writeFileSync(outputPath, html);

  console.log("🏠 Hub built successfully:");
  console.log(`- FTD: ${groups.ftd.length}`);
  console.log(`- Cities: ${groups.cities.length}`);
  console.log(`- Blog: ${groups.blog.length}`);
  console.log(`- Total: ${registry.pages.length}`);
}

buildHub();
