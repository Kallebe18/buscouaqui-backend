"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsProviders = exports.databaseProviders = void 0;
const mongoose = require("mongoose");
const results_schema_1 = require("./schemas/results.schema");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose.connect('mongodb+srv://kallebe:UlSXoxtFyZzqGEBC@cluster0.9hoqe.mongodb.net/buscouaqui'),
    },
];
exports.resultsProviders = [
    {
        provide: 'RESULT_MODEL',
        useFactory: (connection) => connection.model('results', results_schema_1.ResultSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=providers.js.map