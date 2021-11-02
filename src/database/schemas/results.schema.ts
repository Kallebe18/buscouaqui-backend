import * as mongoose from 'mongoose';

export const ResultSchema = new mongoose.Schema(
  {
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
  },
  {
    collection: 'results',
    versionKey: false,
  },
);
