import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchProductDTO } from './searchProductDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/search')
  async searchProducts(@Query() { query }: SearchProductDTO) {
    return await this.appService.scrapEletronics(query);
  }
}
