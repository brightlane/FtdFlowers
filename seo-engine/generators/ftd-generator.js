module.exports = function () {

  const DOMAIN = "https://brightlane.github.io/FtdFlowers";

  const cities = [
    "new-york", "los-angeles", "chicago", "houston", "toronto",
    "miami", "vancouver", "boston", "seattle", "phoenix"
  ];

  const occasions = [
    "mothers-day", "birthday", "anniversary", "sympathy", "get-well"
  ];

  const pages = [];

  for (const city of cities) {
    for (const occ of occasions) {

      const slug = `ftd-${city}-${occ}`;

      const url = `${DOMAIN}/output/ftd/${slug}.html`;

      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flower Delivery in ${city.replace("-", " ")} | ${occ}</title>
  <meta name="description" content="Send ${occ} flowers in ${city.replace("-", " ")} with same-day delivery via local florists.">
</head>
<body style="font-family: Arial; background:#0b0f19; color:white; text-align:center; padding:50px;">

  <h1>🌸 ${occ.toUpperCase()} Flowers in ${city.replace("-", " ")}</h1>

  <p>
    Order fresh ${occ} flowers online in ${city.replace("-", " ")}.
    Hand-delivered by local florists with same-day service available.
  </p>

  <a href="https://www.floristone.com/index.cfm?AffiliateID=2013017799&occ=md"
     style="display:inline-block; margin-top:20px; padding:15px 30px; background:#ff4757; color:white; text-decoration:none; border-radius:8px;">
     Order Flowers Now
  </a>

  <hr style="margin:40px 0; opacity:0.2;" />

  <small>
    Powered by FloristOne Affiliate Network (2013017799)
  </small>

</body>
</html>
      `;

      pages.push({
        slug,
        folder: "ftd",
        url,
        html
      });
    }
  }

  return {
    type: "ftd",
    pages
  };
};
