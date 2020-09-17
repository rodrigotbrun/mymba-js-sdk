import APICall from './APICall';
import { APIOptions } from './interfaces';
export declare class Mymba {
    static instance: Mymba;
    private options;
    private api;
    private constructor();
    static Initialize(options: APIOptions): Mymba;
    getApi(): APICall;
    getOptions(): APIOptions;
    page(pageNumber?: number): Mymba;
    include(include: any): Mymba;
    load(include: any): Mymba;
}
