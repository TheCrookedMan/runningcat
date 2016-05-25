import md5 from 'md5';
import qs from 'querystring';
import http from './http';
import httpConfig from './config';



module.exports = class Rest {
    constructor(options) {
        this.options = options;
        this.options.data = !!this.options.data || {};
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
    post(req, res, next, ...rest) {
        let opts, self = this,
            url;

        let [success, error] = rest;
        if (!success) {
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
        } else {
            success();
        }

        if (!error) {
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

        for (let [k, v] of Object.entries(opts)) {
            this.options.data[k] = v;
        }


        url = this._getRestUrl(this.functionCode);


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
