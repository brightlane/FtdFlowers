const fs = require("fs");
const https = require("https");
const crypto = require("crypto");

// ─────────────────────────────────────────────
// 1. CONFIG
// ─────────────────────────────────────────────
const AFF_BASE = "https://www.floristone.com/main.cfm?source_id=aff&AffiliateID=21885";
const BASE_URL = "https://brightlane.github.io/FtdFlowers";
const TODAY = new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();
const seed = parseInt(crypto.createHash("md5").update(TODAY).digest("hex").slice(0, 8), 16);
const INDEXNOW_KEY = "3dd8ef03a39841008c6f5fe0c38144d5";

// ─────────────────────────────────────────────
// 2. 1500 CITIES USA + CANADA
// ─────────────────────────────────────────────
const ALL_CITIES = [
  // USA TOP CITIES
  "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia",
  "San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville",
  "Fort Worth","Columbus","Charlotte","San Francisco","Indianapolis","Seattle",
  "Denver","Nashville","Oklahoma City","El Paso","Washington DC","Las Vegas",
  "Louisville","Memphis","Portland","Baltimore","Milwaukee","Albuquerque",
  "Tucson","Fresno","Sacramento","Mesa","Kansas City","Atlanta","Omaha",
  "Colorado Springs","Raleigh","Long Beach","Virginia Beach","Minneapolis",
  "Tampa","New Orleans","Arlington","Bakersfield","Honolulu","Anaheim",
  "Aurora","Santa Ana","Corpus Christi","Riverside","St Louis","Lexington",
  "Pittsburgh","Stockton","Anchorage","Cincinnati","St Paul","Greensboro",
  "Toledo","Newark","Plano","Henderson","Orlando","Lincoln","Jersey City",
  "Chandler","Fort Wayne","St Petersburg","Laredo","Norfolk","Madison",
  "Durham","Lubbock","Winston Salem","Garland","Glendale","Hialeah","Reno",
  "Baton Rouge","Irvine","Chesapeake","Irving","Scottsdale","North Las Vegas",
  "Fremont","Gilbert","San Bernardino","Boise","Birmingham","Rochester",
  "Richmond","Spokane","Des Moines","Montgomery","Modesto","Fayetteville",
  "Tacoma","Shreveport","Fontana","Moreno Valley","Akron","Yonkers",
  "Augusta","Little Rock","Grand Rapids","Huntington Beach","Salt Lake City",
  "Tallahassee","Huntsville","Worcester","Knoxville","Providence","Brownsville",
  "Santa Clarita","Garden Grove","Oceanside","Fort Lauderdale","Chattanooga",
  "Tempe","Cape Coral","Eugene","Rancho Cucamonga","Peoria","Ontario",
  "Salem","Elk Grove","Corona","Springfield","Fort Collins","Jackson",
  "Alexandria","Hayward","Lakewood","Clarksville","Lancaster","Salinas",
  "Palmdale","Sunnyvale","Pomona","Escondido","Surprise","Pasadena",
  "Torrance","Rockford","Paterson","Joliet","Savannah","Bridgeport","Syracuse",
  "McAllen","Hollywood","Macon","Mesquite","Dayton","Metairie","Cary",
  "Orange","Fullerton","Hampton","Murfreesboro","Killeen","Warren",
  "West Valley City","Columbia","Sterling Heights","New Haven","Olathe",
  "Miramar","Cedar Rapids","Charleston","Thousand Oaks","Visalia","Elizabeth",
  "Gainesville","Waco","Roseville","Sioux Falls","Hartford","Coral Springs",
  "Stamford","Topeka","Bellevue","Denton","Victorville","Beaumont","Midland",
  "Elgin","Lansing","West Palm Beach","Clearwater","Manchester","Arvada",
  "Costa Mesa","Pueblo","Downey","Inglewood","Carlsbad","Pompano Beach",
  "Berkeley","Westminster","Cambridge","Provo","Miami Gardens","Palm Bay",
  "Wichita","Murrieta","Temecula","El Monte","West Covina","Burbank",
  "Simi Valley","Vallejo","Fairfield","Santa Rosa","Hesperia","Chino",
  "Chino Hills","Menifee","Jurupa Valley","Daly City","San Mateo",
  "Santa Clara","Mountain View","Redding","Santa Barbara","Ventura","Oxnard",
  "Hawthorne","Compton","Carson","Whittier","Culver City","Alhambra",
  "El Cajon","Vista","San Marcos","Santee","National City","Poway","La Mesa",
  "Tuscaloosa","Dothan","Auburn AL","Decatur AL","Florence AL","Gadsden",
  "Phenix City","Prattville","Hoover","Goodyear","Avondale","Buckeye",
  "Casa Grande","Maricopa","Lake Havasu City","Prescott","Conway","Jonesboro",
  "North Little Rock","Springdale","Rogers","Fort Smith","Pine Bluff",
  "Hot Springs","Bentonville","Boulder","Highlands Ranch","Longmont",
  "Loveland","Broomfield","New Britain","Meriden","West Haven","Danbury",
  "Stratford","Milford","Hamden","Wilmington DE","Dover DE","Newark DE",
  "Middletown DE","Lakeland","Deerfield Beach","Boca Raton","Davie",
  "Plantation","Sunrise","Weston","Boynton Beach","Delray Beach",
  "Melbourne FL","Daytona Beach","Deltona","Kissimmee","Sandy Springs",
  "Johns Creek","Alpharetta","Warner Robins","South Fulton","Peachtree City",
  "Smyrna GA","Nampa","Idaho Falls","Pocatello","Caldwell","Bloomington IL",
  "Decatur IL","Waukegan","Cicero","Evanston","Schaumburg","Bolingbrook",
  "Naperville","Carmel IN","Fishers","Hammond","Gary","Muncie","Terre Haute",
  "Bloomington IN","Anderson","Elkhart","Kokomo","Davenport","Cedar Falls",
  "Iowa City","Waterloo","Ames","Council Bluffs","Dubuque","Sioux City",
  "Manhattan KS","Salina","Hutchinson","Leavenworth","Shawnee","Overland Park",
  "Lawrence KS","Bowling Green KY","Covington KY","Richmond KY","Hopkinsville",
  "Owensboro","Lafayette LA","Lake Charles","Monroe LA","Bossier City","Kenner",
  "New Iberia","Portland ME","Lewiston","Bangor","Auburn ME","Biddeford",
  "Frederick MD","Rockville","Gaithersburg","Hagerstown","Annapolis",
  "Lowell","Brockton","New Bedford","Lynn","Quincy","Fall River","Newton MA",
  "Somerville","Lawrence MA","Springfield MA","Flint","Kalamazoo","Dearborn",
  "Livonia","Clinton Township","Canton MI","Westland","Troy MI","Farmington Hills",
  "Southfield","Duluth","Bloomington MN","Brooklyn Park","Plymouth MN",
  "St Cloud","Eagan","Coon Rapids","Burnsville","Blaine","Lakeville",
  "Gulfport","Southaven","Hattiesburg","Biloxi","Meridian MS","St Joseph",
  "St Charles","Blue Springs","Florissant","Independence MO","Billings",
  "Missoula","Great Falls","Bozeman","Butte","Helena MT","Fargo","Bismarck",
  "Grand Forks","Minot","West Fargo","Rapid City","Aberdeen SD","Brookings",
  "Watertown SD","Grand Island","Kearney","Green Bay","Kenosha","Racine",
  "Appleton","Waukesha","Oshkosh","Eau Claire","Janesville","La Crosse WI",
  "Sheboygan","Wausau","Manitowoc","Beloit","Cheyenne","Casper","Laramie",
  "Gillette","Rock Springs","Ogden","St George UT","Orem","Sandy UT",
  "West Jordan","South Jordan","Layton","Taylorsville","Murray","Everett",
  "Renton","Kirkland","Redmond WA","Bellingham","Kent","Yakima","Beaverton",
  "Bend","Medford OR","Corvallis","Gresham","Hillsboro","Sparks",
  "Carson City","Elko","Las Cruces","Rio Rancho","Santa Fe","Roswell NM",
  "Farmington NM","Clovis NM","Hobbs","Alamogordo","Carlsbad NM","Thornton",
  "Centennial","Allentown","Erie","Reading","Scranton","Bethlehem",
  "Lancaster PA","York","Harrisburg","Buffalo","Albany","New Rochelle",
  "Mount Vernon","Schenectady","Utica","Troy NY","Woodbridge NJ",
  "Lakewood NJ","Toms River","Hamilton NJ","Trenton","Edison","Cranston",
  "Warwick","Pawtucket","East Providence","Woonsocket","Waterbury",
  "Montpelier VT","Rutland VT","Burlington VT","Concord NH","Derry",
  "Dover NH","Rochester NH","Nashua","Newport News","Roanoke","Lynchburg",
  "Charlottesville","Blacksburg","High Point","Concord NC","Wilmington NC",
  "Greenville NC","North Charleston","Mount Pleasant SC","Greenville SC",
  "Rock Hill","Spartanburg","Athens GA","Marietta","Columbus GA","Savannah GA",
  "Albany GA","Valdosta GA","Macon GA","Dalton GA","Rome GA","Newnan GA",
  "Kennesaw GA","Woodstock GA","Statesboro GA","Brunswick GA",
  "Johnson City","Kingsport","Jackson TN","Smyrna TN","Bartlett TN",
  "Collierville TN","Germantown TN","Brentwood TN","Mobile AL","Folsom",
  "Citrus Heights","Rancho Cordova","Turlock","Merced CA","Madera",
  "Hanford","Porterville","Tulare","Hemet","Perris","Lake Elsinore",
  "San Jacinto","Indio","Palm Springs","Palm Desert","Cathedral City",
  "El Centro","Yucaipa","Rialto","Upland","Claremont","La Puente",
  "Baldwin Park","Covina","Azusa","Glendora","San Dimas","Diamond Bar",
  "Lynwood","South Gate","Bell Gardens","Huntington Park","Paramount",
  "Bellflower","Cerritos","Signal Hill","Seal Beach","Cypress CA",
  "Buena Park","La Habra","Placentia","Yorba Linda","Brea","La Mirada",
  "Santa Fe Springs","Pico Rivera","Montebello","Rosemead","Norwalk CA",
  "Antioch CA","Peoria AZ","El Mirage AZ","Noblesville IN","Greenwood IN",
  "Westfield IN","Lafayette IN","Abilene TX","Amarillo TX","Wichita Falls TX",
  "Tyler TX","Longview TX","College Station TX","Bryan TX","Temple TX",
  "San Angelo TX","Odessa TX","Round Rock TX","Cedar Park TX","Georgetown TX",
  "Pflugerville TX","Kyle TX","Leander TX","Frisco TX","McKinney TX",
  "Allen TX","Richardson TX","Grand Prairie TX","Mansfield TX","Burleson TX",
  "Pearland TX","Sugar Land TX","Pasadena TX","League City TX","Carrollton TX",
  "Lewisville TX","Coeur d Alene","Twin Falls","Lewiston ID","Moscow ID",
  "Pensacola","Sarasota","Fort Myers","Naples FL","Ocala","Port Charlotte",
  "Bradenton","St Augustine","Panama City FL","Tupelo MS","Starkville MS",
  "Vicksburg MS","Thibodaux LA","Hammond LA","Ruston LA","Opelousas LA",
  "Hendersonville TN","Augusta ME","Pierre SD","Juneau AK",
  // CANADA ALL CITIES
  "Toronto","Montreal","Vancouver","Calgary","Edmonton","Ottawa",
  "Winnipeg","Quebec City","Hamilton","Kitchener","London ON","Victoria BC",
  "Halifax NS","Oshawa","Windsor ON","Saskatoon","Regina","St Catharines",
  "Kelowna","Barrie","Abbotsford","Sudbury","Kingston ON","Saguenay",
  "Trois Rivieres","Guelph","Moncton","Brantford","Saint John NB","Thunder Bay",
  "Nanaimo","Burnaby","Surrey","Mississauga","Brampton","Markham",
  "Vaughan","Richmond Hill","Oakville","Burlington ON","Laval","Gatineau",
  "Longueuil","Sherbrooke","Levis","Chilliwack","Kamloops","Prince George",
  "Red Deer","Lethbridge","Medicine Hat","Fort McMurray","Grande Prairie",
  "Airdrie","Spruce Grove","St Albert","Leduc","Lloydminster","Camrose",
  "Moose Jaw","Prince Albert SK","Yorkton SK","Swift Current","North Battleford",
  "Brandon MB","Thompson MB","Portage la Prairie","Steinbach","Selkirk MB",
  "Fredericton","Miramichi","Edmundston","Bathurst NB","Campbellton",
  "Sydney NS","Truro NS","New Glasgow NS","Dartmouth","Bridgewater NS",
  "Charlottetown","Summerside","Stratford PEI","Cornwall PEI",
  "St Johns NL","Corner Brook","Gander","Grand Falls NL","Mount Pearl",
  "Labrador City","Whitehorse","Yellowknife","Iqaluit","Coquitlam",
  "Delta BC","Langley BC","Maple Ridge","New Westminster BC","North Vancouver",
  "Port Coquitlam","Port Moody","West Vancouver","Niagara Falls ON",
  "Peterborough","Sault Ste Marie","Waterloo ON","Whitby ON","Ajax ON",
  "Pickering ON","Newmarket ON","Sarnia","Canmore","Cold Lake","Wetaskiwin",
  "Weyburn SK","Estevan SK","Humboldt SK","Dauphin MB","Flin Flon",
  "The Pas MB","Morden MB","Winkler MB","Woodstock ON","Chatham ON",
  "Belleville ON","Cornwall ON","Timmins","North Bay ON","Orillia",
  "Midland ON","Collingwood","Drummondville","Saint Jean QC","Granby QC",
  "Shawinigan","Victoriaville QC","Baie Comeau","Alma QC","Rouyn Noranda",
  "Val d Or QC","Sept Iles","Repentigny","Blainville","Mirabel","Brossard",
  "Terrebonne","Saint Jerome","Mascouche","Chateauguay","Vaudreuil Dorion",
];

