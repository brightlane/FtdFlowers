const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const DOMAIN = "https://brightlane.github.io/FtdFlowers";
const HOST = "brightlane.github.io";
const INDEX_KEY = "fa53f3437b0d41c7a8bbfc88b556d002";
const DIRECTORY = './dist';

async function runIndexBlast() {
    console.log("🦅 Vulture 10K: Starting IndexNow Blast...");

    try {
        if (!fs.existsSync(DIRECTORY)) {
            throw new Error("Dist folder not found");
        }

        // 1. Get HTML files
        const files = fs.readdirSync(DIRECTORY)
            .filter(f => f.endsWith('.html'));

        const urlList = files.map(f => `${DOMAIN}/${f}`);

        console.log(`📡 Found ${urlList.length} URLs`);

        // 2. Chunk (safer for IndexNow limits)
        const chunkSize = 1000;
        const chunks = [];

        for (let i = 0; i < urlList.length; i += chunkSize) {
            chunks.push(urlList.slice(i, i + chunkSize));
        }

        console.log(`📦 Sending ${chunks.length} batches...`);

        // 3. Send each batch
        for (let i = 0; i < chunks.length; i++) {

            const payload = {
                host: HOST,
                key: INDEX_KEY,
                keyLocation: `${DOMAIN}/${INDEX_KEY}.txt`,
                urlList: chunks[i]
            };

            const response = await axios.post(
                'https://api.indexnow.org/indexnow',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000
                }
            );

            console.log(`✅ Batch ${i + 1}/${chunks.length}: ${response.status}`);
        }

        console.log("🚀 SUCCESS: All URLs submitted to IndexNow");

    } catch (error) {
        console.error("❌ Blast Failed:", error.message);
    }
}

runIndexBlast();
