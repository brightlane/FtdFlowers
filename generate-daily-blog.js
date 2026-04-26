const fs = require("fs");

// 🌸 Your affiliate link
const AFF_LINK = "https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799";

// 📍 Cities rotation
const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Miami",
  "Toronto", "Vancouver", "Montreal", "Dallas", "Seattle"
];

// 💐 Occasions rotation
const occasions = [
  "Birthday Flowers",
  "Sympathy Flowers",
  "Anniversary Flowers",
  "Get Well Soon Flowers",
  "Romantic Roses"
];

// 📅 pick today index
const today = new Date().getDate();

const city = cities[today % cities.length];
const occasion = occasions[today % occasions.length];

// 📝 blog template
const blog = `
<!DOCTYPE html>
<html>
<head>
  <title>Send ${occasion} in ${city} | Same-Day Flower Delivery</title>
  <meta name="description" content="Send ${occasion.toLowerCase()} in ${city} with same-day delivery. Fresh flowers delivered by local florists.">
</head>

<body style="font-family:Arial; max-width:900px; margin:auto; padding:20px; line-height:1.7;">

<h1>🌸 Send ${occasion} in ${city}</h1>

<p>
Looking to send fresh flowers in ${city}? You can easily order beautiful ${occasion.toLowerCase()} through local florists with fast same-day delivery options.
</p>

<p>
👉 <a href="${AFF_LINK}">
Order Flowers in ${city} Now
</a>
</p>

<h2>Why Choose Flower Delivery in ${city}?</h2>
<ul>
  <li>Same-day delivery available in most areas</li>
  <li>Hand-arranged fresh bouquets</li>
  <li>Perfect for ${occasion.toLowerCase()}</li>
</ul>

<h2>Best Occasions</h2>
<p>
Flowers are perfect for birthdays, anniversaries, sympathy, and special moments in ${city}.
</p>

<h2>Send Flowers Instantly</h2>
<p>
👉 <a href="${AFF_LINK}">Click here to order now</a>
</p>

<hr>

<p style="font-size:12px;color:#777;">
Affiliate disclosure: This page contains affiliate links.
</p>

</body>
</html>
`;

// 📁 output file
const filename = `blog-${city.toLowerCase().replace(/ /g, "-")}-${today}.html`;

fs.writeFileSync(filename, blog);

console.log("Generated:", filename);
