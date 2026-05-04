const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const DOMAIN = "https://brightlane.github.io/FtdFlowers"; // Adjust to your actual live URL
const INDEX_KEY = "fa53f3437b0d41c7a8bbfc88b556d002";
const DIRECTORY = './dist'; 

async function runIndexBlast() {
    console.log("🦅 Vulture 10K: Starting IndexNow Blast...");

    try {
        // 1. Map all generated HTML files to full URLs
        const files = fs.readdirSync(DIRECTORY).filter(f => f.endsWith('.html'));
        const urlList = files.map(f => `${DOMAIN}/${f}`);

        console.log(`📡 Submitting ${urlList.length} URLs to IndexNow...`);

        // 2. The IndexNow Payload
        const payload = {
            host: "brightlane.github.io",
            key: INDEX_KEY,
            keyLocation: `${DOMAIN}/${INDEX_KEY}.txt`,
            urlList: urlList.slice(0, 10000) // Safety cap
        };

        const response = await axios.post('https://api.indexnow.org/indexnow', payload);
        
        if (response.status === 200) {
            console.log("✅ SUCCESS: Bing and Yandex are now crawling your nodes.");
        }
    } catch (error) {
        console.error("❌ Blast Failed:", error.response ? error.response.data : error.message);
    }
}

runIndexBlast();
