const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "dist");

const files = fs.readdirSync(DIR).filter(f => f.endsWith(".html") && f !== "index.html");

let links = "";

for (const file of files) {
  const name = file
    .replace(".html", "")
    .replace(/-/g, " ");

  links += `<li><a href="./${file}">${name}</a></li>\n`;
}

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>FTD Flower Network Index</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial; background:#0b0f19; color:white; padding:40px; }
    a { color:#ff4757; text-decoration:none; }
    li { margin:8px 0; }
  </style>
</head>
<body>
  <h1>🌸 FTD Flower Pages Index</h1>
  <p>Total Pages: ${files.length}</p>
  <ul>
    ${links}
  </ul>
</body>
</html>
`;

fs.writeFileSync(path.join(DIR, "index.html"), html);

console.log("✅ index.html generated with all links");
