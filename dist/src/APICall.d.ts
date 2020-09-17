import { Method } from 'axios';
export default class APICall {
    private baseURL;
    private accessToken;
    private httpsAgent?;
    private httpAgent?;
    private debug;
    private requestOptions;
    multipartContent: boolean;
    xEventAlias?: any;
    xDeviceId?: any;
    xCheckoutSession?: any;
    constructor(baseURL: string, accessToken: string, httpsAgent?: string, httpAgent?: string, debug?: boolean);
    setAccessToken(token: string): void;
    setDeviceId(id: string): void;
    setWorkingEvent(alias: string): void;
    setCheckoutSession(token: string): void;
    addRequestOption(key: string, value: any): APICall;
    getRequestOption(key: string): void;
    perPage(limit?: number): APICall;
    page(pageNumber?: number): APICall;
    include(include: any): APICall;
    load(include: any): APICall;
    send(method: Method, apiVersion: string | undefined, url: string, data?: any, baseURL?: string): Promise<any>;
    parseResponse(response: any): any;
    parseErrorResponse(errorResponse: any): any;
}