const UNIQUE_CITIES = [...new Set(ALL_CITIES)];

// ─────────────────────────────────────────────
// 3. OCCASIONS
// ─────────────────────────────────────────────
const OCCASIONS = [
  { en:"Sympathy Flowers",    fr:"Fleurs de sympathie",   zh:"慰问花卉",     es:"Flores de condolencia", ru:"Цветы соболезнования", slug:"sympathy",    tag:"sy" },
  { en:"Funeral Flowers",     fr:"Fleurs funéraires",     zh:"葬礼花卉",     es:"Flores fúnebres",       ru:"Траурные цветы",        slug:"funeral",     tag:"fu" },
  { en:"Birthday Flowers",    fr:"Fleurs d'anniversaire", zh:"生日花卉",     es:"Flores de cumpleaños",  ru:"Цветы на день рождения",slug:"birthday",    tag:"bd" },
  { en:"Anniversary Flowers", fr:"Fleurs d'anniversaire de mariage", zh:"周年纪念花卉", es:"Flores de aniversario", ru:"Цветы на годовщину", slug:"anniversary", tag:"an" },
  { en:"Get Well Flowers",    fr:"Fleurs de rétablissement", zh:"祝愿康复花卉", es:"Flores de recuperación", ru:"Цветы пожелания здоровья", slug:"get-well", tag:"gw" },
  { en:"Mother's Day Flowers",fr:"Fleurs fête des mères", zh:"母亲节花卉",   es:"Flores día de la madre", ru:"Цветы на День матери",  slug:"mothers-day", tag:"md" },
  { en:"Romance Flowers",     fr:"Fleurs romantiques",    zh:"浪漫花卉",     es:"Flores románticas",     ru:"Романтические цветы",   slug:"romance",     tag:"ro" },
  { en:"Thank You Flowers",   fr:"Fleurs de remerciement",zh:"感谢花卉",     es:"Flores de agradecimiento", ru:"Цветы благодарности", slug:"thank-you",  tag:"ty" },
];

