import BaseApi from '../_BaseApi';
import { Product } from '../../interfaces';
import AttibutesTypes from './AttributesTypes';
export default class Products extends BaseApi<Product> {
    constructor();
    List(): Promise<Product[]>;
    Get(id: number): Promise<Product>;
    Create(data: Product): Promise<Product>;
    Update(data: Product, id: number): Promise<Product>;
    Delete(id: number): Promise<Product>;
    AttributesTypes(productId?: number): AttibutesTypes;
}
