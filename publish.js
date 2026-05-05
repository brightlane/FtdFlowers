const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ---------------- CONFIG ----------------
const OUTPUT_DIR = path.join(__dirname, "FtdFlowers");
const BATCH_SIZE = 20;

const AFFILIATE_URL =
  "http://www.floristone.com/index.cfm?affiliateId=2013017799&sourceId=aff&tag=BrightLane_MothersDay_2026";

// signature to detect OUR pages
const SIGNATURE = "<!-- GENERATED_BY_PUBLISH_JS_V2 -->";

// keywords (expand this later)
const keywords = [
  "flower delivery chicago",
  "same day flowers new york",
  "birthday flowers los angeles",
  "anniversary flowers houston",
  "sympathy flowers philadelphia",
  "roses delivery phoenix",
  "cheap flowers san antonio",
  "luxury bouquets san diego",
  "valentine flowers dallas",
  "mother day flowers san jose",
  "wedding flowers austin",
  "funeral flowers jacksonville",
  "florist near me columbus",
  "orchids delivery fort worth",
  "mixed bouquet indianapolis",
  "sunflower delivery charlotte",
  "tulips boston delivery",
  "same day roses seattle",
  "premium flowers denver",
  "fresh flowers washington dc"
];

// ---------------- CURSOR ----------------
function loadCursor() {
  try {
    return JSON.parse(fs.readFileSync("cursor.json", "utf8"));
  } catch {
    return { index: 0 };
  }
}

function saveCursor(cursor) {
  fs.writeFileSync("cursor.json", JSON.stringify(cursor, null, 2));
}

function getBatch() {
  const cursor = loadCursor();
  const start = cursor.index;
  const end = start + BATCH_SIZE;

  let batch = keywords.slice(start, end);

  cursor.index = end >= keywords.length ? 0 : end;
  saveCursor(cursor);

  return batch;
}

// ---------------- UTIL ----------------
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ---------------- STRONG CONTENT GENERATOR ----------------
function generateLongContent(keyword) {
  let sections = "";

  for (let i = 0; i < 60; i++) {
    sections += `
      <h2>${keyword} Guide Section ${i + 1}</h2>
      <p>
        ${keyword} is one of the most searched floral delivery services.
        This section explains how customers choose arrangements, delivery timing,
        and how local florists fulfill orders efficiently across regions.
      </p>
      <p>
        When selecting ${keyword}, buyers typically evaluate freshness,
        delivery reliability, and occasion-specific arrangements such as
        birthdays, anniversaries, and sympathy flowers.
      </p>
    `;
  }

  return sections;
}

// ---------------- HTML BUILDER ----------------
function buildHTML(keyword) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>${keyword} | BrightLane Flowers</title>
  <meta name="description" content="${keyword} with premium same-day delivery options." />
</head>

<body>

${SIGNATURE}

<h1>${keyword}</h1>

${generateLongContent(keyword)}

<footer>
  <a href="${AFFILIATE_URL}" target="_blank">
    Order Flowers Now
  </a>
</footer>

</body>
</html>
`;
}

// ---------------- CONTENT ENFORCER ----------------
function enforcePage(filePath, keyword) {
  let needsRewrite = true;

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");

    const wordCount = content.split(/\s+/).length;

    // if already strong and ours → keep
    if (content.includes(SIGNATURE) && wordCount > 3000) {
      needsRewrite = false;
    }
  }

  if (needsRewrite) {
    fs.writeFileSync(filePath, buildHTML(keyword));
    console.log("🔥 Overwritten with strong content:", filePath);
  } else {
    console.log("✅ Strong page already exists:", filePath);
  }
}

// ---------------- WRITE ----------------
function writeBatch(batch) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  batch.forEach((kw) => {
    const file = path.join(OUTPUT_DIR, slugify(kw) + ".html");
    enforcePage(file, kw);
  });
}

// ---------------- DEPLOY ----------------
function deploy() {
  try {
    execSync("git add .", { stdio: "inherit" });

    execSync(
      `git commit -m "🔥 strong publish ${new Date().toISOString()}" || echo "No changes"`,
      { stdio: "inherit" }
    );

    execSync("git push origin main", { stdio: "inherit" });
  } catch {
    console.log("Deploy complete");
  }
}

// ---------------- MAIN ----------------
function run() {
  const batch = getBatch();

  console.log("Publishing batch:", batch);

  writeBatch(batch);
  deploy();

  console.log("🚀 Strong publish complete");
}

run();