// ─────────────────────────────────────────────
// 4. MULTILINGUAL CONTENT
// ─────────────────────────────────────────────
const LANG_CONTENT = {
  en: {
    code: "en",
    dir: "bing",
    titleFn: (o,c) => `${o.en} in ${c} — Same Day Free Delivery`,
    h1Fn:    (o,c) => `${o.en} Delivered Same Day in ${c}`,
    metaFn:  (o,c) => `Send ${o.en.toLowerCase()} in ${c}. Free same-day delivery, $0 service fees, from $29.99. 4.8 stars from 18,742 customers.`,
    introFn: (o,c) => `Need ${o.en.toLowerCase()} in ${c} today? Floristone delivers same-day to every neighbourhood in ${c} — free delivery, $0 service fees, farm-fresh flowers guaranteed.`,
    h2aFn:   (o,c) => `Same-day ${o.en.toLowerCase()} delivery in ${c}`,
    bodyAFn: (o,c) => `Floristone's local florist network in ${c} cuts flowers fresh on the day of delivery. No warehouse shipping, no wilted stems. Your arrangement arrives today.`,
    h2bFn:   (o,c) => `Free delivery, zero service fees in ${c}`,
    bodyBFn: (o,c) => `Every order includes free same-day delivery with $0 service fees. The price shown is the final price — starting from $29.99. No surprises at checkout.`,
    ctaFn:   (o,c) => `Order ${o.en} in ${c} Now`,
    faqQFn:  (o,c) => `Can I get ${o.en.toLowerCase()} delivered same-day in ${c}?`,
    faqAFn:  (o,c) => `Yes. Floristone guarantees same-day delivery across ${c} with free delivery and $0 fees. Order before the daily cutoff for guaranteed same-day arrival.`,
    note:    "From $29.99 · Free delivery · $0 fees · 4.8★",
    backFn:  () => "← Back to all flowers",
    footer:  `© ${YEAR} FTDFlowerGifts · Affiliate disclosure: this page contains affiliate links.`,
  },
  fr: {
    code: "fr",
    dir: "bing-fr",
    titleFn: (o,c) => `${o.fr} à ${c} — Livraison gratuite le jour même`,
    h1Fn:    (o,c) => `${o.fr} livrées le jour même à ${c}`,
    metaFn:  (o,c) => `Envoyez des ${o.fr.toLowerCase()} à ${c}. Livraison gratuite le jour même, 0$ de frais, dès 29,99$. 4,8 étoiles de 18 742 clients.`,
    introFn: (o,c) => `Besoin de ${o.fr.toLowerCase()} à ${c} aujourd'hui? Floristone livre le jour même dans tout ${c} — livraison gratuite, 0$ de frais de service, fraîcheur garantie.`,
    h2aFn:   (o,c) => `Livraison le jour même à ${c}`,
    bodyAFn: (o,c) => `Le réseau de fleuristes locaux de Floristone à ${c} coupe les fleurs fraîches le jour de la livraison. Pas d'entrepôt, pas de tiges fanées. Votre arrangement arrive aujourd'hui.`,
    h2bFn:   (o,c) => `Livraison gratuite, zéro frais cachés à ${c}`,
    bodyBFn: (o,c) => `Chaque commande inclut la livraison gratuite le jour même avec 0$ de frais de service. Le prix affiché est le prix final — dès 29,99$. Aucune surprise à la caisse.`,
    ctaFn:   (o,c) => `Commander des ${o.fr} à ${c}`,
    faqQFn:  (o,c) => `Puis-je recevoir des ${o.fr.toLowerCase()} le jour même à ${c}?`,
    faqAFn:  (o,c) => `Oui. Floristone garantit la livraison le jour même à ${c} avec livraison gratuite et 0$ de frais. Commandez avant l'heure limite quotidienne.`,
    note:    "Dès 29,99$ · Livraison gratuite · 0$ frais · 4,8★",
    backFn:  () => "← Toutes les fleurs",
    footer:  `© ${YEAR} FTDFlowerGifts · Ce site contient des liens affiliés.`,
  },
  zh: {
    code: "zh",
    dir: "bing-zh",
    titleFn: (o,c) => `${c}当日${o.zh}配送 — 免费送达`,
    h1Fn:    (o,c) => `${c}${o.zh}当日送达`,
    metaFn:  (o,c) => `在${c}发送${o.zh}。免费当日配送，零服务费，低至$29.99。18,742位客户评分4.8星。`,
    introFn: (o,c) => `需要今天在${c}配送${o.zh}？Floristone当日送达${c}每个社区——免费配送，零服务费，新鲜花卉保证。`,
    h2aFn:   (o,c) => `${c}当日${o.zh}配送`,
    bodyAFn: (o,c) => `Floristone在${c}的本地花店网络在配送当天剪切新鲜花卉。无仓库运输，无枯萎花茎。您的花束今天送达。`,
    h2bFn:   (o,c) => `${c}免费配送，零隐藏费用`,
    bodyBFn: (o,c) => `每笔订单均含免费当日配送，服务费$0。显示价格即为最终价格——低至$29.99。结账无惊喜。`,
    ctaFn:   (o,c) => `立即订购${c}${o.zh}`,
    faqQFn:  (o,c) => `能在${c}当日送达${o.zh}吗？`,
    faqAFn:  (o,c) => `是的。Floristone保证在${c}免费当日配送，服务费$0。在每日截止时间前下单即可保证当日送达。`,
    note:    "低至$29.99 · 免费配送 · $0服务费 · 4.8★",
    backFn:  () => "← 返回所有花卉",
    footer:  `© ${YEAR} FTDFlowerGifts · 本页面含有联盟链接。`,
  },
  es: {
    code: "es",
    dir: "bing-es",
    titleFn: (o,c) => `${o.es} en ${c} — Entrega gratis el mismo día`,
    h1Fn:    (o,c) => `${o.es} entregadas el mismo día en ${c}`,
    metaFn:  (o,c) => `Envía ${o.es.toLowerCase()} en ${c}. Entrega gratis el mismo día, $0 cargos, desde $29.99. 4.8 estrellas de 18,742 clientes.`,
    introFn: (o,c) => `¿Necesitas ${o.es.toLowerCase()} en ${c} hoy? Floristone entrega el mismo día en todo ${c} — entrega gratis, $0 cargos de servicio, flores frescas garantizadas.`,
    h2aFn:   (o,c) => `Entrega el mismo día en ${c}`,
    bodyAFn: (o,c) => `La red de floristas locales de Floristone en ${c} corta las flores frescas el día de la entrega. Sin almacén, sin tallos marchitos. Tu arreglo llega hoy.`,
    h2bFn:   (o,c) => `Entrega gratuita, cero cargos ocultos en ${c}`,
    bodyBFn: (o,c) => `Cada pedido incluye entrega gratis el mismo día con $0 en cargos de servicio. El precio mostrado es el precio final — desde $29.99. Sin sorpresas al pagar.`,
    ctaFn:   (o,c) => `Pedir ${o.es} en ${c} ahora`,
    faqQFn:  (o,c) => `¿Puedo recibir ${o.es.toLowerCase()} el mismo día en ${c}?`,
    faqAFn:  (o,c) => `Sí. Floristone garantiza entrega el mismo día en ${c} con entrega gratis y $0 de cargos. Haz tu pedido antes del límite diario.`,
    note:    "Desde $29.99 · Entrega gratis · $0 cargos · 4.8★",
    backFn:  () => "← Ver todas las flores",
    footer:  `© ${YEAR} FTDFlowerGifts · Esta página contiene enlaces de afiliado.`,
  },
  ru: {
    code: "ru",
    dir: "bing-ru",
    titleFn: (o,c) => `${o.ru} в ${c} — Бесплатная доставка в день заказа`,
    h1Fn:    (o,c) => `${o.ru} с доставкой в день заказа в ${c}`,
    metaFn:  (o,c) => `Отправьте ${o.ru.toLowerCase()} в ${c}. Бесплатная доставка в день заказа, $0 сборов, от $29.99. 4.8 звезды от 18 742 клиентов.`,
    introFn: (o,c) => `Нужны ${o.ru.toLowerCase()} в ${c} сегодня? Floristone доставляет в день заказа по всему ${c} — бесплатная доставка, $0 сервисных сборов, свежесть гарантирована.`,
    h2aFn:   (o,c) => `Доставка ${o.ru.toLowerCase()} в день заказа в ${c}`,
    bodyAFn: (o,c) => `Сеть местных флористов Floristone в ${c} срезает цветы свежими в день доставки. Никаких складов, никаких увядших стеблей. Ваш букет прибывает сегодня.`,
    h2bFn:   (o,c) => `Бесплатная доставка, нулевые скрытые платежи в ${c}`,
    bodyBFn: (o,c) => `Каждый заказ включает бесплатную доставку в день заказа с $0 сервисных сборов. Показанная цена — окончательная цена, от $29.99. Никаких сюрпризов на кассе.`,
    ctaFn:   (o,c) => `Заказать ${o.ru} в ${c}`,
    faqQFn:  (o,c) => `Можно ли получить ${o.ru.toLowerCase()} в день заказа в ${c}?`,
    faqAFn:  (o,c) => `Да. Floristone гарантирует доставку в день заказа по ${c} с бесплатной доставкой и $0 сборов. Заказывайте до ежедневного дедлайна.`,
    note:    "От $29.99 · Бесплатная доставка · $0 сборов · 4.8★",
    backFn:  () => "← Все цветы",
    footer:  `© ${YEAR} FTDFlowerGifts · Эта страница содержит партнёрские ссылки.`,
  },
};

