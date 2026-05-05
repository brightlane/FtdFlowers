// inject-ftd-locally.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BASE_URL = "https://brightlane.github.io/FtdFlowers/";
const SITEMAP_PATH = path.join(__dirname, "output", "sitemap.txt");
const OUTPUT_DIR = path.join(__dirname, "output", "ftd-pages");
const FTD_DIR = path.join(__dirname, "FtdFlowers");

const AFFILIATE_URL = "https://www.floristone.com/index.cfm?source_id=aff&AffiliateID=2013017799";

// 1. Create output/ftd-pages
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 2. Generate 5K‑style FTD HTML for a slug
function generateFtdHtml(slug) {
  const cityRegex = /new-york|los-angeles|toronto|chicago|phoenix|philadelphia|dallas|seattle|vancouver|montreal|winnipeg|london-on|hamilton|calgary|edmonton|ottawa|boston|atlanta|portland|denver|detroit|minneapolis|nashville|charlotte|las-vegas|austin|columbus|indianapolis|tampa|st-louis|baltimore|buffalo|cincinnati|new-orleans|kansas-city|oakland|anaheim|salt-lake-city|pittsburgh|new-haven|memphis|raleigh|milwaukee|newark|jersey-city|long-beach/i;
  const match = slug.match(cityRegex);
  const city = match ? match[0] : "new-york";
  const cityWords = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const occRegex = /mothers-day|fathers-day|valentines|anniversary|wedding|birthday|get-well|getwell|sympathy|funeral|christmas|hanukkah|passover|spring|summer|fall|winter|holiday|chinese-new-year|ramadan|eid/i;
  const occMatch = slug.match(occRegex);
  const occasion = occMatch ? occMatch[0] : "everyday";

  const title = `FTD Flowers ${occasion} in ${city} – 5K SEO`;
  const description = `FTD flowers ${occasion} in ${city} – 5,000‑word SEO‑ready page for Google, Bing, Perplexity, and Claude.`;
  const kwBase = `FTD flowers ${occasion} in ${city}`.toLowerCase();
  const aiKeywords = [
    kwBase,
    `order flowers online`,
    `send flowers`,
    `flower delivery`,
    `FTD flowers`,
    `same day flowers`,
    `flower delivery`,
    `online flower delivery`,
    `best flower delivery`,
    `FTD ${city}`,
    `FTD ${occasion} flowers`,
    `FTD ${occasion} flowers in ${city}`
  ].join(", ");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" 
