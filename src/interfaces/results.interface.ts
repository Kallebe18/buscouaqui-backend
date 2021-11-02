import { Product } from './product.interface';

export interface Results {
  query: string;
  searchDate: Date;
  count: number;
  results: Product[];
}