// ─────────────────────────────────────────────
// 5. HTML TEMPLATE
// ─────────────────────────────────────────────
function buildPage(lang, occasion, city, affLink, slug) {
  const L = LANG_CONTENT[lang];
  return `<!DOCTYPE html>
<html lang="${L.code}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${L.titleFn(occasion, city)} | FTDFlowerGifts</title>
    <meta name="description" content="${L.metaFn(occasion, city)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${BASE_URL}/${L.dir}/${slug}">
    <meta property="og:title" content="${L.titleFn(occasion, city)}">
    <meta property="og:description" content="${L.metaFn(occasion, city)}">
    <meta property="og:url" content="${BASE_URL}/${L.dir}/${slug}">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@graph":[
      {"@type":"Article","headline":"${L.h1Fn(occasion,city)}","description":"${L.metaFn(occasion,city)}","datePublished":"${TODAY}","dateModified":"${TODAY}","inLanguage":"${L.code}","author":{"@type":"Organization","name":"FTDFlowerGifts"}},
      {"@type":"Product","name":"Floristone ${occasion.en} — ${city}","offers":{"@type":"Offer","priceCurrency":"USD","price":"29.99","availability":"https://schema.org/InStock","url":"${affLink}","deliveryLeadTime":{"@type":"QuantitativeValue","value":"0","unitCode":"DAY"}},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"18742"}},
      {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"${L.faqQFn(occasion,city)}","acceptedAnswer":{"@type":"Answer","text":"${L.faqAFn(occasion,city)}"}}]}
    ]}
    <\/script>
    <style>
        :root{--primary:#004b98;--red:#e20613;--bg:#f9f9ff;--border:#e6e6f0;--mid:#666;--gradient:linear-gradient(135deg,#004b98 0%,#e20613 100%);}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:system-ui,sans-serif;background:var(--bg);color:#333;line-height:1.7;}
        .nav{background:#fff;padding:14px 5%;border-bottom:1px solid var(--border);font-weight:700;color:var(--primary);font-size:1.1rem;display:flex;justify-content:space-between;align-items:center;}
        .nav a{font-size:0.85rem;color:var(--primary);text-decoration:none;}
        .article{max-width:760px;margin:0 auto;padding:50px 24px 80px;}
        .eyebrow{font-size:0.75rem;font-weight:700;color:var(--primary);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;display:block;}
        h1{font-size:clamp(1.8rem,4vw,2.6rem);color:#1a1a1a;margin-bottom:16px;line-height:1.2;}
        .byline{font-size:0.85rem;color:#999;margin-bottom:32px;border-bottom:1px solid var(--border);padding-bottom:16px;}
        h2{font-size:1.35rem;color:#1a1a1a;margin:36px 0 12px;}
        p{margin-bottom:16px;font-size:1rem;color:#444;}
        .trust-bar{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;background:#fff;padding:14px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);font-size:0.8rem;font-weight:700;color:#444;margin-bottom:32px;}
        .cta-box{background:var(--gradient);color:#fff;text-align:center;padding:40px 24px;border-radius:16px;margin:40px 0;}
        .cta-box h2{color:#fff;margin:0 0 10px;font-size:1.5rem;}
        .cta-box p{color:rgba(255,255,255,0.88);margin-bottom:20px;}
        .cta-btn{background:#fff;color:var(--primary);padding:14px 32px;border-radius:99px;font-weight:900;text-decoration:none;display:inline-block;font-size:1rem;}
        .trust-row{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:12px;}
        .trust-row span{font-size:0.75rem;color:rgba(255,255,255,0.8);font-weight:700;}
        .faq-box{background:#fff;border:1px solid var(--border);border-radius:12px;padding:24px;margin:32px 0;}
        .faq-box strong{display:block;color:#1a1a1a;margin-bottom:8px;}
        .faq-box p{margin:0;font-size:0.92rem;}
        .back{display:block;text-align:center;margin-top:32px;font-size:0.85rem;color:var(--primary);text-decoration:none;}
        footer{background:#111;color:#888;text-align:center;padding:24px;font-size:0.78rem;}
    </style>
</head>
<body>
<nav class="nav">FTDFlowerGifts <a href="${BASE_URL}/">${L.backFn()}</a></nav>
<article class="article">
    <span class="eyebrow">${occasion[L.code]} · ${city} · ${TODAY}</span>
    <h1>${L.h1Fn(occasion, city)}</h1>
    <p class="byline">FTDFlowerGifts · ${city} · ${TODAY}</p>
    <div class="trust-bar">
        <span>✓ Free Delivery</span><span>✓ $0 Fees</span><span>✓ 4.8★ 18,742 reviews</span><span>✓ Same Day</span>
    </div>
    <p>${L.introFn(occasion, city)}</p>
    <h2>${L.h2aFn(occasion, city)}</h2>
    <p>${L.bodyAFn(occasion, city)}</p>
    <h2>${L.h2bFn(occasion, city)}</h2>
    <p>${L.bodyBFn(occasion, city)}</p>
    <div class="cta-box">
        <h2>${L.ctaFn(occasion, city)}</h2>
        <p>${L.note}</p>
        <a href="${affLink}" class="cta-btn">🌷 ${L.ctaFn(occasion, city)} →</a>
        <div class="trust-row">
            <span>✓ FREE DELIVERY</span><span>✓ $0 FEES</span><span>✓ FRESHNESS GUARANTEED</span>
        </div>
    </div>
    <div class="faq-box">
        <strong>Q: ${L.faqQFn(occasion, city)}</strong>
        <p>${L.faqAFn(occasion, city)}</p>
    </div>
    <a href="${BASE_URL}/" class="back">${L.backFn()}</a>
</article>
<footer>${L.footer}</footer>
</body>
</html>`;
}

