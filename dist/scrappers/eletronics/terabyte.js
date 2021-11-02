"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTerabyte = void 0;
const utils_1 = require("../../utils");
async function getProductInfo(product, results) {
    try {
        const purchaseLink = await product.$('.commerce_columns_item_image.text-center > a');
        const link = await purchaseLink.evaluate((n) => n.getAttribute('href'));
        const productImage = await product.$('.commerce_columns_item_image.text-center > a > img');
        const image = await productImage.evaluate((n) => n.getAttribute('src'));
        const productName = await product.$('.commerce_columns_item_caption > a > h2 > strong');
        const name = await productName.evaluate((n) => n.innerHTML);
        const productPrice = await product.$('.prod-new-price > span');
        const price = await productPrice.evaluate((p) => p.innerHTML);
        results.push({
            image,
            name,
            currency: 'BRL',
            price: (0, utils_1.formatReturnPrice)(price),
            purchaseLink: link,
            store: 'terabyte',
        });
    }
    catch (err) {
    }
}
async function searchTerabyte(page, query, results) {
    await page
        .goto(`https://www.terabyteshop.com.br/busca?str=${query}`, {
        timeout: 0,
        waitUntil: 'domcontentloaded',
    })
        .then(async () => {
        try {
            await page.waitForXPath('//*[@id="prodarea"]/div', {
                timeout: 4000,
            });
            const productElements = await page.$x('//*[@id="prodarea"]/div');
            await Promise.all(productElements.map((product) => getProductInfo(product, results)));
        }
        catch (err) { }
        finally {
            await page.close();
        }
    })
        .catch(() => null);
}
exports.searchTerabyte = searchTerabyte;
//# sourceMappingURL=terabyte.js.map