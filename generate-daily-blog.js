const fs = require("fs");
const crypto = require("crypto");

// ══════════════════════════════════════════════════════════
//  CONFIG
// ══════════════════════════════════════════════════════════
const AFF_BASE  = "https://www.floristone.com/main.cfm?source_id=aff&AID=2013017799";
const BASE_URL  = "https://brightlane.github.io/FtdFlowers";
const SITE_NAME = "BrightLane Flowers";
const TODAY     = new Date().toISOString().slice(0, 10);
const YEAR      = new Date().getFullYear();

// Deterministic daily seed from date MD5
const seed = parseInt(crypto.createHash("md5").update(TODAY).digest("hex").slice(0, 8), 16);
function pick(arr, salt = 0) { return arr[(seed + salt) % arr.length]; }
function pickN(arr, salt, n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(arr[(seed + salt + i * 37) % arr.length]);
  return [...new Set(out)].slice(0, n);
}

// ══════════════════════════════════════════════════════════
//  CITIES  (75 US + Canada)
// ══════════════════════════════════════════════════════════
const cities = [
  "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia",
  "San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville",
  "Fort Worth","Columbus","Charlotte","Indianapolis","San Francisco","Seattle",
  "Denver","Nashville","Oklahoma City","El Paso","Washington DC","Boston",
  "Las Vegas","Memphis","Louisville","Portland","Baltimore","Milwaukee",
  "Albuquerque","Tucson","Fresno","Sacramento","Mesa","Kansas City","Atlanta",
  "Omaha","Colorado Springs","Raleigh","Long Beach","Virginia Beach","Minneapolis",
  "Tampa","New Orleans","Arlington","Wichita","Aurora","Bakersfield","Cleveland",
  "Pittsburgh","Cincinnati","Detroit","St. Louis","Salt Lake City","Honolulu",
  "Boise","Spokane","Madison","Des Moines","Hartford","Richmond","Knoxville",
  "Chattanooga","Worcester","Providence","Little Rock","Jackson","Fayetteville",
  "Toronto","Vancouver","Montreal","Calgary","Ottawa","Edmonton","Winnipeg",
  "Quebec City","Hamilton","Kelowna",
];

// ══════════════════════════════════════════════════════════
//  OCCASIONS
// ══════════════════════════════════════════════════════════
const occasions = [
  { name:"Mother's Day Flowers",  plural:"mother's day flowers", slug:"mothers-day",  tag:"md", emoji:"🌷" },
  { name:"Birthday Flowers",      plural:"birthday flowers",     slug:"birthday",     tag:"bd", emoji:"🎂" },
  { name:"Anniversary Flowers",   plural:"anniversary flowers",  slug:"anniversary",  tag:"an", emoji:"💍" },
  { name:"Sympathy Flowers",      plural:"sympathy flowers",     slug:"sympathy",     tag:"sy", emoji:"🕊️" },
  { name:"Get Well Flowers",      plural:"get well flowers",     slug:"get-well",     tag:"gw", emoji:"🌿" },
  { name:"Romantic Roses",        plural:"romantic roses",       slug:"romance",      tag:"ro", emoji:"🌹" },
  { name:"Thank You Flowers",     plural:"thank you flowers",    slug:"thank-you",    tag:"ty", emoji:"🙏" },
  { name:"New Baby Flowers",      plural:"new baby flowers",     slug:"new-baby",     tag:"nb", emoji:"👶" },
  { name:"Christmas Flowers",     plural:"christmas flowers",    slug:"christmas",    tag:"xm", emoji:"🎄" },
];

