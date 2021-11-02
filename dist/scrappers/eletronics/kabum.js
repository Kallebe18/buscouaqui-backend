"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchKabum = void 0;
const utils_1 = require("../../utils");
async function getProductInfo(product, results) {
    try {
        const productLink = await product.$x('./a');
        const productLinkHref = await productLink[0].evaluate((pLink) => pLink.getAttribute('href'));
        const productImage = await product.$x('./a/img');
        const productImageSrc = await productImage[0].evaluate((productImage) => productImage.getAttribute('src'));
        const productName = await product.$x('./a/div/div[1]/h2');
        const productNameText = await productName[0].evaluate((productName) => productName.textContent);
        const productPrice = await product.$x('./a/div/div[2]/span[2]');
        const productPriceText = await productPrice[0].evaluate((productPrice) => productPrice.textContent);
        if (!productPriceText.includes('-')) {
            results.push({
                image: productImageSrc,
                name: productNameText,
                currency: 'BRL',
                price: (0, utils_1.formatReturnPrice)(productPriceText),
                purchaseLink: `https://www.kabum.com.br${productLinkHref}`,
                store: 'kabum',
            });
        }
    }
    catch (err) {
    }
}
async function searchKabum(page, query, results) {
    page
        .goto(`https://www.kabum.com.br/busca?query=${query}`, {
        timeout: 0,
    })
        .then(async () => {
        try {
            await page.waitForXPath('//*[@id="listing"]', {
                timeout: 4000,
            });
            const productElements = await page.$x('//*[@id="listing"]/article/section/div[2]/div/main/div');
            await Promise.all(productElements.map(async (product) => {
                await getProductInfo(product, results);
            }));
        }
        catch (err) { }
        finally {
            await page.close();
        }
    })
        .catch(() => null);
}
exports.searchKabum = searchKabum;
//# sourceMappingURL=kabum.js.map