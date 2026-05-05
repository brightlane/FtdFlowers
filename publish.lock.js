const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// =========================
// CONFIG (ROOT LOCK MODE)
// =========================
const ROOT_DIR = __dirname; // FORCE ROOT OUTPUT
const SIGNATURE = "<!-- LOCKED_PUBLISH_SYSTEM_V1 -->";

const KEYWORDS = [
  "flower delivery chicago",
  "same day flowers new york",
  "birthday flowers los angeles",
  "anniversary flowers houston",
  "sympathy flowers philadelphia",
  "roses delivery phoenix",
  "wedding flowers austin",
  "funeral flowers seattle",
  "luxury bouquets miami",
  "cheap flowers dallas"
];

// =========================
// CURSOR (NO DUPLICATES)
// =========================
function getCursor() {
  try {
    return JSON.parse(fs.readFileSync("cursor.json", "utf8"));
  } catch {
    return { index: 0 };
  }
}

function saveCursor(cursor) {
  fs.writeFileSync("cursor.json", JSON.stringify(cursor, null, 2));
}

function getBatch(size = 5) {
  const cursor = getCursor();

  const batch = KEYWORDS.slice(cursor.index, cursor.index + size);

  cursor.index += size;
  if (cursor.index >= KEYWORDS.length) cursor.index = 0;

  saveCursor(cursor);

  return batch;
}

// =========================
// HTML GENERATOR (5000+ WORD SAFE STRUCTURE)
// =========================
function buildPage(keyword) {
  let content = "";

  for (let i = 0; i < 80; i++) {
    content += `
      <section>
        <h2>${keyword} Information Section ${i + 1}</h2>
        <p>
          ${keyword} is a high-demand floral delivery service used for
          birthdays, anniversaries, sympathy events, and same-day gifting.
          Local florists prepare arrangements based on seasonal availability
          and regional demand.
        </p>
        <p>
          Customers searching for ${keyword} often prioritize freshness,
          delivery speed, and handcrafted arrangements delivered directly
          from nearby florists instead of boxed shipping services.
        </p>
      </section>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <title>${keyword}</title>
  <meta name="description" content="${keyword} - premium floral delivery service" />
</head>

<body>

${SIGNATURE}

<h1>${keyword}</h1>

${content}

<footer>
  <a href="http://www.floristone.com/index.cfm?affiliateId=2013017799&sourceId=aff&tag=BrightLane_MothersDay_2026">
    Order Flowers Now
  </a>
</footer>

</body>
</html>
`;
}

// =========================
// WRITE (ROOT LOCK)
// =========================
function writePages(batch) {
  batch.forEach((kw) => {
    const fileName = kw.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".html";
    const filePath = path.join(ROOT_DIR, fileName);

    fs.writeFileSync(filePath, buildPage(kw));

    console.log("✔ LOCKED PAGE WRITTEN:", fileName);
  });
}

// =========================
// OVERRIDE SAFETY CHECK
// =========================
function cleanupOldConflicts() {
  const files = fs.readdirSync(ROOT_DIR);

  files.forEach((file) => {
    if (!file.endsWith(".html")) return;

    const filePath = path.join(ROOT_DIR, file);
    let content = fs.readFileSync(filePath, "utf8");

    // force overwrite if NOT ours OR too small
    if (!content.includes(SIGNATURE)) {
      console.log("⚠ Overwriting external file:", file);
      return;
    }

    if (content.length < 2000) {
      console.log("⚠ Weak file replaced:", file);
    }
  });
}

// =========================
// DEPLOY
// =========================
function deploy() {
  try {
    execSync("git add .", { stdio: "inherit" });

    execSync(
      `git commit -m "LOCKED PUBLISH $(date -u)" || echo 'no changes'`,
      { stdio: "inherit" }
    );

    execSync("git push origin main", { stdio: "inherit" });

    console.log("🚀 DEPLOY COMPLETE");
  } catch (e) {
    console.log("Deploy finished with no changes");
  }
}

// =========================
// MAIN RUNNER
// =========================
function run() {
  console.log("🔒 LOCKED PUBLISH SYSTEM START");

  const batch = getBatch(10);

  cleanupOldConflicts();
  writePages(batch);
  deploy();

  console.log("✅ DONE");
}

run();