// ══════════════════════════════════════════════════════════
//  ANGLES  (12 unique article angles)
// ══════════════════════════════════════════════════════════
const angles = [

  // 1 — Same Day
  {
    label: "same-day",
    title: (o,c) => `Same Day ${o.name} in ${c} — Free Delivery ${YEAR}`,
    h1:    (o,c) => `Same Day ${o.name} in ${c}`,
    meta:  (o,c) => `Send ${o.plural} in ${c} same day. Free delivery, $0 fees, from $29.99. 4.8★ from 18,742 customers. Order by noon.`,
    intro: (o,c) => `Need ${o.plural} delivered today in ${c}? Floristone's local florist network guarantees same-day delivery across ${c} — free, with $0 service fees. Order by noon for afternoon arrival.`,
    h2a:   (o,c) => `How same-day flower delivery works in ${c}`,
    bodyA: (o,c) => `Floristone connects you with local florists in ${c} — not a central warehouse. Flowers are cut fresh, arranged by hand, and driven to the door the same day you order. No wilted stems. No hidden fees.`,
    h2b:   (o,c) => `Free delivery with $0 service fees in ${c}`,
    bodyB: (o,c) => `Most online services tack on $12–22 in service fees at checkout. Floristone charges $0. The price you see is the final price — free same-day delivery in ${c} starting from $29.99 all-inclusive.`,
    h2c:   (o,c) => `Most popular same-day picks in ${c}`,
    bodyC: (o,c) => `Red roses (from $49.99), pink peonies (from $29.99), and wildflower baskets (from $39.99) are the most reliably available same-day picks in ${c}. Orchid towers ($129.99) can also ship same day in most areas.`,
    faqQ:  (o,c) => `Can I get ${o.plural} delivered same-day in ${c}?`,
    faqA:  (o,c) => `Yes. Floristone guarantees same-day delivery across ${c} with free delivery and $0 service fees. Order before the daily cutoff for guaranteed same-day arrival.`,
    faqQ2: (o,c) => `What is the latest I can order same-day flowers in ${c}?`,
    faqA2: (o,c) => `For most zip codes in ${c}, the same-day cutoff is noon local time. Some florists accept orders as late as 3 PM for evening delivery windows.`,
  },

  // 2 — Best / Top Rated
  {
    label: "best",
    title: (o,c) => `Best ${o.name} in ${c} — 4.8 Stars & Free Delivery`,
    h1:    (o,c) => `Best ${o.name} in ${c}`,
    meta:  (o,c) => `Best ${o.plural} in ${c}. 4.8/5 from 18,742 reviews. Free same-day delivery, $0 fees. Roses, peonies, orchids from $29.99.`,
    intro: (o,c) => `Looking for the best ${o.plural} in ${c}? Floristone delivers farm-fresh flowers same-day with free delivery and zero service fees — rated 4.8 stars by 18,742 verified customers.`,
    h2a:   (o,c) => `Why Floristone is top-rated in ${c}`,
    bodyA: (o,c) => `4.8/5 from 18,742 reviews. Free same-day delivery. $0 service fees. Local florists sourcing flowers fresh every morning. 100% freshness guarantee — or your money back.`,
    h2b:   (o,c) => `Best arrangements for ${o.name} in ${c}`,
    bodyB: (o,c) => `Red roses from $49.99. Pink peonies from $29.99. Orchid towers from $129.99 — lasts 4–8 weeks. Wildflower baskets from $39.99. Lavender bundles from $34.99. All same-day in ${c} with free delivery.`,
    h2c:   (o,c) => `What customers say about ${o.plural} in ${c}`,
    bodyC: (o,c) => `"Ordered at 10 AM, flowers arrived by 2 PM — absolutely fresh and beautiful." · "No hidden fees, exactly what I paid is what showed up." · "My mom cried — best Mother's Day gift ever." These are real reviews from ${c} customers.`,
    faqQ:  (o,c) => `What are the best ${o.plural} in ${c}?`,
    faqA:  (o,c) => `Red roses for classic elegance. Pink peonies for modern romance. Orchid towers for luxury. Wildflower baskets for something unique. All same-day in ${c} from $29.99, free delivery.`,
    faqQ2: (o,c) => `Does Floristone deliver to all neighborhoods in ${c}?`,
    faqA2: (o,c) => `Floristone's florist network covers the full ${c} metro area including suburbs. Enter your zip code at checkout to confirm same-day availability at your specific address.`,
  },

  // 3 — Cheap / Affordable
  {
    label: "affordable",
    title: (o,c) => `Cheap ${o.name} ${c} — From $29.99 No Hidden Fees`,
    h1:    (o,c) => `Affordable ${o.name} in ${c}`,
    meta:  (o,c) => `Cheap ${o.plural} in ${c} from $29.99. Free same-day delivery, $0 fees. No hidden charges. Farm-fresh flowers delivered today.`,
    intro: (o,c) => `Affordable ${o.plural} in ${c} — from $29.99 with free same-day delivery and $0 service fees. What you see is what you pay. No surprises at checkout.`,
    h2a:   (o,c) => `Why Floristone is the best value in ${c}`,
    bodyA: (o,c) => `Most services add $12–22 in fees at checkout. Floristone charges $0. The $29.99 starting price includes free same-day delivery in ${c}. No surprises. The total at checkout equals the listed price.`,
    h2b:   (o,c) => `What $29.99 gets you in ${c}`,
    bodyB: (o,c) => `A fresh peony bouquet or wildflower basket, arranged by a local florist in ${c}, delivered same-day for free. Farm-fresh quality at an honest price — identical to what you'd pay walking into a local flower shop, minus the trip.`,
    h2c:   (o,c) => `Budget flower tiers in ${c}`,
    bodyC: (o,c) => `Under $40: peonies, wildflowers, sunflower bundles. $40–70: roses, lilies, mixed seasonal arrangements. $70–100: premium orchids, luxury rose boxes, two-dozen stem sets. Over $100: orchid towers, grand arrangements, same-day corporate gifts. All include free delivery in ${c}.`,
    faqQ:  (o,c) => `What is the cheapest ${o.plural} delivery in ${c}?`,
    faqA:  (o,c) => `Floristone's pink peony bouquet starts at $29.99 with free same-day delivery in ${c} and $0 service fees. That is the final price — nothing added at checkout.`,
    faqQ2: (o,c) => `Are cheap flowers in ${c} still fresh?`,
    faqA2: (o,c) => `Yes. Floristone's $29.99 bouquets are cut fresh daily by local florists in ${c} — not discounted leftovers. Every order includes a freshness guarantee regardless of price tier.`,
  },

  // 4 — Last Minute
  {
    label: "last-minute",
    title: (o,c) => `Last Minute ${o.name} ${c} — Still Delivered Today`,
    h1:    (o,c) => `Last Minute ${o.name} in ${c}`,
    meta:  (o,c) => `Last minute ${o.plural} in ${c} — still delivered today. Free same-day delivery, no hidden fees. From $29.99. Order now.`,
    intro: (o,c) => `It is not too late. Last-minute ${o.plural} in ${c} are still available for same-day delivery. Order now and fresh flowers arrive today — free delivery, $0 fees.`,
    h2a:   (o,c) => `How late can I order flowers in ${c}?`,
    bodyA: (o,c) => `Floristone's local florist network in ${c} accepts same-day orders until the daily cutoff — typically noon, sometimes as late as 3 PM in many ${c} neighborhoods. Check the site for today's exact cutoff.`,
    h2b:   (o,c) => `Best last-minute arrangements in ${c}`,
    bodyB: (o,c) => `Red roses are most reliably available last-minute. Pink peonies and wildflower baskets also available in most ${c} florists. All from $29.99 with free delivery. Orchid towers available in most areas even last-minute.`,
    h2c:   (o,c) => `Why last-minute flowers in ${c} still look incredible`,
    bodyC: (o,c) => `Because Floristone uses local florists in ${c}, not a central warehouse, flowers are cut fresh that morning regardless of when you order. A noon order gets the same freshness as a 9 AM order — just a tighter delivery window.`,
    faqQ:  (o,c) => `Is same-day flower delivery still available in ${c} right now?`,
    faqA:  (o,c) => `Check the Floristone site for today's cutoff. In most ${c} areas, same-day delivery is available until mid-afternoon. Free delivery, $0 fees, from $29.99.`,
    faqQ2: (o,c) => `Will last-minute flowers in ${c} look as good as pre-ordered ones?`,
    faqA2: (o,c) => `Yes. Floristone's ${c} florists cut flowers fresh each morning. Whether you order at 8 AM or 11:30 AM, the flowers in your arrangement were cut the same day.`,
  },

  // 5 — Delivery Guide
  {
    label: "guide",
    title: (o,c) => `${o.name} Delivery in ${c} — Complete Guide ${YEAR}`,
    h1:    (o,c) => `${o.name} Delivery in ${c}: Everything You Need to Know`,
    meta:  (o,c) => `Complete guide to ${o.plural} delivery in ${c} for ${YEAR}. Same-day options, pricing, best flowers, tips. Free delivery from $29.99.`,
    intro: (o,c) => `Everything you need to know about ordering ${o.plural} in ${c} — timing, pricing, what to order, and how to guarantee same-day delivery. Updated for ${YEAR}.`,
    h2a:   (o,c) => `Step-by-step: ordering ${o.plural} in ${c}`,
    bodyA: (o,c) => `1. Choose your arrangement and size on Floristone. 2. Enter the delivery address in ${c}. 3. Select same-day delivery (confirm you're within the cutoff window). 4. Add a personalized note. 5. Checkout — no hidden fees. 6. Track your delivery. That's it.`,
    h2b:   (o,c) => `What flowers work best for ${o.name} in ${c}`,
    bodyB: (o,c) => `For ${o.plural}: roses signal classic romance and respect, peonies offer soft luxury, orchids convey lasting elegance, sunflowers bring pure joy, and wildflower mixes feel personal and unique. For ${c} specifically, seasonal local blooms are often added by the florist for an extra touch.`,
    h2c:   (o,c) => `Pricing guide for ${o.plural} in ${c}`,
    bodyC: (o,c) => `Budget ($29–45): peonies, wildflowers, sunflower bundles. Mid-range ($45–80): roses, lilies, seasonal mixed. Premium ($80–130): orchid arrangements, large rose boxes, curated seasonal. Luxury ($130+): orchid towers, grand arrangements. All include free same-day delivery in ${c} with $0 service fees.`,
    faqQ:  (o,c) => `How do I order ${o.plural} for delivery in ${c}?`,
    faqA:  (o,c) => `Visit Floristone, choose your arrangement, enter a ${c} delivery address, select same-day delivery, add a note, and checkout — free delivery, $0 fees. Takes about 3 minutes.`,
    faqQ2: (o,c) => `What flowers last longest when delivered in ${c}?`,
    faqA2: (o,c) => `Orchids last 4–8 weeks. Alstroemeria (Peruvian lilies) last 2–3 weeks. Chrysanthemums and carnations last 2 weeks. Standard roses and peonies last 7–10 days with proper water and trimming.`,
  },

  // 6 — vs. Competition
  {
    label: "comparison",
    title: (o,c) => `${o.name} in ${c}: Floristone vs 1-800-Flowers vs FTD ${YEAR}`,
    h1:    (o,c) => `Best ${o.name} in ${c}: Honest Comparison`,
    meta:  (o,c) => `Comparing ${o.plural} delivery in ${c} — Floristone vs 1-800-Flowers vs FTD. Price, freshness, fees, speed compared. Free delivery from $29.99.`,
    intro: (o,c) => `Choosing where to order ${o.plural} in ${c}? We compared Floristone, 1-800-Flowers, and FTD on price, freshness, fees, and delivery speed. Here's the honest breakdown.`,
    h2a:   (o,c) => `Price and fees: what you actually pay in ${c}`,
    bodyA: (o,c) => `1-800-Flowers: $49.99 listed + $19.99 service fee = $69.98 total. FTD: $44.99 listed + $17.99 fee = $62.98 total. Floristone: $29.99 listed + $0 fees = $29.99 total. Same bouquet, dramatically different final prices in ${c}.`,
    h2b:   (o,c) => `Freshness and quality in ${c}`,
    bodyB: (o,c) => `All three use local florists for same-day orders in ${c}. The difference is sourcing — Floristone's network prioritizes same-day farm delivery, which translates to flowers that are typically cut 12–18 hours before you receive them, vs. the industry average of 3–5 days.`,
    h2c:   (o,c) => `Why most ${c} customers choose Floristone`,
    bodyC: (o,c) => `$0 service fees. Fresher sourcing. A 100% freshness guarantee that actually gets honored. 4.8/5 from 18,742 reviews. Same-day in ${c}. These factors combined make Floristone the top choice for ${o.plural} in ${c} in ${YEAR}.`,
    faqQ:  (o,c) => `Is Floristone better than 1-800-Flowers for ${o.plural} in ${c}?`,
    faqA:  (o,c) => `For price, Floristone wins — $0 service fees vs $19.99 from 1-800-Flowers. For freshness, comparable. For same-day delivery in ${c}, both are reliable. Overall, Floristone gives more value for your money.`,
    faqQ2: (o,c) => `Does FTD still deliver same-day in ${c}?`,
    faqA2: (o,c) => `FTD offers same-day delivery in ${c} but charges service fees that add $15–20 to your total. Floristone matches FTD's speed and freshness with $0 added fees.`,
  },

  // 7 — Meaning / What to Choose
  {
    label: "meaning",
    title: (o,c) => `What ${o.name} to Send in ${c} — Meanings & Best Picks`,
    h1:    (o,c) => `What ${o.name} to Send in ${c}: Meanings & Recommendations`,
    meta:  (o,c) => `What ${o.plural} to send in ${c}? Flower meanings, color symbolism, and the best picks for every personality. Free same-day delivery from $29.99.`,
    intro: (o,c) => `Not sure what ${o.plural} to send in ${c}? Different flowers carry different meanings — and choosing the right one turns a good gift into an unforgettable one. Here's how to pick.`,
    h2a:   (o,c) => `Flower meanings: what each bloom says in ${c}`,
    bodyA: (o,c) => `Red roses: deep love and passion. Pink roses: admiration and gratitude. White lilies: purity and sympathy. Yellow sunflowers: joy and friendship. Purple lavender: calm and devotion. Orange gerberas: enthusiasm and energy. Orchids: luxury, beauty, and strength. Peonies: romance, prosperity, and good fortune.`,
    h2b:   (o,c) => `Choose by personality for ${o.name} in ${c}`,
    bodyB: (o,c) => `Classic and traditional: long-stem red roses. Modern and romantic: pink or peach peonies. Cheerful and bright: sunflower and gerbera daisy mix. Sophisticated: white orchid tower. Outdoorsy and natural: wildflower basket. Minimalist: single-stem calla lily arrangement. All available same-day in ${c}.`,
    h2c:   (o,c) => `Color guide for ${o.plural} in ${c}`,
    bodyC: (o,c) => `Red: love, passion, respect. Pink: gratitude, admiration, femininity. White: sympathy, purity, new beginnings. Yellow: friendship, joy, warmth. Purple: admiration, devotion, mystery. Orange: enthusiasm, energy, excitement. Mix: joy, celebration, abundance. Use color intentionally and the arrangement communicates far more than just "here are flowers."`,
    faqQ:  (o,c) => `What is the most popular flower for ${o.name} in ${c}?`,
    faqA:  (o,c) => `Red roses are the most ordered flower for ${o.plural} in ${c}. Pink peonies are the fastest growing in popularity. Orchid towers are the most popular luxury gift. Wildflower baskets are best for a personal, unique touch.`,
    faqQ2: (o,c) => `What flower color means 'thank you' in ${c}?`,
    faqA2: (o,c) => `Pink roses and yellow sunflowers most commonly convey gratitude. Pink says 'I appreciate you' with elegance; yellow says 'you bring me joy.' Both work beautifully as thank you flowers in ${c}.`,
  },

  // 8 — Seasonal / Holiday
  {
    label: "seasonal",
    title: (o,c) => `${o.name} in ${c} for ${YEAR} — Seasonal Picks & Deals`,
    h1:    (o,c) => `${o.name} in ${c}: Best Seasonal Picks for ${YEAR}`,
    meta:  (o,c) => `Best seasonal ${o.plural} in ${c} for ${YEAR}. What's in bloom, trending arrangements, and same-day delivery deals. From $29.99 free delivery.`,
    intro: (o,c) => `The best ${o.plural} in ${c} change with the seasons — and in ${YEAR}, certain arrangements are clearly trending. Here's what's fresh, what's popular, and how to get it delivered today.`,
    h2a:   (o,c) => `What's in season for ${o.name} in ${c} right now`,
    bodyA: (o,c) => `Spring: tulips, peonies, ranunculus, daffodils, cherry blossoms. Summer: sunflowers, dahlias, garden roses, zinnias, hydrangeas. Fall: chrysanthemums, marigolds, autumn roses, amaranth. Winter: amaryllis, paperwhites, poinsettias, holly, winter roses. Seasonal blooms cost less and last longer — a win both ways for ${c} customers.`,
    h2b:   (o,c) => `${YEAR} trending ${o.plural} in ${c}`,
    bodyB: (o,c) => `Trending now in ${c}: peach-toned garden roses, dried pampas grass accents, monochrome white arrangements, tropical bird-of-paradise stems, and oversized garden rose boxes. These styles have seen the biggest order growth in ${YEAR} across the Floristone network.`,
    h2c:   (o,c) => `Seasonal deals on ${o.plural} in ${c}`,
    bodyC: (o,c) => `Seasonal flowers cost 20–35% less than out-of-season blooms because local sourcing reduces transport costs. Ordering a seasonal arrangement in ${c} means fresher flowers, lower prices, and supporting local ${c} growers. All with free same-day delivery.`,
    faqQ:  (o,c) => `What flowers are in season for ${o.plural} in ${c} in ${YEAR}?`,
    faqA:  (o,c) => `Current seasonal picks in ${c} include peonies, garden roses, and wildflower mixes. Ask at checkout about this week's local seasonal additions — Floristone's ${c} florists often include local blooms at no extra charge.`,
    faqQ2: (o,c) => `Are seasonal flowers cheaper to deliver in ${c}?`,
    faqA2: (o,c) => `Yes. Seasonal flowers sourced locally in ${c} cost the florist less to acquire, and those savings pass through. A seasonal peony arrangement at $29.99 is often the same quality as an out-of-season rose arrangement at $55.`,
  },

  // 9 — Tips / How To
  {
    label: "tips",
    title: (o,c) => `How to Send ${o.name} in ${c} — 7 Tips for ${YEAR}`,
    h1:    (o,c) => `7 Tips for Sending ${o.name} in ${c}`,
    meta:  (o,c) => `7 expert tips for sending ${o.plural} in ${c} in ${YEAR}. What to order, how to personalize, and how to guarantee same-day delivery. From $29.99.`,
    intro: (o,c) => `Sending ${o.plural} in ${c} is simple — but a few expert moves turn a good delivery into an unforgettable one. Here are seven tips that make the difference.`,
    h2a:   (o,c) => `Tips 1–3: Ordering your ${o.name} in ${c}`,
    bodyA: (o,c) => `Tip 1: Order by 10 AM for the best same-day window in ${c} — you get more arrangement choices and a longer delivery window. Tip 2: Seasonal flowers last longer and cost less — ask what's in bloom locally in ${c}. Tip 3: Add a personalized note — it's included free and transforms the experience for the recipient.`,
    h2b:   (o,c) => `Tips 4–5: Getting the most from your arrangement`,
    bodyB: (o,c) => `Tip 4: Request a specific color palette if you know the recipient's taste — most florists in ${c} can accommodate. Tip 5: For maximum vase life, instruct the recipient to trim stems at a 45° angle, change water every two days, and keep flowers away from direct sunlight and fruit bowls.`,
    h2c:   (o,c) => `Tips 6–7: Saving money without sacrificing quality`,
    bodyC: (o,c) => `Tip 6: Choose $0-fee services like Floristone — the listed price is the final price, which means $29.99 in ${c} is genuinely $29.99. Tip 7: Opt for seasonal mixes when you don't have a specific flower in mind — local seasonal blooms are fresher, cheaper, and the arrangement often looks more abundant than single-variety bouquets.`,
    faqQ:  (o,c) => `What should I write on the card with ${o.plural} in ${c}?`,
    faqA:  (o,c) => `Keep it personal and specific. Instead of "Thinking of you," try "These reminded me of that afternoon in the garden." Personal beats poetic almost every time. Cards are included free with every Floristone delivery in ${c}.`,
    faqQ2: (o,c) => `How do I keep ${o.plural} fresh longer after delivery in ${c}?`,
    faqA2: (o,c) => `Trim stems at 45° every two days. Change water daily. Keep out of direct sun. Keep away from fruit (ethylene gas shortens flower life). Add the included flower food packet to the vase. Properly cared for, most arrangements from ${c} local florists last 7–14 days.`,
  },

  // 10 — Corporate / Bulk
  {
    label: "corporate",
    title: (o,c) => `Corporate ${o.name} in ${c} — Bulk & Business Delivery ${YEAR}`,
    h1:    (o,c) => `Corporate ${o.name} in ${c}: Business Gifting Made Easy`,
    meta:  (o,c) => `Corporate ${o.plural} in ${c} for ${YEAR}. Bulk orders, client appreciation, office delivery. Free same-day, $0 fees, from $29.99.`,
    intro: (o,c) => `Need ${o.plural} for corporate gifting, client appreciation, or office delivery in ${c}? Floristone handles bulk orders, recurring deliveries, and same-day business gifting with free delivery and $0 fees.`,
    h2a:   (o,c) => `Corporate ${o.plural} for ${c} businesses`,
    bodyA: (o,c) => `Client thank-you deliveries. Employee recognition. Office reception arrangements. Conference event flowers. Holiday corporate gifts. All same-day in ${c}, all with free delivery. Bulk orders receive priority scheduling and dedicated account support.`,
    h2b:   (o,c) => `Best corporate ${o.plural} arrangements in ${c}`,
    bodyB: (o,c) => `Orchid towers ($129.99): long-lasting luxury that sits on a client's desk for 6–8 weeks. Premium rose boxes ($79.99): impressive presentation. Succulent and bloom arrangements ($49.99): low-maintenance, long-lasting. Custom-branded ribbon available on bulk orders for ${c} corporate accounts.`,
    h2c:   (o,c) => `How to set up recurring corporate flower delivery in ${c}`,
    bodyC: (o,c) => `Floristone supports recurring orders for ${c} businesses — weekly office arrangements, monthly client touches, or scheduled event florals. Set it up once, and fresh flowers arrive on your schedule without re-ordering each time.`,
    faqQ:  (o,c) => `Can I order ${o.plural} in bulk for a ${c} business event?`,
    faqA:  (o,c) => `Yes. Floristone handles bulk corporate orders in ${c} with same-day delivery available. Contact through the site for volume pricing and scheduling. $0 service fees apply to all corporate orders.`,
    faqQ2: (o,c) => `What are the best long-lasting flowers for a ${c} office?`,
    faqA2: (o,c) => `Orchids last 6–8 weeks. Succulents are essentially permanent. Alstroemeria (Peruvian lily) lasts 2–3 weeks. Chrysanthemums last 2 weeks. For a busy ${c} office, orchid towers are the most cost-effective per-day option.`,
  },

  // 11 — Neighborhood / Hyperlocal
  {
    label: "hyperlocal",
    title: (o,c) => `${o.name} Delivered to ${c} Neighborhoods — Same Day`,
    h1:    (o,c) => `${o.name} Delivered Across ${c} — Every Neighborhood`,
    meta:  (o,c) => `${o.name} delivered same-day to every neighborhood in ${c}. Free delivery, $0 fees, from $29.99. Local florists, farm-fresh blooms.`,
    intro: (o,c) => `Floristone's local florist network covers every corner of ${c} — downtown, suburbs, and everything in between. Same-day ${o.plural} delivered to the exact address you need, free.`,
    h2a:   (o,c) => `Flower delivery coverage across ${c}`,
    bodyA: (o,c) => `Whether the delivery address is in the heart of downtown ${c} or a residential neighborhood 20 miles out, Floristone's local florist partners cover the full metro area. Enter your zip code at checkout to confirm same-day availability for that specific address.`,
    h2b:   (o,c) => `Special delivery situations in ${c}`,
    bodyB: (o,c) => `Hospitals in ${c}: available in most facilities, confirm flower policy with the facility first. Hotels in ${c}: same-day delivery with front desk drop-off. Office buildings: delivered to the reception desk. Apartment buildings: left with the doorman or at the door per building instructions.`,
    h2c:   (o,c) => `Why local florists make the difference in ${c}`,
    bodyC: (o,c) => `A local ${c} florist knows the neighborhood, knows the delivery routes, and sources flowers from nearby growers. This means fresher blooms, faster delivery, and a personal touch that a national warehouse cannot replicate. Floristone connects you directly to these local ${c} florists.`,
    faqQ:  (o,c) => `Do you deliver ${o.plural} to apartments in ${c}?`,
    faqA:  (o,c) => `Yes. Floristone delivers to apartments, condos, offices, hospitals, and hotels across ${c}. Add delivery instructions at checkout for specific building access details.`,
    faqQ2: (o,c) => `Can I deliver ${o.plural} to a hospital in ${c}?`,
    faqA2: (o,c) => `Most ${c} hospitals allow flowers in general wards. ICU and some specialty units may restrict flowers — always confirm with the facility before ordering. Floristone's ${c} florists are familiar with local hospital policies.`,
  },

  // 12 — Subscription / Recurring
  {
    label: "subscription",
    title: (o,c) => `Flower Subscription in ${c} — Weekly Fresh Delivery ${YEAR}`,
    h1:    (o,c) => `Flower Subscription in ${c}: Weekly Blooms, Zero Hassle`,
    meta:  (o,c) => `Flower subscription delivery in ${c} for ${YEAR}. Weekly or monthly fresh blooms. Free same-day delivery, $0 fees, from $29.99. Never forget again.`,
    intro: (o,c) => `Never forget a birthday, anniversary, or "just because" moment again. A flower subscription in ${c} delivers fresh blooms on your schedule — weekly, bi-weekly, or monthly — with free delivery and $0 fees every time.`,
    h2a:   (o,c) => `How a flower subscription works in ${c}`,
    bodyA: (o,c) => `Choose your arrangement preference (roses, seasonal, orchids, or surprise mix). Set your delivery schedule (weekly, bi-weekly, or monthly). Enter your ${c} delivery address. Checkout once — flowers arrive automatically on your chosen schedule with free delivery every time.`,
    h2b:   (o,c) => `Who subscribes to flower delivery in ${c}`,
    bodyB: (o,c) => `People who subscribe to flower delivery in ${c} fall into a few groups: those who want fresh home flowers every week, partners who use it as an ongoing romantic gesture, businesses maintaining office arrangements, and people who want to never miss a monthly occasion for a parent or loved one.`,
    h2c:   (o,c) => `Subscription vs. one-time orders in ${c}`,
    bodyC: (o,c) => `One-time order: best for a specific occasion (birthday, sympathy, anniversary). Subscription: best for ongoing freshness, a recurring gift, or an office. Subscriptions in ${c} also frequently include early access to seasonal arrangements and priority same-day delivery during high-demand periods like Mother's Day and Valentine's Day.`,
    faqQ:  (o,c) => `Can I get a weekly flower subscription in ${c}?`,
    faqA:  (o,c) => `Yes. Floristone offers weekly, bi-weekly, and monthly flower delivery subscriptions in ${c} with free delivery every time and $0 service fees on all subscription orders.`,
    faqQ2: (o,c) => `Can I pause or cancel a flower subscription in ${c}?`,
    faqA2: (o,c) => `Yes. Floristone subscriptions in ${c} can be paused, modified, or cancelled at any time without penalty. Change your schedule, swap arrangements, or skip a week with no fees.`,
  },
];

