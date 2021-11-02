import { Model } from 'mongoose';
import { Results } from './interfaces/results.interface';
export declare class AppService {
    private resultModel;
    constructor(resultModel: Model<Results>);
    scrapEletronics(query: string): Promise<any>;
}
