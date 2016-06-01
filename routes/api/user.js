import rest from '../rest/_util';
import common from '../common';
/*
    会员登录
 */
exports.login = (req, res, next) => {
    new rest({
        functionCode: 'member.userLogin',
    }).post(req, res);
}

// , function(data) {
//         /*
//             登录成功的时候把用户信息存入cookie
//          */
//         let runningcatUserInfo = JSON.stringify(data.record);
//         common.setCookie("runningcatUserInfo", runningcatUserInfo, res);

//         let array = data.record === void 0 ? {} : data.record;

//         return res.status(200).send({
//             'data': array,
//             'success': data.isSuccess,
//             'msg': data.msg,
//             'code': data.code
//         });
//     }

/*
    会员注册
 */

exports.registeUser = (req, res, next) => {
    new rest({
        functionCode: 'member.registeUser',
    }).post(req, res);
}

// , function(data) {
//         /*
//             注册成功的时候把用户信息存入cookie
//          */
//         let runningcatUserInfo = JSON.stringify(data.record);
//         common.setCookie("runningcatUserInfo", runningcatUserInfo, res);
//         let array = data.record === void 0 ? {} : data.record;

//         return res.status(200).send({
//             'data': array,
//             'success': data.isSuccess,
//             'msg': data.msg,
//             'code': data.code
//         });
//     }

/*
    发送验证码
 */

exports.sendSMS = (req, res, next) => {
    new rest({
        functionCode: 'member.sendSMS',
    }).post(req, res);
}

/*
    校验验证码是否正确
 */

exports.checkSmscode = (req, res, next) => {
    new rest({
        functionCode: 'member.checkSmscode',
    }).post(req, res);
}

/*
    根据 openId 登录
 */

exports.loginByopenId = (openId, success) => {
    let data = {};
    new rest({
        functionCode: 'member.loginByopenId',
        data: {
            openId: openId
        }
    }).normalRequest(function(data) {
        success(data);
    });
}

/*
    根据cookieUserId来验证用户是否登录
 */

exports.checkLogin = (req, res, next) => {
    let runningcatUserInfo = req.cookies.runningcatUserInfo;
    if (!runningcatUserInfo) {
        //没有runningcatUserInfo表示没有注册或者登录过，需要跳转到登录
        res.redirect("/public/login.html");
    } else {
        runningcatUserInfo = JSON.parse(runningcatUserInfo);
        let cookieUserId = runningcatUserInfo.cookieUserId;
        new rest({
            functionCode: 'member.checkLogin',
            data: {
                cookieMemberId: cookieUserId
            }
        }).normalRequest(function(data) {
            /*
                如果用户是登录的，直接 NEXT。否则重定向至登录页面。
             */
            if (data.isSuccess) {
                next();
            } else {
                res.redirect("/public/login.html");
            }
        });
    }
}