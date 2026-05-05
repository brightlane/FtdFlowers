const fs = require("fs");
const path = require("path");

const registryPath = path.join(__dirname, "../registry/urls.json");
const outputBase = path.join(__dirname, "../output");

// Load registry (single source of truth)
const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Pick a few internal links for each page
function getInternalLinks(currentPage, pages) {
  const others = pages.filter(p => p.slug !== currentPage.slug);
  const sample = shuffle(others).slice(0, 8);

  return sample.map(p => {
    return `<a href="/${p.folder}/${p.slug}.html">${p.slug.replace(/-/g, " ")}</a>`;
  }).join(" | ");
}

function injectLinksIntoHtml(html, linksHtml) {
  const injectionBlock = `
<hr>
<div style="margin-top:40px; font-size:0.9rem;">
  <h3>🌐 Related Flowers & Delivery Pages</h3>
  <p>${linksHtml}</p>
</div>
`;

  // Inject before closing body tag
  return html.replace("</body>", injectionBlock + "\n</body>");
}

function runInjector() {
  console.log("🔗 Injecting internal link network...");

  const pages = registry.pages;

  for (const page of pages) {
    const filePath = path.join(outputBase, page.folder, page.slug + ".html");

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ Missing file: ${filePath}`);
      continue;
    }

    let html = fs.readFileSync(filePath, "utf-8");

    const links = getInternalLinks(page, pages);

    html = injectLinksIntoHtml(html, links);

    fs.writeFileSync(filePath, html);

    console.log(`✔ Linked: ${page.slug}`);
  }

  console.log(`🌐 Internal linking complete for ${pages.length} pages`);
}

runInjector();
