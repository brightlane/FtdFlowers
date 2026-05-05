const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 SEO ENGINE MASTER RUN STARTING...\n");

function runStep(name, cmd) {
  console.log(`\n==============================`);
  console.log(`⚙️ ${name}`);
  console.log(`==============================`);

  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`✅ ${name} COMPLETE`);
  } catch (err) {
    console.error(`❌ ERROR in ${name}`);
    process.exit(1);
  }
}

// =============================
// EXECUTION PIPELINE
// =============================

// 1. Build pages + registry
runStep(
  "BUILD CORE SYSTEM (GENERATORS + REGISTRY + PAGES)",
  "node build.js"
);

// 2. Build hub (internal navigation layer)
runStep(
  "BUILD HUB INDEX",
  "node seo-engine/hub/build-hub.js"
);

// 3. Build sitemap (search engine discovery layer)
runStep(
  "BUILD SITEMAP SYSTEM",
  "node seo-engine/sitemap-builder.js"
);

// 4. Inject internal links (SEO authority graph)
runStep(
  "INTERNAL LINK INJECTION",
  "node seo-engine/link-injector.js"
);

console.log("\n🎉 ALL SYSTEMS COMPLETE");
console.log("🌐 Your SEO network is fully built and linked");
console.log("📈 Ready for indexing and distribution");
