const fs = require("fs");
const path = require("path");

const FT_DIR = path.join(__dirname, "FtdFlowers");
const BLOG_DIR = path.join(__dirname, "blog");

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".html"))
    .map(f => ({
      name: f,
      path: dir.includes("FtdFlowers")
        ? `FtdFlowers/${f}`
        : `blog/${f}`
    }));
}

function buildList(title, files) {
  return `
  <section>
    <h2>${title}</h2>
    <ul>
      ${files.map(f => `<li><a href="${f.path}">${f.name}</a></li>`).join("\n")}
    </ul>
  </section>
  `;
}

function run() {
  const ftdFiles = getFiles(FT_DIR);
  const blogFiles = getFiles(BLOG_DIR);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>FTD Flowers Index</title>
  <meta name="description" content="Auto-generated index of flower delivery pages" />
</head>
<body>

<h1>🌸 BrightLane Generated Pages Index</h1>

${buildList("FTD Pages", ftdFiles)}

${buildList("Blog Pages", blogFiles)}

</body>
</html>
  `;

  fs.writeFileSync(path.join(__dirname, "index.html"), html);

  console.log("✅ index.html generated with all links");
}

run();
