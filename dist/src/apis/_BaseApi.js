"use strict";
exports.__esModule = true;
var index_1 = require("../index");
var BaseApi = (function () {
    function BaseApi(baseRoute) {
        this.baseRoute = baseRoute;
    }
    BaseApi.prototype.route = function (name) {
        if (name === void 0) { name = ''; }
        var route = this.baseRoute;
        name = String(name);
        if (name !== null && name !== undefined && name.trim() !== '') {
            route += '/' + name;
        }
        return route;
    };
    BaseApi.prototype.getSDK = function () {
        return index_1.Mymba.instance;
    };
    BaseApi.prototype.Api = function () {
        return this.getSDK().getApi();
    };
    BaseApi.prototype.addRequestOption = function (key, value) {
        this.getSDK().getApi().addRequestOption(key, value);
        return this;
    };
    BaseApi.prototype.getRequestOption = function (key) {
        return this.getSDK().getApi().getRequestOption(key);
    };
    BaseApi.prototype.perPage = function (limit) {
        if (limit === void 0) { limit = 20; }
        this.getSDK().getApi().perPage(limit);
        return this;
    };
    BaseApi.prototype.page = function (pageNumber) {
        if (pageNumber === void 0) { pageNumber = 1; }
        this.getSDK().getApi().page(pageNumber);
        return this;
    };
    BaseApi.prototype.include = function (include) {
        this.getSDK().getApi().include(include);
        return this;
    };
    BaseApi.prototype.load = function (include) {
        this.getSDK().getApi().load(include);
        return this;
    };
    return BaseApi;
}());
exports["default"] = BaseApi;
