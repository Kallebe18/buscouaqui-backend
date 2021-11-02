import { ElementHandle, Page } from 'puppeteer';
import { formatReturnPrice } from 'src/utils';

async function getProductInfo(product: ElementHandle<Element>, results: any) {
  try {
    const productLink = await product.$x('./a');
    const productLinkHref = await productLink[0].evaluate((pLink) =>
      pLink.getAttribute('href'),
    );

    const productImage = await product.$x('./a/img');
    const productImageSrc = await productImage[0].evaluate((productImage) =>
      productImage.getAttribute('src'),
    );

    const productName = await product.$x('./a/div/div[1]/h2');
    const productNameText = await productName[0].evaluate(
      (productName) => productName.textContent,
    );

    const productPrice = await product.$x('./a/div/div[2]/span[2]');
    const productPriceText = await productPrice[0].evaluate(
      (productPrice) => productPrice.textContent,
    );
    if (!productPriceText.includes('-')) {
      results.push({
        image: productImageSrc,
        name: productNameText,
        currency: 'BRL',
        price: formatReturnPrice(productPriceText),
        purchaseLink: `https://www.kabum.com.br${productLinkHref}`,
        store: 'kabum',
      });
    }
  } catch (err) {
    // console.log(err)
  }
}

export async function searchKabum(page: Page, query: string, results: any[]) {
  page
  .goto(`https://www.kabum.com.br/busca?query=${query}`, {
    timeout: 0,
  })
  .then(async () => {
    try {
      await page.waitForXPath('//*[@id="listing"]', {
        timeout: 4000,
      });
      const productElements = await page.$x(
        '//*[@id="listing"]/article/section/div[2]/div/main/div',
      );
      await Promise.all(
        productElements.map(async (product) => {
          await getProductInfo(product, results);
        }),
      );
    } catch (err) {}
    finally {
      await page.close()
    }
  })
  .catch(() => null);
}
