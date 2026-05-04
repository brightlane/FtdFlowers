const fs = require('fs');
const path = require('path');

const CONFIG = {
    baseUrl: 'https://brightlane.github.io/FtdFlowers/', // Update to your actual domain
    outputFile: './sitemap.xml',
    ignoreFiles: ['404.html', 'google-verification.html']
};

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getHtmlFiles(name, fileList);
        } else if (file.endsWith('.html') && !CONFIG.ignoreFiles.includes(file)) {
            // Convert file path to URL slug
            let urlPath = name.replace(/\\/g, '/').replace('index.html', '');
            fileList.push(urlPath);
        }
    });
    return fileList;
}

const generateSitemap = () => {
    const files = getHtmlFiles('./');
    const date = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.map(file => `  <url>
    <loc>${CONFIG.baseUrl}${file.replace('./', '')}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(CONFIG.outputFile, xml);
    console.log(`✅ Sitemap created with ${files.length} URLs`);
};

generateSitemap();
