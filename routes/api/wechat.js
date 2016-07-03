import https from 'https';
// import config from '../rest/config';
import nodeCache from '../tool/cache';

// 第一步：用户同意授权，获取code
// 第二步：通过code换取网页授权access_token
// 第三步：刷新access_token（如果需要）
// 第四步：拉取用户信息(需scope为 snsapi_userinfo)

exports.accessToken = (appid, appsecret, code, callback) => {
    let host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = "/sns/oauth2/access_token?appid=" + appid + "&secret=" + appsecret + "&code=" + code + "&grant_type=authorization_code";

    get(host, post, url, callback);
}

let get = (host, post, url, callback) => {
    let optionspost, postheaders, reqPost;
    postheaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    optionspost = {
        'host': host,
        'post': post,
        'path': url,
        'method': 'GET',
        'headers': postheaders
    }
    reqPost = https.request(optionspost, (res) => {
        let dataStr = "";
        res.setEncoding("utf-8");
        res.on('data', (d) => {
            dataStr += d;
        });
        res.on('end', function() {
            callback(dataStr);
        });
    });
    reqPost.on('error', (err) => {
        callback(err);
    });
    reqPost.end();
}

exports.refreshToken = (appid, refreshToken) => {
    let host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = "/sns/oauth2/refresh_token?appid=" + appid + "&grant_type=refresh_token&refresh_token=" + refreshToken;
    get(host, post, url, callback);
}

exports.getUserInfo = (access_token, openid, callback) => {
    let host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = "/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN";
    get(host, post, url, callback);
}

/*
    获取wechat调用微信功能所需要的ticket
 */

exports.getJSApiTicket = (req, res, next) => {
    let wechatPublicNumber = req.cookies.wechatPublicNumber;
    wechatPublicNumber = JSON.parse(wechatPublicNumber);
    let appid = wechatPublicNumber.appid,
        appsecret = wechatPublicNumber.appsecret;
    getAccessToken(appid, appsecret, (data) => {
        if (data.success) {
            getTicket(data.access_token, (record) => {
                if (record.success) {
                    res.status(200).send(record);
                } else {
                    next({
                        msg: JSON.stringify(record)
                    });
                }
            })
        } else {
            next({
                msg: JSON.stringify(data)
            });
        }
    })
}

let getAccessToken = (appid, appsecret, callback) => {
    let access_token = nodeCache.get('access_token'),
        data = {},
        host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret;

    if (!access_token) {
        get(host, post, url, (data) => {
            let record = JSON.parse(data);
            /*
                返回的数据里面有 errcode 表示获取数据失败
             */
            if (record.errcode) {
                data = {
                    access_token: '',
                    success: false
                }
            } else {
                /*
                    由于缓存的计时单位是毫秒，所以时间 需要 X1000 ；
                 */
                nodeCache.put("access_token", record.access_token, record.expires_in * 1000);
                data = {
                    access_token: record.access_token,
                    success: true
                }
            }
            callback(data);
        });
    } else {
        data = {
            access_token: access_token,
            success: true
        }
        callback(data);
    }
}

let getTicket = (access_token, callback) => {
    let ticket = nodeCache.get('ticket'),
        data = {},
        host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = '/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi';

    if (!ticket) {
        get(host, post, url, (data) => {
            let record = JSON.parse(data);
            /*
                返回值里面有 ticket 这个字段证明获取数据成功！
             */
            if (!record.ticket) {
                data = {
                    ticket: '',
                    success: false,
                    errcode: record.errcode,
                    errmsg: record.errmsg
                }
            } else {
                /*
                    由于缓存的计时单位是毫秒，所以时间 需要 X1000 ；
                 */
                nodeCache.put("ticket", record.ticket, record.expires_in * 1000);
                data = {
                    ticket: record.ticket,
                    success: true,
                    errcode: record.errcode,
                    errmsg: record.errmsg
                }
            }
            callback(data);
        });
    } else {
        data = {
            ticket: ticket,
            success: true,
            errcode: 0,
            errmsg: 'ok'
        }
        callback(data);
    }
}
