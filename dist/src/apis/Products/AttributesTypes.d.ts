import BaseApi from '../_BaseApi';
import { ProductAttributeType } from '../../interfaces';
export default class ProductAttributeTypeAPI extends BaseApi<ProductAttributeType> {
    private productId?;
    constructor(productId?: number);
    List(): Promise<ProductAttributeType[]>;
    Get(id: number): Promise<ProductAttributeType>;
    Create(data: ProductAttributeType): Promise<ProductAttributeType>;
    Update(data: ProductAttributeType, id: number): Promise<ProductAttributeType>;
    Delete(id: number): Promise<ProductAttributeType>;
}
