import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<typeof mongoose>;
}[];
export declare const resultsProviders: {
    provide: string;
    useFactory: (connection: Connection) => mongoose.Model<unknown, {}, {}, {}>;
    inject: string[];
}[];
