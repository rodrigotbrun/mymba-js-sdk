import { Mymba } from '../index';
import APICall from '../APICall';

export default abstract class BaseApi<T> {

    protected baseRoute: string;

    constructor(baseRoute: string) {
        this.baseRoute = baseRoute;
    }

    protected route(name: any = ''): string {
        let route = this.baseRoute;
        name = String(name);
        
        if (name !== null && name !== undefined && name.trim() !== '') {
            route += '/' + name;
        }

        return route;
    }

    public getSDK(): Mymba {
        return Mymba.instance;
    }

    public Api(): APICall {
        return this.getSDK().getApi();
    }

    public addRequestOption(key: string, value: any): BaseApi<T> {
        this.getSDK().getApi().addRequestOption(key, value);
        return this;
    }

    public getRequestOption(key: string): void {
        return this.getSDK().getApi().getRequestOption(key);
    }

    public perPage(limit: number = 20): BaseApi<T> {
        this.getSDK().getApi().perPage(limit);
        return this;
    }

    public page(pageNumber: number = 1): BaseApi<T> {
        this.getSDK().getApi().page(pageNumber);
        return this;
    }

    public include(include: any): BaseApi<T> {
        this.getSDK().getApi().include(include);
        return this;
    }

    public load(include: any): BaseApi<T> {
        this.getSDK().getApi().load(include);
        return this;
    }

}