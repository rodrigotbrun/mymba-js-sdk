import BaseApi from '../_BaseApi';
import { ProductAttributeType } from '../../interfaces'

export default class ProductAttributeTypeAPI extends BaseApi<ProductAttributeType> {

    private productId?: number;

    constructor(productId?: number) {
        super('produtos-atributos'); // TODO

        this.productId = productId; // TODO - usar para dependencias 
    }

    public List(): Promise<ProductAttributeType[]> {
        return this.Api().send('GET', 'v1', this.route());
    }

    public Get(id: number): Promise<ProductAttributeType> {
        return this.Api().send('GET', 'v1', this.route(id));
    }

    public Create(data: ProductAttributeType): Promise<ProductAttributeType> {
        return this.Api().send('POST', 'v1', this.route());
    }

    public Update(data: ProductAttributeType, id: number): Promise<ProductAttributeType> {
        return this.Api().send('PUT', 'v1', this.route(id));
    }

    public Delete(id: number): Promise<ProductAttributeType> {
        return this.Api().send('DELETE', 'v1', this.route(id));
    }

}