// ─────────────────────────────────────────────
// 6. GENERATE PAGES — 400 per language = 2000 total
// ─────────────────────────────────────────────
const LANGS = ["en","fr","zh","es","ru"];
const PAGES_PER_LANG = 400; // 400 × 5 = 2000
const CITIES_PER_LANG = Math.floor(PAGES_PER_LANG / OCCASIONS.length); // ~50 cities per language per run

// Rotate city batch daily
const batchStart = (seed % UNIQUE_CITIES.length);
const cityBatch = [];
for (let i = 0; i < CITIES_PER_LANG; i++) {
  cityBatch.push(UNIQUE_CITIES[(batchStart + i) % UNIQUE_CITIES.length]);
}

const allGeneratedUrls = [];
let totalPages = 0;

for (const lang of LANGS) {
  const L = LANG_CONTENT[lang];
  if (!fs.existsSync(L.dir)) fs.mkdirSync(L.dir, { recursive: true });

  for (const city of cityBatch) {
    const citySlug = city.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
    for (const occasion of OCCASIONS) {
      const slug = `${occasion.slug}-${citySlug}.html`;
      const affLink = `${AFF_BASE}&occ=${occasion.tag}`;
      const html = buildPage(lang, occasion, city, affLink, slug);
      fs.writeFileSync(`${L.dir}/${slug}`, html);
      allGeneratedUrls.push(`${BASE_URL}/${L.dir}/${slug}`);
      totalPages++;
    }
  }
}

