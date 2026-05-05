const fs = require('fs');

// 2M KEYWORD COMBOS
const KEYWORDS = ['flower-delivery','send-flowers','same-day-flowers','mothers-day-flowers','buy-flowers','order-flowers','florist-near-me','fresh-flower-delivery','flower-bouquets','anniversary-flowers'];
const CITIES = ['new-york','los-angeles','chicago','houston','toronto','miami','vancouver','boston','seattle','phoenix'];
const FLOWERS = ['roses','tulips','lilies','peonies','orchids'];
const BASE_URL = 'https://brightlane.github.io/FtdFlowers/';

const urls = [];
CITIES.forEach(city => {
  KEYWORDS
