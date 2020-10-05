import BaseApi from '../_BaseApi';
import { Stock } from '../../interfaces';
export default class StockAPI extends BaseApi<Stock> {
    constructor();
    List(): Promise<Stock[]>;
    Get(id: number): Promise<Stock>;
    Create(data: Stock): Promise<Stock>;
    Update(data: Stock, id: number): Promise<Stock>;
    Delete(id: number): Promise<Stock>;
}
