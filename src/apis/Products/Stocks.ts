import BaseApi from '../_BaseApi';
import { Stock } from '../../interfaces'

export default class StockAPI extends BaseApi<Stock> {

    constructor() {
        super('produtos-atributos'); // TODO
    }

    public List(): Promise<Stock[]> {
        return this.Api().send('GET', 'v1', this.route());
    }

    public Get(id: number): Promise<Stock> {
        return this.Api().send('GET', 'v1', this.route(id));
    }

    public Create(data: Stock): Promise<Stock> {
        return this.Api().send('POST', 'v1', this.route());
    }

    public Update(data: Stock, id: number): Promise<Stock> {
        return this.Api().send('PUT', 'v1', this.route(id));
    }

    public Delete(id: number): Promise<Stock> {
        return this.Api().send('DELETE', 'v1', this.route(id));
    }

}