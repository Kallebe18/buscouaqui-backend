import { IsString, IsNotEmpty } from 'class-validator';

export class SearchProductDTO {
  @IsNotEmpty()
  @IsString()
  query: string;
}
