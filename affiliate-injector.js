#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// =========================
// AFFILIATE CONFIG (GLOBAL RULE)
// =========================
const AFFILIATE_ID = "2013017799";
const SOURCE_ID = "aff";

// =========================
// ROOT FOLDER (ALL HTML PAGES)
// =========================
const ROOT = path.join(__dirname, "pages"); // change if needed

// =========================
// AFFILIATE FUNCTION
// =========================
function aff(url) {
  if (!url) return "";

  if (url.includes("AffiliateID=")) return url;

  const sep = url.includes("?") ? "&" : "?";

  return `${url}${sep}AffiliateID=${AFFILIATE_ID}&source_id=${SOURCE_ID}`;
}

// =========================
// INJECT INTO HTML
// =========================
function processFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");

  // 1. Inject JS affiliate system if missing
  if (!html.includes("AFFILIATE_ID")) {
    const script = `
<script>
const AFFILIATE_ID = "${AFFILIATE_ID}";
const SOURCE_ID = "${SOURCE_ID}";

function aff(url){
  if(!url) return "";
  if(url.includes("AffiliateID=")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return url + sep + "AffiliateID=" + AFFILIATE_ID + "&source_id=" + SOURCE_ID;
}
</script>
`;

    html = html.replace("</head>", script + "\n</head>");
  }

  // 2. Auto-fix FloristOne links
  html = html.replace(
    /href="https:\/\/www\.floristone\.com[^"]*"/g,
    (match) => {
      const url = match.replace('href="', "").replace('"', "");
      return `href="${aff(url)}"`;
    }
  );

  fs.writeFileSync(filePath, html, "utf8");
  console.log("✔ Updated:", filePath);
}

// =========================
// SCAN ALL HTML FILES
// =========================
function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".html")) {
      processFile(fullPath);
    }
  });
}

// =========================
// RUN
// =========================
console.log("🚀 Injecting affiliate system into ALL HTML pages...");
walk(ROOT);
console.log("✅ DONE — all pages now use AffiliateID:", AFFILIATE_ID);
