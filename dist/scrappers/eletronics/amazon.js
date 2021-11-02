"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAmazon = void 0;
const utils_1 = require("../../utils");
async function getProductInfo(product, results) {
    try {
        const productLink = await product.$x('./div/span/div/div/span/a');
        const productLinkText = await productLink[0].evaluate((productImage) => productImage.getAttribute('href'));
        const productImage = await product.$x('./div/span/div/div/span/a/div/img');
        const productImageSrc = await productImage[0].evaluate((productImage) => productImage.getAttribute('src'));
        const productName = await product.$x('./div/span/div/div/div[2]/div[1]/h2/a/span');
        const productNameText = await productName[0].evaluate((productName) => productName.textContent);
        const productPrice = await product.$x('./div/span/div/div/div[2]/div[3]/div/div[1]/a/span/span');
        const productPriceText = await productPrice[0].evaluate((productPrice) => productPrice.textContent);
        results.push({
            image: productImageSrc,
            name: productNameText,
            currency: 'BRL',
            price: (0, utils_1.formatReturnPrice)(productPriceText),
            purchaseLink: `https://www.amazon.com.br${productLinkText}`,
            store: 'amazon',
        });
    }
    catch (err) {
    }
}
async function searchAmazon(page, query, results) {
    await page.goto(`https://www.amazon.com.br/s?k=${query}`, {
        timeout: 0,
    }).then(async () => {
        try {
            await page.waitForXPath('//*[@id="search"]/div[1]/div[1]/div/span[3]/div[2]', {
                timeout: 4000,
            });
            const productElements = await page.$x('//*[@id="search"]/div[1]/div[1]/div/span[3]/div[2]/div');
            await Promise.all(productElements.map(async (product) => {
                await getProductInfo(product, results);
            }));
        }
        catch (err) {
        }
        finally {
            await page.close();
        }
    }).catch(() => null);
}
exports.searchAmazon = searchAmazon;
//# sourceMappingURL=amazon.js.map