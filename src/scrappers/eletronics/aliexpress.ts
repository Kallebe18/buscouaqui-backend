import { ElementHandle, Page } from 'puppeteer';
import { formatReturnPrice } from 'src/utils';

async function getProductInfo(
  product: ElementHandle<Element>,
  results: any,
  listType,
) {
  try {
    let productLink: ElementHandle<Element>[];
    let productImage: ElementHandle<Element>[];
    let productInfoContainer: ElementHandle<Element>[];
    let productPrice: ElementHandle<Element>[];
    let productName: ElementHandle<Element>[];
    if (listType === 1) {
      productImage = await product.$x('./div/img');
      productName = await product.$x('./div[2]/div[1]/h1');
      productInfoContainer = await product.$x('./div[2]/div');
      if (productInfoContainer.length === 5) {
        productPrice = await product.$x('./div[2]/div[2]');
      } else if (productInfoContainer.length === 6) {
        productPrice = await product.$x('./div[2]/div[3]');
        const price = await productPrice[0].evaluate((p) => p.textContent);
        if (price.includes('desconto')) {
          productPrice = await product.$x('./div[2]/div[2]');
        }
      } else {
        productPrice = await product.$x('./div[2]/div[3]');
      }
    }

    if (listType === 2) {
      productLink = await product.$x('./a');
      productImage = await product.$x('./a/img');
      productName = await product.$x('./div/div/a/span');
      productInfoContainer = await product.$x('./div');
      if (productInfoContainer.length === 7) {
        productPrice = await product.$x('./div/div[3]/div');
      } else {
        productPrice = await product.$x('./div/div[2]/div');
      }
    }

    let link = '';
    if (listType === 1) {
      link = await product.evaluate((p) => p.getAttribute('href'));
    } else {
      link = await productLink[0].evaluate((l) => l.getAttribute('href'));
    }
    const image = await productImage[0].evaluate((i) => i.getAttribute('src'));
    const name = await productName[0].evaluate((n) => n.textContent);
    const price = await productPrice[0].evaluate((p) => p.textContent);

    results.push({
      image: `https://${image.replace('//', '')}`,
      name,
      currency: 'BRL',
      price: formatReturnPrice(price, 'aliexpress'),
      purchaseLink: `https://pt.aliexpress.com${link}`,
      store: 'aliexpress',
    });
  } catch (err) {
    // console.log(err)
  }
}

export async function searchAliexpress(
page: Page,
query: string,
results: any[],
) {
  await page
  .goto(`https://pt.aliexpress.com/wholesale?SearchText=${query}`, {
    timeout: 0,
  }).then(async () => {
    try {
      await page.waitForXPath('//*[@id="root"]/div', {
        timeout: 4000,
      });
      let productElements = await page.$x(
        '//*[@id="root"]/div/div/div[2]/div[2]/div/div[2]/a', // list type 1
      );
      let listType = 1;
      if (productElements.length === 0) {
        productElements = await page.$x(
          '//*[@id="root"]/div/div/div[2]/div[2]/div/div[2]/div', // list type 2
        );
        listType = 2;
      }
  
      await Promise.all(
        productElements.map(async (product) => {
          await getProductInfo(product, results, listType);
        }),
      );
    } catch (err) {}
    finally {
      await page.close()
    }
  }).catch(() => null);
}
