"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEletronics = exports.startBrowser = void 0;
const puppeteer_extra_1 = require("puppeteer-extra");
const utils_1 = require("../utils");
const aliexpress_1 = require("./eletronics/aliexpress");
const amazon_1 = require("./eletronics/amazon");
const kabum_1 = require("./eletronics/kabum");
const terabyte_1 = require("./eletronics/terabyte");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
async function startBrowser() {
    puppeteer_extra_1.default.use(StealthPlugin());
    puppeteer_extra_1.default.use(AdblockerPlugin());
    return await puppeteer_extra_1.default.launch();
}
exports.startBrowser = startBrowser;
async function searchEletronics(browser, query) {
    let results = [];
    const kabumPage = await browser.newPage();
    const terabytePage = await browser.newPage();
    const amazonPage = await browser.newPage();
    const aliexpressPage = await browser.newPage();
    await Promise.all([
        (0, kabum_1.searchKabum)(kabumPage, query, results),
        (0, terabyte_1.searchTerabyte)(terabytePage, query, results),
        (0, amazon_1.searchAmazon)(amazonPage, query, results),
        (0, aliexpress_1.searchAliexpress)(aliexpressPage, query, results),
    ]);
    results = results.filter(result => (0, utils_1.normalizeText)(result.name)
        .includes((0, utils_1.normalizeText)(query)));
    return results;
}
exports.searchEletronics = searchEletronics;
//# sourceMappingURL=index.js.map