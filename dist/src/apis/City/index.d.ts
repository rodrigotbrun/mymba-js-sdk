import BaseApi from '../_BaseApi';
import { City } from '../../interfaces';
export default class CitiesAPI extends BaseApi<City> {
    constructor();
    List(): Promise<City[]>;
    Get(id: number): Promise<City>;
    Create(data: City): Promise<City>;
    Update(data: City, id: number): Promise<City>;
    Delete(id: number): Promise<City>;
}
