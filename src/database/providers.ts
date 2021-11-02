import * as mongoose from "mongoose";
import { Connection } from "mongoose";
import { ResultSchema } from "./schemas/results.schema";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect("< sua url do mongodb :D >"),
  },
];

export const resultsProviders = [
  {
    provide: "RESULT_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("results", ResultSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
