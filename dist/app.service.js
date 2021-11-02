"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const scrappers_1 = require("./scrappers");
const main_1 = require("./main");
const mongoose_1 = require("mongoose");
const date_fns_1 = require("date-fns");
const utils_1 = require("./utils");
let AppService = class AppService {
    constructor(resultModel) {
        this.resultModel = resultModel;
    }
    async scrapEletronics(query) {
        const resultsAlreadyExists = await this.resultModel.findOne({
            query: (0, utils_1.normalizeText)(query)
        });
        const currentDate = new Date();
        let newSearch = false;
        if (resultsAlreadyExists) {
            const resultsDate = resultsAlreadyExists.searchDate;
            const dateDiff = currentDate.getMilliseconds() - resultsDate.getMilliseconds();
            if (dateDiff > 0) {
                const hoursPassed = (0, date_fns_1.millisecondsToHours)(dateDiff);
                if (hoursPassed > 2) {
                    newSearch = true;
                }
            }
        }
        if (newSearch || !resultsAlreadyExists) {
            const results = await (0, scrappers_1.searchEletronics)(main_1.scrappersBrowser, query);
            const newResults = await this.resultModel.create({
                query: (0, utils_1.normalizeText)(query),
                results,
                searchDate: new Date(),
            });
            await newResults.save();
            return newResults;
        }
        else {
            const results = resultsAlreadyExists.toJSON();
            return results;
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RESULT_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map