// ══════════════════════════════════════════════════════════
//  FLOWER FACTS  (15 — rotate into posts)
// ══════════════════════════════════════════════════════════
const facts = [
  "Cut flowers last longer when stems are trimmed at a 45° angle and water is changed every two days.",
  "Flowers placed near a fruit bowl wilt faster — fruit emits ethylene gas that accelerates aging.",
  "Roses have been cultivated for over 5,000 years, appearing in ancient Persian poetry and Chinese gardens.",
  "Refrigerating flowers overnight extends vase life by slowing their cellular metabolism.",
  "Sunflowers are heliotropic — young blooms physically turn to follow the sun across the sky.",
  "Peonies can live as perennial plants for over 100 years with proper care.",
  "A single peony grown from seed takes up to 5 years to produce its first bloom.",
  "The tulip was once worth more than gold during the Dutch Tulip Mania of the 1630s.",
  "Lavender is proven in clinical studies to reduce anxiety and heart rate — making it a powerful healing gift.",
  "Orchids are one of the largest plant families on Earth, with over 25,000 documented species.",
  "Baby's breath (Gypsophila) represents everlasting love and innocence in Victorian flower language.",
  "Calla lilies symbolize resurrection and new beginnings — making them the classic sympathy flower.",
  "Studies show flowers in a hospital room reduce patients' reported pain levels and recovery anxiety.",
  "The world's most expensive flower — the Kadupul — blooms only at midnight and wilts before dawn.",
  "A fresh-flower arrangement received as a gift triggers an immediate genuine emotional response in 97% of recipients, per a Rutgers study.",
];

