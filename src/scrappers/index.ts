/* eslint-disable @typescript-eslint/no-var-requires */
import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import { normalizeText } from 'src/utils';
import { searchAliexpress } from './eletronics/aliexpress';
import { searchAmazon } from './eletronics/amazon';
import { searchKabum } from './eletronics/kabum';
import { searchTerabyte } from './eletronics/terabyte';
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

interface Result {
  image: string,
  name: string,
  currency: string,
  price: number,
  purchaseLink: string,
  store: string,
}

export async function startBrowser() {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin());
  return await puppeteer.launch();
}

export async function searchEletronics(browser: Browser, query: string) {
  let results: Result[] = [];
  const kabumPage = await browser.newPage();
  const terabytePage = await browser.newPage();
  const amazonPage = await browser.newPage();
  const aliexpressPage = await browser.newPage();
  await Promise.all([
    searchKabum(kabumPage, query, results),
    searchTerabyte(terabytePage, query, results),
    searchAmazon(amazonPage, query, results),
    searchAliexpress(aliexpressPage, query, results),
  ]);
  results = results.filter(result => normalizeText(result.name)
    .includes(normalizeText(query))
  )
  return results;
}
