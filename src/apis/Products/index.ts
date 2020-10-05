import BaseApi from '../_BaseApi';
import { Product } from '../../interfaces'

import AttibutesTypes from './AttributesTypes'

export default class Products extends BaseApi<Product> {

    constructor() {
        super('produtos'); // TODO
    }

    public List(): Promise<Product[]> {
        return this.Api().send('GET', 'v1', this.route());
    }

    public Get(id: number): Promise<Product> {
        return this.Api().send('GET', 'v1', this.route(id));
    }

    public Create(data: Product): Promise<Product> {
        return this.Api().send('POST', 'v1', this.route());
    }

    public Update(data: Product, id: number): Promise<Product> {
        return this.Api().send('PUT', 'v1', this.route(id));
    }

    public Delete(id: number): Promise<Product> {
        return this.Api().send('DELETE', 'v1', this.route(id));
    }

    public AttributesTypes(productId?: number) {
        return new AttibutesTypes(productId);
    }

}