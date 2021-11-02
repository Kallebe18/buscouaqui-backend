"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSchema = void 0;
const mongoose = require("mongoose");
exports.ResultSchema = new mongoose.Schema({
    query: String,
    searchDate: Date,
    count: Number,
    results: [
        {
            name: String,
            image: String,
            price: Number,
            purchaseLink: String,
            store: String,
        },
    ],
}, {
    collection: 'results',
    versionKey: false,
});
//# sourceMappingURL=results.schema.js.map