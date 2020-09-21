"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var APICall_1 = __importDefault(require("./APICall"));
var User_1 = __importDefault(require("./apis/User"));
var City_1 = __importDefault(require("./apis/City"));
var Users = new User_1["default"]();
var Mymba = (function () {
    function Mymba(options) {
        this.options = options;
        this.api = new APICall_1["default"](options.baseURL, options.accessToken, options.httpsAgent, options.httpAgent, options.debug, options.axiosOptions);
    }
    Mymba.Initialize = function (options) {
        if (Mymba.instance === null || Mymba.instance === undefined)
            Mymba.instance = new Mymba(options);
        return Mymba.instance;
    };
    Mymba.prototype.getApi = function () {
        return this.api;
    };
    Mymba.prototype.getOptions = function () {
        return this.options;
    };
    Mymba.prototype.page = function (pageNumber) {
        if (pageNumber === void 0) { pageNumber = 1; }
        this.getApi().page(pageNumber);
        return this;
    };
    Mymba.prototype.include = function (include) {
        this.getApi().include(include);
        return this;
    };
    Mymba.prototype.load = function (include) {
        this.getApi().load(include);
        return this;
    };
    return Mymba;
}());
exports.Mymba = Mymba;
module.exports = {
    SDK: Mymba,
    Users: Users,
    Cidades: new City_1["default"]()
};
