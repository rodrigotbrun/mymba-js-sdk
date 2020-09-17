import BaseApi from '../_BaseApi';
import { City } from '../../interfaces'

export default class CitiesAPI extends BaseApi<City> {

    constructor() {
        super('cidades');
    }

    public List(): Promise<City[]> {
        return this.Api().send('GET', 'v1', this.route());
    }

    public Get(id: number): Promise<City> {
        return this.Api().send('GET', 'v1', this.route(id));
    }

    public Create(data: City): Promise<City> {
        return this.Api().send('POST', 'v1', this.route());
    }

    public Update(data: City, id: number): Promise<City> {
        return this.Api().send('PUT', 'v1', this.route(id));
    }

    public Delete(id: number): Promise<City> {
        return this.Api().send('DELETE', 'v1', this.route(id));
    }

}