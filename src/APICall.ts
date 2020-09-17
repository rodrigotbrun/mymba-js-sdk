import axios, { Method } from 'axios';
import isUrl from 'is-url';
import joinUrl from 'proper-url-join';

export default class APICall {

    private baseURL: string;
    private accessToken: string;
    private httpsAgent?: string;
    private httpAgent?: string;
    private debug: boolean;

    private requestOptions: any = {};

    public multipartContent: boolean = false;

    public xEventAlias?: any;
    public xDeviceId?: any;
    public xCheckoutSession?: any;

    constructor(baseURL: string, accessToken: string, httpsAgent?: string, httpAgent?: string, debug: boolean = false) {
        if (!isUrl(baseURL)) throw new Error('URL Base inválida');

        this.baseURL = baseURL;
        this.httpsAgent = httpsAgent;
        this.httpAgent = httpAgent;
        this.accessToken = accessToken;
        this.debug = debug;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public setDeviceId(id: string): void {
        this.xDeviceId = id;
    }

    public setWorkingEvent(alias: string): void {
        this.xEventAlias = alias;
    }

    public setCheckoutSession(token: string): void {
        this.xCheckoutSession = token;
    }

    public addRequestOption(key: string, value: any): APICall {
        this.requestOptions[key] = value;
        return this;
    }

    public getRequestOption(key: string): void {
        const o = this.requestOptions[key];
        return o;
    }

    public perPage(limit: number = 20): APICall {
        this.addRequestOption('limit', limit);

        return this;
    }

    public page(pageNumber: number = 1): APICall {
        this.addRequestOption('page', pageNumber);

        return this;
    }

    public include(include: any): APICall {
        if (Array.isArray(include)) {
            this.addRequestOption('include', include.join(','));
        } else {
            this.addRequestOption('include', include);
        }

        return this;
    }

    public load(include: any): APICall {
        return this.include(include);
    }

    public send(method: Method, apiVersion: string = 'v1', url: string, data: any = {}, baseURL?: string): Promise<any> {
        let callURL: any = null;

        if (baseURL !== null && baseURL !== undefined) {
            callURL = joinUrl(baseURL, apiVersion, url, { trailingSlash: false });
        } else {
            callURL = joinUrl(this.baseURL, apiVersion, url, { trailingSlash: false });
        }

        let headers: any = {};
        let body = '';

        headers['Authorization'] = 'Bearer ' + this.accessToken;
        headers['X-SDK'] = 'js-1.0.12';

        if (this.multipartContent) {
            headers['Content-Type'] = "multipart/form-data";
        }

        if (this.xEventAlias !== undefined && this.xEventAlias !== null) {
            headers['X-Event-Alias'] = this.xEventAlias;
        }

        if (this.xDeviceId !== undefined && this.xDeviceId !== null) {
            headers['X-Device-Id'] = this.xDeviceId;
        }

        if (this.xCheckoutSession !== undefined && this.xCheckoutSession !== null) {
            headers['X-Checkout-Session'] = this.xCheckoutSession;
        }

        if (method === 'POST' || method === 'PUT') {
            headers['Accept'] = 'application/json';
        } else if (Object.keys(data).length && data.constructor === Object) {
            callURL = joinUrl(callURL, { trailingSlash: false, query: data });
        }

        callURL = joinUrl(callURL, { trailingSlash: false, query: this.requestOptions });

        if (this.debug) {
            const d = new Date;
            console.log('[' + (d.getHours() + ':' + d.getMinutes()) + '] ' + method + ' => ' + callURL);
            console.log('> REQUEST');

            if (data !== {}) {
                console.log(data);
            }
        }

        this.requestOptions = {};
        this.multipartContent = false;

        return axios(callURL, {
            httpsAgent: this.httpsAgent,
            httpAgent: this.httpAgent,
            method,
            data: data,
            headers
        }).then((response) => {
            if (this.debug) {
                console.log('> RESPONSE ' + response.status + ' ' + response.statusText);

                try {
                    console.log(response.data.data);
                } catch (ee) {
                    console.log(response.data);
                    console.log('FULL RESPONSE:' + response);
                }

                console.log(' ');
            }

            try {
                if (response.status !== null && response.status !== undefined) {
                    if (response.status >= 200 && response.status <= 202) {
                        let result: any = this.parseResponse(response);

                        // if (Array.isArray(result)) {
                        //     result = collect(result);
                        // }

                        return result;
                    } else {
                        const result: any = this.parseErrorResponse(response);

                        return Promise.reject(result);
                    }
                }
            } catch (e) {
                console.log("RESPONSE PARSE ERROR:", e);
            }

            // if (Array.isArray(response.data)) {
            //     return collect(response.data);
            // }

            return response.data;
        }).catch((e) => {

            console.log(e);

            if (e.code !== undefined && e.code !== null) {
                switch (e.code) {
                    case 'UNABLE_TO_VERIFY_LEAF_SIGNATURE':
                        console.error('Solicitação bloqueada! Impossivel comunicar com o servidor sem uma conexão segura.');
                        throw new Error('Solicitação bloqueada! Impossivel comunicar com o servidor sem uma conexão segura. (' + e.code + ')');
                }
            }

            try {
                if (this.debug) {
                    try {
                        if (e.response !== null && e.response !== undefined && e.response.status !== null && e.response.status !== undefined) {
                            console.log('> RESPONSE ' + e.response.status + ' ' + e.response.statusText);
                            console.log(e.response.data);
                            console.log(' ');
                        } else {
                            console.log('> RESPONSE');
                            console.log(e.response.data);
                            console.log(' ');
                        }
                    } catch (e) {
                        console.log('DEBUG ERROR:', e);
                    }
                }

                switch (e.errno) {
                    case 'ENOTFOUND':
                        console.error('A URL da api não esta acessível: ' + callURL);
                        throw new Error('Não foi possível estabelecer comunicação com o servidor');
                        break;
                }

                let rStatus = 400;
                if (e !== null && e.response !== null && e.response !== undefined && e.response.status !== null && e.response.status !== undefined) {
                    rStatus = e.response.status;
                }

                if (rStatus >= 400) {
                    const result: any = this.parseErrorResponse(e.response);
                    console.log(rStatus);

                    return Promise.reject(result);
                }
            } catch (jsError) {
                console.log('GENERAL ERROR: ', jsError);
                return Promise.reject({
                    message: 'Erro desconhecido! Entre em contato com o Mymba!',
                });
            }
        });
    }

    public parseResponse(response: any): any {
        let result: any = {};

        if (response.data !== null && response.data !== undefined) {
            if (response.data.data !== null && response.data.data !== undefined) {
                if (response.data.data.data !== null && response.data.data.data !== undefined) {
                    result = response.data.data.data;
                } else {
                    result = response.data.data;
                }
            } else {
                result = response.data;
            }

            if (result === undefined || result === null) {
                result = response.data.data;
            }

            if (response.data.message !== undefined && response.data.message !== null) {
                result.__server_message = response.data.message;
            }
        }

        return result;
    }

    public parseErrorResponse(errorResponse: any): any {
        let result: any = {};

        if (errorResponse === null || errorResponse === undefined) {
            return {};
        }

        result = errorResponse.data;

        return result;
    }

}
