const { execSync } = require("child_process");

const INTERVAL_SECONDS = 60; // change to 1 if you want (but be realistic)
const LOOP_NAME = "REALTIME_PUBLISHER";

function run(cmd) {
  try {
    console.log(`\n▶ Running: ${cmd}`);
    execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    console.log(`⚠️ Failed: ${cmd}`);
  }
}

function cycle() {
  console.log(`\n🔥 ${LOOP_NAME} RUN @ ${new Date().toISOString()}`);

  // -------------------------
  // RUN YOUR EXISTING SYSTEM
  // -------------------------
  run("node generate-daily-blog.js");
  run("node seo-engine/index.js");
  run("node backlink_injector.js");
  run("node sitemap-gen.js");
  run("node index-blast.js");

  // -------------------------
  // CRITICAL: FINAL OVERRIDE
  // -------------------------
  run("node publish.js");

  // -------------------------
  // COMMIT + PUSH
  // -------------------------
  run("git add .");

  run(
    `git commit -m "🔥 realtime publish ${new Date().toISOString()}" || echo no changes`
  );

  run("git push origin main");

  console.log(`✅ Cycle complete\n`);
}

// -------------------------
// INFINITE LOOP
// -------------------------
function start() {
  cycle();
  setInterval(cycle, INTERVAL_SECONDS * 1000);
}

start();
