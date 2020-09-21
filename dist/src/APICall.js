"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var is_url_1 = __importDefault(require("is-url"));
var proper_url_join_1 = __importDefault(require("proper-url-join"));
var APICall = (function () {
    function APICall(baseURL, accessToken, httpsAgent, httpAgent, debug, axiosOptions) {
        if (debug === void 0) { debug = false; }
        if (axiosOptions === void 0) { axiosOptions = {}; }
        this.requestOptions = {};
        this.multipartContent = false;
        if (!is_url_1["default"](baseURL))
            throw new Error('URL Base inválida');
        this.baseURL = baseURL;
        this.httpsAgent = httpsAgent;
        this.httpAgent = httpAgent;
        this.accessToken = accessToken;
        this.debug = debug;
        this.axiosOptions = axiosOptions;
    }
    APICall.prototype.setAccessToken = function (token) {
        this.accessToken = token;
    };
    APICall.prototype.setDeviceId = function (id) {
        this.xDeviceId = id;
    };
    APICall.prototype.setWorkingEvent = function (alias) {
        this.xEventAlias = alias;
    };
    APICall.prototype.setCheckoutSession = function (token) {
        this.xCheckoutSession = token;
    };
    APICall.prototype.addRequestOption = function (key, value) {
        this.requestOptions[key] = value;
        return this;
    };
    APICall.prototype.getRequestOption = function (key) {
        var o = this.requestOptions[key];
        return o;
    };
    APICall.prototype.perPage = function (limit) {
        if (limit === void 0) { limit = 20; }
        this.addRequestOption('limit', limit);
        return this;
    };
    APICall.prototype.page = function (pageNumber) {
        if (pageNumber === void 0) { pageNumber = 1; }
        this.addRequestOption('page', pageNumber);
        return this;
    };
    APICall.prototype.include = function (include) {
        if (Array.isArray(include)) {
            this.addRequestOption('include', include.join(','));
        }
        else {
            this.addRequestOption('include', include);
        }
        return this;
    };
    APICall.prototype.load = function (include) {
        return this.include(include);
    };
    APICall.prototype.send = function (method, apiVersion, url, data, baseURL) {
        var _this = this;
        if (apiVersion === void 0) { apiVersion = 'v1'; }
        if (data === void 0) { data = {}; }
        var callURL = null;
        if (baseURL !== null && baseURL !== undefined) {
            callURL = proper_url_join_1["default"](baseURL, apiVersion, url, { trailingSlash: false });
        }
        else {
            callURL = proper_url_join_1["default"](this.baseURL, apiVersion, url, { trailingSlash: false });
        }
        var headers = {};
        var body = '';
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
        }
        else if (Object.keys(data).length && data.constructor === Object) {
            callURL = proper_url_join_1["default"](callURL, { trailingSlash: false, query: data });
        }
        callURL = proper_url_join_1["default"](callURL, { trailingSlash: false, query: this.requestOptions });
        if (this.debug) {
            var d = new Date;
            console.log('[' + (d.getHours() + ':' + d.getMinutes()) + '] ' + method + ' => ' + callURL);
            console.log('> REQUEST');
            if (data !== {}) {
                console.log(data);
            }
        }
        this.requestOptions = {};
        this.multipartContent = false;
        return axios_1["default"](callURL, __assign({ httpsAgent: this.httpsAgent, httpAgent: this.httpAgent, method: method, data: data, headers: headers }, this.axiosOptions)).then(function (response) {
            if (_this.debug) {
                console.log('> RESPONSE ' + response.status + ' ' + response.statusText);
                try {
                    console.log(response.data.data);
                }
                catch (ee) {
                    console.log(response.data);
                    console.log('FULL RESPONSE:' + response);
                }
                console.log(' ');
            }
            try {
                if (response.status !== null && response.status !== undefined) {
                    if (response.status >= 200 && response.status <= 202) {
                        var result = _this.parseResponse(response);
                        return result;
                    }
                    else {
                        var result = _this.parseErrorResponse(response);
                        return Promise.reject(result);
                    }
                }
            }
            catch (e) {
                console.log("RESPONSE PARSE ERROR:", e);
            }
            return response.data;
        })["catch"](function (e) {
            console.log(e);
            if (e.code !== undefined && e.code !== null) {
                switch (e.code) {
                    case 'UNABLE_TO_VERIFY_LEAF_SIGNATURE':
                        console.error('Solicitação bloqueada! Impossivel comunicar com o servidor sem uma conexão segura.');
                        throw new Error('Solicitação bloqueada! Impossivel comunicar com o servidor sem uma conexão segura. (' + e.code + ')');
                    case 'ERR_CONNECTION_TIMED_OUT':
                        console.error('Tempo de execução excedido (ERR_CONNECTION_TIMED_OUT).');
                        throw new Error('Tempo de execução excedido (' + e.code + ').');
                }
            }
            try {
                if (_this.debug) {
                    try {
                        if (e.response !== null && e.response !== undefined && e.response.status !== null && e.response.status !== undefined) {
                            console.log('> RESPONSE ' + e.response.status + ' ' + e.response.statusText);
                            console.log(e.response.data);
                            console.log(' ');
                        }
                        else {
                            console.log('> RESPONSE');
                            console.log(e.response.data);
                            console.log(' ');
                        }
                    }
                    catch (e) {
                        console.log('DEBUG ERROR:', e);
                    }
                }
                switch (e.errno) {
                    case 'ENOTFOUND':
                        console.error('A URL da api não esta acessível: ' + callURL);
                        throw new Error('Não foi possível estabelecer comunicação com o servidor');
                        break;
                    case 'ERR_CONNECTION_TIMED_OUT':
                        console.error('Tempo de execução excedido (ERR_CONNECTION_TIMED_OUT).');
                        throw new Error('Tempo de execução excedido (' + e.code + ').');
                }
                var rStatus = 400;
                if (e !== null && e.response !== null && e.response !== undefined && e.response.status !== null && e.response.status !== undefined) {
                    rStatus = e.response.status;
                }
                if (rStatus >= 400) {
                    var result = _this.parseErrorResponse(e.response);
                    console.log(rStatus);
                    return Promise.reject(result);
                }
            }
            catch (jsError) {
                console.log('GENERAL ERROR: ', jsError);
                return Promise.reject({
                    message: 'Erro desconhecido! Entre em contato com o Mymba!'
                });
            }
        });
    };
    APICall.prototype.parseResponse = function (response) {
        var result = {};
        if (response.data !== null && response.data !== undefined) {
            if (response.data.data !== null && response.data.data !== undefined) {
                if (response.data.data.data !== null && response.data.data.data !== undefined) {
                    result = response.data.data.data;
                }
                else {
                    result = response.data.data;
                }
            }
            else {
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
    };
    APICall.prototype.parseErrorResponse = function (errorResponse) {
        var result = {};
        if (errorResponse === null || errorResponse === undefined) {
            return {};
        }
        result = errorResponse.data;
        return result;
    };
    return APICall;
}());
exports["default"] = APICall;
