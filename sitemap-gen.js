const fs = require('fs');
const path = require('path');

const CONFIG = {
    baseUrl: 'https://brightlane.github.io/FtdFlowers/',
    outputFiles: {
        usa: './sitemap-usa.xml',
        canada: './sitemap-canada.xml',
        intl: './sitemap-intl.xml',
        main: './sitemap.xml'
    }
};

// Geography lists for Silo logic
const caCities = ['toronto', 'vancouver', 'montreal', 'calgary', 'edmonton', 'ottawa', 'winnipeg'];
const intlDirs = ['bing-es', 'bing-fr', 'bing-ru', 'bing-zh'];

function generateSitemaps() {
    const allFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
    const date = new Date().toISOString().split('T')[0];

    let silos = { usa: [], canada: [], intl: [], main: [] };

    allFiles.forEach(file => {
        const url = `${CONFIG.baseUrl}${file}`;
        
        // 1. Sort into International Silo
        if (intlDirs.some(dir => file.includes(dir))) {
            silos.intl.push(url);
        } 
        // 2. Sort into Canada Silo
        else if (caCities.some(city => file.toLowerCase().includes(city))) {
            silos.canada.push(url);
        } 
        // 3. Main/USA Silo
        else {
            silos.usa.push(url);
        }
        silos.main.push(url);
    });

    // XML Wrapper Function
    const wrapXml = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

    // Write all files
    fs.writeFileSync(CONFIG.outputFiles.usa, wrapXml(silos.usa));
    fs.writeFileSync(CONFIG.outputFiles.canada, wrapXml(silos.canada));
    fs.writeFileSync(CONFIG.outputFiles.intl, wrapXml(silos.intl));
    fs.writeFileSync(CONFIG.outputFiles.main, wrapXml(silos.main));

    console.log(`✅ Geo-Silos Created: USA(${silos.usa.length}), Canada(${silos.canada.length}), Intl(${silos.intl.length})`);
}

generateSitemaps();
