import APICall from './APICall'
import { APIOptions } from './interfaces'

import UsersAPI from './apis/User'
import CitiesAPI from './apis/City'
import ProductsAPI from './apis/Products'

const Users = new UsersAPI();

export class Mymba {
    public static instance: Mymba;

    private options: APIOptions;
    private api: APICall;

    private constructor(options: APIOptions) {
        this.options = options;

        this.api = new APICall(
            options.baseURL,
            options.accessToken,
            options.httpsAgent,
            options.httpAgent,
            options.debug,
            options.axiosOptions
        );
    }

    static Initialize(options: APIOptions): Mymba{
        if(Mymba.instance === null || Mymba.instance === undefined)
            Mymba.instance = new Mymba(options);

        return Mymba.instance;
    }

    public getApi(): APICall {
        return this.api;
    }

    public getOptions(): APIOptions {
        return this.options;
    }

    public page(pageNumber: number = 1): Mymba {
        this.getApi().page(pageNumber);
        return this;
    }

    public include(include: any): Mymba {
        this.getApi().include(include);
        return this;
    }

    public load(include: any): Mymba {
        this.getApi().load(include);
        return this;
    }

}

module.exports = {
    SDK: Mymba,
    Users,
    Cities: new CitiesAPI(),
    Products: new ProductsAPI(),
};