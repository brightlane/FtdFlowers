const fs = require("fs");
const path = require("path");

const ROOT_DIR = __dirname;
const MAX_LINKS_PER_PAGE = 25;

// get all html files in root
function getHtmlFiles() {
  return fs
    .readdirSync(ROOT_DIR)
    .filter((file) => file.endsWith(".html"));
}

// create internal links block
function buildLinks(currentFile, allFiles) {
  const otherFiles = allFiles.filter((f) => f !== currentFile);

  const shuffled = otherFiles.sort(() => 0.5 - Math.random());

  const selected = shuffled.slice(0, MAX_LINKS_PER_PAGE);

  let links = "<section><h2>Explore More Flower Options</h2><ul>";

  selected.forEach((file) => {
    const name = file
      .replace(".html", "")
      .replace(/-/g, " ");

    links += `<li><a href="/${file}">${name}</a></li>`;
  });

  links += "</ul></section>";

  return links;
}

// inject links into page
function injectLinks(filePath, linksHtml) {
  let content = fs.readFileSync(filePath, "utf8");

  // remove old block if exists
  content = content.replace(
    /<section><h2>Explore More Flower Options<\/h2>[\s\S]*?<\/section>/,
    ""
  );

  // insert before footer
  content = content.replace("</body>", `${linksHtml}\n</body>`);

  fs.writeFileSync(filePath, content);
}

// main
function run() {
  const files = getHtmlFiles();

  console.log(`🔗 Linking ${files.length} pages`);

  files.forEach((file) => {
    const fullPath = path.join(ROOT_DIR, file);
    const links = buildLinks(file, files);

    injectLinks(fullPath, links);
  });

  console.log("✅ Internal linking complete");
}

run();