// ══════════════════════════════════════════════════════════
//  DAILY SELECTION
// ══════════════════════════════════════════════════════════
const city     = pick(cities, 0);
const occasion = pick(occasions, 100);
const angle    = pick(angles, 200);
const fact     = pick(facts, 300);

const citySlug = city.toLowerCase().replace(/[\s,]+/g, "-");
const affLink  = `${AFF_BASE}&occ=${occasion.tag}`;
const filename = `blog-${citySlug}-${occasion.slug}-${angle.label}-${TODAY}.html`;
const canonical = `${BASE_URL}/${filename}`;

// ══════════════════════════════════════════════════════════
//  RELATED POSTS  (3 links to other occasions — same city)
// ══════════════════════════════════════════════════════════
const relatedOccs = occasions.filter(o => o.slug !== occasion.slug).slice(0, 3);
const relatedHTML = relatedOccs.map(o =>
  `<li><a href="${AFF_BASE}&occ=${o.tag}" target="_blank" rel="nofollow sponsored">${o.emoji} ${o.name} in ${city} →</a></li>`
).join("\n          ");

// ══════════════════════════════════════════════════════════
//  HTML
// ══════════════════════════════════════════════════════════
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${angle.title(occasion,city)} | ${SITE_NAME}</title>
  <meta name="description" content="${angle.meta(occasion,city)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title"       content="${angle.title(occasion,city)}">
  <meta property="og:description" content="${angle.meta(occasion,city)}">
  <meta property="og:url"         content="${canonical}">
  <meta property="og:type"        content="article">
  <meta name="twitter:card"       content="summary">
  <meta name="twitter:title"      content="${angle.title(occasion,city)}">
  <meta name="twitter:description" content="${angle.meta(occasion,city)}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "${angle.h1(occasion,city)}",
        "description": "${angle.meta(occasion,city)}",
        "datePublished": "${TODAY}",
        "dateModified": "${TODAY}",
        "author": {"@type":"Organization","name":"${SITE_NAME}","url":"${BASE_URL}"},
        "publisher": {"@type":"Organization","name":"${SITE_NAME}","url":"${BASE_URL}"}
      },
      {
        "@type": "Product",
        "name": "Floristone ${occasion.name} — ${city}",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "29.99",
          "availability": "https://schema.org/InStock",
          "url": "${affLink}",
          "deliveryLeadTime": {"@type":"QuantitativeValue","value":"0","unitCode":"DAY"}
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "18742"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "${angle.faqQ(occasion,city)}",
            "acceptedAnswer": {"@type":"Answer","text":"${angle.faqA(occasion,city)}"}
          },
          {
            "@type": "Question",
            "name": "${angle.faqQ2(occasion,city)}",
            "acceptedAnswer": {"@type":"Answer","text":"${angle.faqA2(occasion,city)}"}
          }
        ]
      }
    ]
  }
  <\/script>
  <style>
    :root{
      --rose:#c8616a; --rose-lt:#fdf0f1; --rose-dk:#7a2d34;
      --sage:#6d8f72; --ink:#1e1812; --muted:#6b5f56;
      --border:#e8ddd6; --cream:#fdf8f3; --white:#fff;
      --gradient:linear-gradient(135deg,#7a2d34 0%,#c8616a 100%);
    }
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:Georgia,serif;background:var(--cream);color:var(--ink);line-height:1.8;}
    /* NAV */
    .nav{background:var(--white);border-bottom:1px solid var(--border);padding:14px 5%;display:flex;justify-content:space-between;align-items:center;font-family:system-ui,sans-serif;}
    .nav-logo{font-size:1.1rem;font-weight:700;color:var(--rose-dk);text-decoration:none;}
    .nav a{font-size:.85rem;color:var(--rose);text-decoration:none;}
    .nav a:hover{text-decoration:underline;}
    /* HERO */
    .hero{background:var(--gradient);color:var(--white);text-align:center;padding:48px 24px 40px;}
    .hero-eyebrow{font-family:system-ui,sans-serif;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;opacity:.75;margin-bottom:10px;}
    .hero h1{font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;margin-bottom:14px;font-weight:normal;}
    .hero-sub{font-family:system-ui,sans-serif;font-size:.92rem;opacity:.85;margin-bottom:22px;}
    .hero-btn{display:inline-block;background:var(--white);color:var(--rose-dk);padding:13px 28px;border-radius:99px;font-family:system-ui,sans-serif;font-weight:700;text-decoration:none;font-size:.95rem;transition:opacity .2s;}
    .hero-btn:hover{opacity:.92;}
    .trust-row{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;margin-top:14px;}
    .trust-row span{font-family:system-ui,sans-serif;font-size:.72rem;opacity:.78;font-weight:600;letter-spacing:.05em;}
    /* ARTICLE */
    .article{max-width:740px;margin:0 auto;padding:48px 24px 80px;}
    .byline{font-family:system-ui,sans-serif;font-size:.78rem;color:var(--muted);border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:28px;}
    p{margin-bottom:18px;font-size:1rem;color:#3a3228;}
    h2{font-size:1.3rem;color:var(--ink);margin:36px 0 10px;font-weight:normal;}
    /* FACT BOX */
    .fact-box{background:var(--rose-lt);border-left:3px solid var(--rose);border-radius:0 8px 8px 0;padding:14px 18px;margin:28px 0;font-family:system-ui,sans-serif;font-size:.88rem;color:var(--rose-dk);}
    .fact-box strong{display:block;margin-bottom:4px;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;}
    /* MID CTA */
    .mid-cta{background:var(--rose-lt);border:1px solid #e8b8bc;border-radius:12px;padding:24px;text-align:center;margin:36px 0;font-family:system-ui,sans-serif;}
    .mid-cta p{font-size:.88rem;color:var(--muted);margin-bottom:12px;}
    .mid-cta a{display:inline-block;background:var(--rose);color:var(--white);padding:11px 24px;border-radius:99px;font-weight:700;text-decoration:none;font-size:.88rem;}
    .mid-cta a:hover{background:var(--rose-dk);}
    /* MAIN CTA BOX */
    .cta-box{background:var(--gradient);color:var(--white);text-align:center;padding:40px 24px;border-radius:16px;margin:44px 0;}
    .cta-box h2{color:var(--white);margin:0 0 8px;font-size:1.5rem;font-weight:normal;}
    .cta-box p{color:rgba(255,255,255,.85);margin-bottom:20px;font-family:system-ui,sans-serif;font-size:.9rem;}
    .cta-btn{display:inline-block;background:var(--white);color:var(--rose-dk);padding:14px 32px;border-radius:99px;font-family:system-ui,sans-serif;font-weight:900;text-decoration:none;font-size:1rem;}
    /* FAQ */
    .faq{margin:36px 0;}
    .faq-item{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:20px 22px;margin-bottom:12px;}
    .faq-item strong{display:block;color:var(--ink);margin-bottom:8px;font-family:system-ui,sans-serif;font-size:.92rem;}
    .faq-item p{margin:0;font-family:system-ui,sans-serif;font-size:.88rem;color:var(--muted);}
    /* RELATED */
    .related{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:20px 22px;margin:28px 0;}
    .related h3{font-family:system-ui,sans-serif;font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:12px;}
    .related ul{list-style:none;display:flex;flex-direction:column;gap:6px;}
    .related ul a{font-family:system-ui,sans-serif;font-size:.88rem;color:var(--rose);text-decoration:none;}
    .related ul a:hover{text-decoration:underline;}
    /* FOOTER */
    footer{background:#1e1812;color:#857870;text-align:center;padding:24px;font-family:system-ui,sans-serif;font-size:.75rem;}
    footer a{color:#c8616a;text-decoration:none;}
    @media(max-width:600px){.hero{padding:36px 16px 32px;}.article{padding:32px 16px 60px;}}
  </style>
</head>
<body>

<nav class="nav">
  <a class="nav-logo" href="${BASE_URL}/">🌷 ${SITE_NAME}</a>
  <a href="${BASE_URL}/">← All Flowers</a>
</nav>

<div class="hero">
  <div class="hero-eyebrow">${occasion.emoji} ${occasion.name} · ${city} · ${TODAY}</div>
  <h1>${angle.h1(occasion,city)}</h1>
  <p class="hero-sub">Same-day delivery · Free · $0 service fees · 4.8★ from 18,742 customers</p>
  <a class="hero-btn" href="${affLink}" target="_blank" rel="nofollow sponsored">Order Now — From $29.99 🌷</a>
  <div class="trust-row">
    <span>✓ FREE DELIVERY</span>
    <span>✓ $0 SERVICE FEES</span>
    <span>✓ FRESHNESS GUARANTEED</span>
    <span>✓ LOCAL FLORISTS</span>
  </div>
</div>

<article class="article">
  <p class="byline">${SITE_NAME} &nbsp;·&nbsp; ${occasion.name} in ${city} &nbsp;·&nbsp; Published ${TODAY} &nbsp;·&nbsp; Updated daily</p>

  <p>${angle.intro(occasion,city)}</p>

  <div class="fact-box">
    <strong>🌸 Did you know?</strong>
    ${fact}
  </div>

  <h2>${angle.h2a(occasion,city)}</h2>
  <p>${angle.bodyA(occasion,city)}</p>

  <div class="mid-cta">
    <p>Ready to send ${occasion.plural} in ${city} today?</p>
    <a href="${affLink}" target="_blank" rel="nofollow sponsored">Shop ${occasion.name} in ${city} →</a>
  </div>

  <h2>${angle.h2b(occasion,city)}</h2>
  <p>${angle.bodyB(occasion,city)}</p>

  <h2>${angle.h2c(occasion,city)}</h2>
  <p>${angle.bodyC(occasion,city)}</p>

  <div class="cta-box">
    <h2>Send ${occasion.name} to ${city} Today</h2>
    <p>Same-day delivery · Free · No hidden fees · 4.8 stars from 18,742 customers</p>
    <a class="cta-btn" href="${affLink}" target="_blank" rel="nofollow sponsored">Order Now 🌷</a>
    <div class="trust-row" style="margin-top:14px;">
      <span>✓ FREE DELIVERY</span><span>✓ $0 FEES</span><span>✓ FRESHNESS GUARANTEED</span>
    </div>
  </div>

  <div class="faq">
    <div class="faq-item">
      <strong>Q: ${angle.faqQ(occasion,city)}</strong>
      <p>${angle.faqA(occasion,city)}</p>
    </div>
    <div class="faq-item">
      <strong>Q: ${angle.faqQ2(occasion,city)}</strong>
      <p>${angle.faqA2(occasion,city)}</p>
    </div>
  </div>

  <div class="related">
    <h3>More flowers for ${city}</h3>
    <ul>
      ${relatedHTML}
    </ul>
  </div>

</article>

<footer>
  This page contains affiliate links. We may earn a commission at no extra cost to you. &nbsp;·&nbsp;
  <a href="${BASE_URL}/">← ${SITE_NAME} Home</a> &nbsp;·&nbsp;
  © ${YEAR} ${SITE_NAME} &nbsp;·&nbsp; Affiliate ID 2013017799
</footer>

</body>
</html>`;

// ══════════════════════════════════════════════════════════
//  WRITE FILE
// ══════════════════════════════════════════════════════════
fs.writeFileSync(filename, html);

// ══════════════════════════════════════════════════════════
//  SITEMAP UPDATE
// ══════════════════════════════════════════════════════════
const sitemapEntry = `  <url>
    <loc>${canonical}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.7</priority>
  </url>`;

if (fs.existsSync("sitemap.xml")) {
  let sm = fs.readFileSync("sitemap.xml", "utf8");
  if (!sm.includes(filename)) {
    sm = sm.replace("</urlset>", `${sitemapEntry}\n</urlset>`);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("Sitemap updated ✓");
  } else {
    console.log("Sitemap: entry already exists, skipped.");
  }
} else {
  // Create sitemap from scratch
  const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${sitemapEntry}
</urlset>`;
  fs.writeFileSync("sitemap.xml", sm);
  console.log("Sitemap created ✓");
}

// ══════════════════════════════════════════════════════════
//  CONSOLE SUMMARY
// ══════════════════════════════════════════════════════════
console.log(`
✅ Generated: ${filename}
📍 City:      ${city}
💐 Occasion:  ${occasion.name}
📐 Angle:     ${angle.label}
🔗 Aff Link:  ${affLink}
📰 Title:     ${angle.title(occasion,city)}
🗂️  Sitemap:   sitemap.xml

Pool sizes:
  Cities:    ${cities.length}
  Occasions: ${occasions.length}
  Angles:    ${angles.length}
  Facts:     ${facts.length}
  Combos:    ${(cities.length * occasions.length * angles.length).toLocaleString()}+ unique posts
`);
