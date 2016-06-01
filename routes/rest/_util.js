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
            var data;
            if (undefined == d || "" == d) {
                data = {
                    success: false,
                    msg: '操作失败！'
                };
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
            if (!res.data) {
                res.data = {};
            }
            res.data[self.functionCode] = {
                success: false,
                msg: '网络错误！'
            };
            next();
        }
        if (!!req && "GET" == req.method) {
            opts = req.query;
        } else if (!!req && "POST" == req.method) {
            opts = req.body;
        } else {
            opts = {};
        }
        for (let [k, v] of Object.entries(opts)) {
            this.options.data[k] = v;
        }
        url = this._getRestUrl(this.functionCode);
        return http.rest(url, this.options.data, success, error);
    }
    post(req, res, ...rest) {
        let opts, self = this,
            url;

        let [success, error] = rest;
        if (!success) {
            success = (d) => {
                let $list, data;
                if (undefined == d || "" == d) {
                    data = {
                        isSuccess: false,
                        msg: '操作失败！'
                    };
                } else {
                    data = JSON.parse(d);
                }
                if (data.isSuccess) {
                    data.record = data.record === void 0 ? [] : data.record;
                    if ("[object Object]" === Object.prototype.toString.call(data.record)) {
                        $list = [];
                        $list.push(data.record);
                        data.record = $list;
                    }
                    return res.status(200).send({
                        'data': data.record === void 0 ? [] : data.record,
                        'success': data.isSuccess,
                        'msg': data.msg,
                        'code': data.code
                    });
                } else {
                    return res.status(500).send({
                        'data': [],
                        'success': data.isSuccess,
                        'msg': data.msg,
                        'code': data.code
                    });
                }
            }
        } else {
            success();
        }
        if (!error) {
            error = (d) => {
                return res.status(500).send({
                    'success': false,
                    'msg': '网络问题！',
                    'code': '1000'
                });
            }
        } else {
            error();
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
    normalRequest(success, error) {
        let url = this._getRestUrl(this.functionCode);
        return http.rest(url, this.options.data, success, error);
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
