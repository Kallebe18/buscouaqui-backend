"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrappersBrowser = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const scrappers_1 = require("./scrappers");
exports.scrappersBrowser = null;
async function bootstrap() {
    exports.scrappersBrowser = await (0, scrappers_1.startBrowser)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map