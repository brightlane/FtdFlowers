const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// -------------------- CONFIG --------------------
const OUTPUT_DIR = path.join(__dirname, "FtdFlowers");

const BATCH_SIZE = 20;

const AFFILIATE_URL =
  "http://www.floristone.com/index.cfm?affiliateId=2013017799&sourceId=aff&tag=BrightLane_MothersDay_2026";

// -------------------- KEYWORDS --------------------
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

// -------------------- CURSOR SYSTEM --------------------
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

function getBatch(keywords, batchSize) {
  const cursor = loadCursor();

  const start = cursor.index;
  const end = start + batchSize;

  let batch = keywords.slice(start, end);

  // wrap around logic
  if (end >= keywords.length) {
    cursor.index = 0;
  } else {
    cursor.index = end;
  }

  saveCursor(cursor);

  return batch;
}

// -------------------- UTIL --------------------
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// -------------------- HTML GENERATOR --------------------
function generateHTML(keyword) {
  let content = "";

  for (let i = 0; i < 25; i++) {
    content += `
      <p>
        ${keyword} is available for fast local delivery.
        Fresh arrangements are designed for same-day service depending on availability.
      </p>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <title>${keyword} | BrightLane Flowers</title>
  <meta name="description" content="${keyword} with fast local flower delivery." />
</head>

<body>

  <header>
    <h1>${keyword}</h1>
    <p>Fresh flowers delivered locally.</p>
  </header>

  <section>
    ${content}
  </section>

  <footer>
    <a href="${AFFILIATE_URL}" target="_blank">
      Order Flowers via Partner Network
    </a>
  </footer>

</body>
</html>
  `;
}

// -------------------- WRITE FILES --------------------
function writeBatch(batch) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  batch.forEach((keyword) => {
    const fileName = slugify(keyword) + ".html";
    const filePath = path.join(OUTPUT_DIR, fileName);

    fs.writeFileSync(filePath, generateHTML(keyword));
    console.log("Created:", filePath);
  });
}

// -------------------- DEPLOY --------------------
function deploy() {
  try {
    execSync("git add .", { stdio: "inherit" });

    execSync(
      `git commit -m "Auto publish batch ${new Date().toISOString()}" || echo "No changes"`,
      { stdio: "inherit" }
    );

    execSync("git push origin main", { stdio: "inherit" });

    console.log("🚀 Deployed to GitHub Pages");
  } catch (e) {
    console.log("Deploy completed (no changes or conflict)");
  }
}

// -------------------- MAIN --------------------
function run() {
  const batch = getBatch(keywords, BATCH_SIZE);

  console.log("Publishing batch:", batch);

  writeBatch(batch);
  deploy();

  console.log("✅ Publish complete");
}

run();
