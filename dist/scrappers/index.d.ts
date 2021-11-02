import { Browser } from 'puppeteer';
interface Result {
    image: string;
    name: string;
    currency: string;
    price: number;
    purchaseLink: string;
    store: string;
}
export declare function startBrowser(): Promise<Browser>;
export declare function searchEletronics(browser: Browser, query: string): Promise<Result[]>;
export {};
