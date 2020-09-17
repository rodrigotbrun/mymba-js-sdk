import { Mymba } from '../index';
import APICall from '../APICall';
export default abstract class BaseApi<T> {
    protected baseRoute: string;
    constructor(baseRoute: string);
    protected route(name?: any): string;
    getSDK(): Mymba;
    Api(): APICall;
    addRequestOption(key: string, value: any): BaseApi<T>;
    getRequestOption(key: string): void;
    perPage(limit?: number): BaseApi<T>;
    page(pageNumber?: number): BaseApi<T>;
    include(include: any): BaseApi<T>;
    load(include: any): BaseApi<T>;
}
