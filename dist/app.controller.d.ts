import { AppService } from './app.service';
import { SearchProductDTO } from './searchProductDTO';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    searchProducts({ query }: SearchProductDTO): Promise<any>;
}
