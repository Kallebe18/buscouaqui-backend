import { Inject, Injectable } from '@nestjs/common';
import { searchEletronics } from './scrappers';
import { scrappersBrowser } from './main';
import { Model } from 'mongoose';
import { Results } from './interfaces/results.interface';
import { millisecondsToHours } from 'date-fns';
import { normalizeText } from 'src/utils';

@Injectable()
export class AppService {
  constructor(
    @Inject('RESULT_MODEL')
    private resultModel: Model<Results>,
  ) {}

  async scrapEletronics(query: string): Promise<any> {
    const resultsAlreadyExists = await this.resultModel.findOne({
      query: normalizeText(query)
    });
    const currentDate = new Date();

    let newSearch = false;

    if (resultsAlreadyExists) {
      const resultsDate = resultsAlreadyExists.searchDate;
      const dateDiff =
        currentDate.getMilliseconds() - resultsDate.getMilliseconds();
      if (dateDiff > 0) {
        const hoursPassed = millisecondsToHours(dateDiff);
        if (hoursPassed > 2) {
          newSearch = true;
        }
      }
    }

    if (newSearch || !resultsAlreadyExists) {
      const results = await searchEletronics(scrappersBrowser, query);
      const newResults = await this.resultModel.create({
        query: normalizeText(query),
        results,
        searchDate: new Date(),
      });
      await newResults.save();
      return newResults;
    } else {
      const results = resultsAlreadyExists.toJSON();
      return results;
    }
  }
}