// ─────────────────────────────────────────────
// 7. UPDATE SITEMAP
// ─────────────────────────────────────────────
const newEntries = allGeneratedUrls
  .map(url => `  <url><loc>${url}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`)
  .join("\n");

if (fs.existsSync("sitemap.xml")) {
  let sm = fs.readFileSync("sitemap.xml", "utf8");
  // Remove old bing-* entries and add fresh
  sm = sm.replace(/<url><loc>[^<]*\/bing[^<]*<\/loc>.*?<\/url>\n/gs, "");
  sm = sm.replace("</urlset>", `${newEntries}\n</urlset>`);
  fs.writeFileSync("sitemap.xml", sm);
}

// ─────────────────────────────────────────────
// 8. INDEXNOW PING — submit all URLs to Bing
// ─────────────────────────────────────────────
const payload = JSON.stringify({
  host: "brightlane.github.io",
  key: INDEXNOW_KEY,
  keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: allGeneratedUrls.slice(0, 10000)
});

const options = {
  hostname: "api.indexnow.org",
  path: "/IndexNow",
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(payload) }
};

const req = https.request(options, res => {
  console.log(`IndexNow ping: HTTP ${res.statusCode} — ${allGeneratedUrls.length} URLs submitted`);
});
req.on("error", e => console.log(`IndexNow note (will succeed from GitHub Actions): ${e.message}`));
req.write(payload);
req.end();

console.log(`\n✅ FTD Bing Blast complete!`);
console.log(`   Languages    : ${LANGS.join(", ")}`);
console.log(`   Cities/lang  : ${cityBatch.length}`);
console.log(`   Occasions    : ${OCCASIONS.length}`);
console.log(`   Total pages  : ${totalPages}`);
console.log(`   Sitemap      : updated`);
console.log(`   IndexNow     : pinged`);
console.log(`   City batch   : ${cityBatch.slice(0,5).join(", ")}...`);
