import md5 from 'md5';
import qs from 'querystring';
import http from './http';
import httpConfig from './config';

export default class Rest {
    constructor(options) {
        this.options = options;
        if (!this.options.data) {
            this.options.data = {}
        }
        // this.options.data = !!this.options.data || {};
        this.functionCode = options.functionCode;
    }
    _getRestUrl(funCode) {
        return this._buildURL(funCode);
    }
    _makeToken(params) {
        let apiId, apiSecret, functioncode, token;
        apiId = params.apiId || "weizhan";
        functioncode = params.functioncode;
        apiSecret = params.apiSecret || "e10adc3949ba59abbe56e057f20f883e";
        token = [];
        token.push("apiId=");
        token.push(apiId);
        token.push("&functioncode=");
        token.push(functioncode);
        token.push("&");
        token.push(apiSecret);

        return md5(token.join(""));
    }
    _buildURL(funCode) {
        let optStr, sUrl, api;
        sUrl = [];
        optStr = [];

        api = this._getSetting(funCode);
        sUrl.push(api.prefix);
        sUrl.push("?apiId=");
        sUrl.push(api.apiId);
        sUrl.push("&functioncode=");
        sUrl.push(api.functioncode);
        sUrl.push("&token=");
        sUrl.push(this._makeToken(api));
        return sUrl.join("");
    }
    link(req, res, next) {
        let opts, self = this,
            url, success, error;
        success = (d) => {
            let data;
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
            }
            if (!res.data) {
                res.data = {};
            }
            res.data[self.functionCode] = data;
            next();
        }
        error = (d) => {
            next({
                msg: "网络异常!"
            });
        }
        if (!!req && "GET" == req.method) {
            opts = req.query;
        } else if (!!req && "POST" == req.method) {
            opts = req.body;
        } else {
            opts = {};
        }

        for (let key of Object.keys(opts)) {
            this.options.data[key] = opts[key]
        }


        url = this._getRestUrl(this.functionCode);
        return http.rest(url, this.options.data, success, error);
    }
    post(req, res, ...rest) {
        let opts, self = this,
            url, __success, __error;

        let [next, success, error] = rest;

        __success = (d) => {
            let $list, data;
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
            }
            if (typeof success === "function") {
                success(data);
            } else {
                let array = data.record === void 0 ? {} : data.record;
                return res.status(200).send({
                    'data': array,
                    'success': data.isSuccess,
                    'msg': data.msg,
                    'code': data.code
                });
            }
        }
        __error = (d) => {
            if (typeof error == "function") {
                error(d);
            } else {
                next({
                    msg: "网络异常!"
                });
            }
        }
        if (!!req && "GET" == req.method) {
            opts = req.query;
        } else if (!!req && "POST" == req.method) {
            opts = req.body;
        } else {
            opts = {};
        }

        for (let key of Object.keys(opts)) {
            this.options.data[key] = opts[key]
        }
        url = this._getRestUrl(this.functionCode);
        return http.rest(url, this.options.data, __success, __error);
    }
    normalRequest(success, next) {
        let url = this._getRestUrl(this.functionCode);
        let __success, __error, data;
        __success = (d) => {
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
                success(data);
            }
        }
        __error = (d) => {
            next({
                msg: "网络异常!"
            });
        }
        return http.rest(url, this.options.data, __success, __error);
    }
    _getSetting(functioncode) {
        return {
            'prefix': '/wechatApi/apicenter',
            'functioncode': functioncode,
            'apiId': 'weizhan',
            'apiSecret': 'e10adc3949ba59abbe56e057f20f883e'
        }
    }
}
