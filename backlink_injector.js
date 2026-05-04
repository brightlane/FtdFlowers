/**
 * BRIGHTLANE BACKLINK INJECTOR
 * Purpose: Create a SEO-friendly link wheel across all owned floral properties.
 */

const sites = [
    { name: "Mother's Day Flowers", url: "https://brightlane.github.io/MothersDayFlowers/" },
    { name: "Bouquet Flowers", url: "https://brightlane.github.io/BouquetFlowers/" },
    { name: "Valentine's Day Flowers", url: "https://brightlane.github.io/ValentinesDayFlowers/" },
    { name: "Send Flowers Online", url: "https://brightlane.github.io/SendFlowersOnline/" },
    { name: "Easter Flower Gifts", url: "https://brightlane.github.io/EasterFlowerGifts/" },
    { name: "Same Day Flowers", url: "https://brightlane.github.io/SameDayFlowers/" },
    { name: "Christmas Flowers", url: "https://brightlane.github.io/ChristmasFlowers/" },
    { name: "Flower Delivery", url: "https://brightlane.github.io/FlowerDelivery/" },
    { name: "Same Day Florist", url: "https://brightlane.github.io/SameDayFlorist/" },
    { name: "FTD Flowers Hub", url: "https://brightlane.github.io/FtdFlowers/" }
];

function generateBacklinkFooter() {
    console.log("--- GENERATING SEO BACKLINK FOOTER --- \n");

    let html = `<div class="floral-network-footer" style="margin-top:50px; padding:20px; border-top:1px solid #333; font-size:0.8rem; color:#777;">`;
    html += `<p style="margin-bottom:10px;">Our Floral Delivery Network:</p>`;
    html += `<ul style="list-style:none; padding:0; display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">`;

    sites.forEach(site => {
        html += `<li><a href="${site.url}" style="color:#ff4757; text-decoration:none;" target="_blank" rel="noopener">${site.name}</a></li>`;
    });

    html += `</ul></div>`;
    
    console.log(html);
}

generateBacklinkFooter();
