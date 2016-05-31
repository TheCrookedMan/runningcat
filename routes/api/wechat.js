import https from 'https';
import config from '../rest/config';

// 第一步：用户同意授权，获取code
// 第二步：通过code换取网页授权access_token
// 第三步：刷新access_token（如果需要）
// 第四步：拉取用户信息(需scope为 snsapi_userinfo)

exports.accessToken = (code, callback) => {
    let host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = "/sns/oauth2/access_token?appid=" + config.wechat.appId + "&secret=" + config.wechat.appsecret + "&code=" + code + "&grant_type=authorization_code";

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
    console.log("optionspost:::"+JSON.stringify(optionspost));
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

exports.refreshToken = (refreshToken) => {
    let host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = "/sns/oauth2/refresh_token?appid=" + config.wechat.appId + "&grant_type=refresh_token&refresh_token=" + refreshToken;
    get(host, post, url, callback);
}
exports.getUserInfo = (ACCESS_TOKEN, OPENID, callback) => {
    let host, post, url;
    host = "api.weixin.qq.com";
    post = "80";
    url = "/sns/userinfo?access_token=" + ACCESS_TOKEN + "&openid=" + OPENID + "&lang=zh_CN";
    get(host, post, url, callback);
}

// export default class wechatAuth {
//     constructor() {
//         this.scopeType = {
//             base: 'snsapi_base',
//             userinfo: 'snsapi_userinfo'
//         }
//         this.redirect_uri = encodeURIComponent(config.redirectUri + "wechatAuth.html");
//     }
//     base() {
//         this.getCode(this.scopeType.base, (data) => {
//             debugger
//         });
//     }
//     userinfo() {
//         this.getCode(this.scopeType.userinfo, (data) => {
//             debugger
//         });
//     }
//     getCode(scope, callback) {
//         let host, post, url;
//         host = "open.weixin.qq.com";
//         post = "80";
//         url = "/connect/oauth2/authorize?appid=" + config.appId + "&redirect_uri=" + this.redirect_uri + "&response_type=code&scope=" + scope + "&state=STATE#wechat_redirect";

//         this.get(host, post, url, callback);
//     }
// }
