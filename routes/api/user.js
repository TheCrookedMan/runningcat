import rest from '../rest/_util';
import { maxAge } from '../constants';
/*
    会员登录
 */
exports.login = (req, res, next) => {
    new rest({
        functionCode: 'member.userLogin',
    }).post(req, res, next);
}

/*
    会员注册
 */

exports.registeUser = (req, res, next) => {
    new rest({
        functionCode: 'member.registeUser',
    }).post(req, res, next);
}

/*
    发送验证码
 */

exports.sendSMS = (req, res, next) => {
    new rest({
        functionCode: 'member.sendSMS',
    }).post(req, res, next);
}

/*
    校验验证码是否正确
 */

exports.checkSmscode = (req, res, next) => {
    new rest({
        functionCode: 'member.checkSmscode',
    }).post(req, res, next);
}

/*
    根据 unionId 登录
 */

exports.loginByunionId = (unionId, success, next) => {
    let data = {};
    new rest({
        functionCode: 'member.loginByopenId',
        data: {
            unionId: unionId
        }
    }).normalRequest(function(data) {
        success(data);
    }, next);
}

/*
    根据cookieUserId来验证用户是否登录
 */

exports.checkLogin = (req, res, next) => {
    let runningcatUserInfo = req.cookies.runningcatUserInfo,
        userInfo, fromUrl = req.url;
    if (runningcatUserInfo) {
        userInfo = JSON.parse(runningcatUserInfo);
    }
    if (!runningcatUserInfo || !userInfo.cookieUserId) {
        //没有runningcatUserInfo表示没有注册或者登录过，需要跳转到登录
        res.redirect("/public/login.html?fromUrl="+fromUrl);
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
                如果用户是登录的把返回的用户信息写入cookie.
             */
            if ("0000" == data.code && data.isSuccess) {
                let newUserInfo = JSON.stringify(data.record);
                /*
                    把runningcat用户信息存入cookie中.
                 */
                res.cookie('runningcatUserInfo', newUserInfo, { maxAge: maxAge, path: '/' });
                next();
            } else if ("0001" == data.code) {
                res.redirect("/public/login.html?fromUrl="+fromUrl);
            } else if ("100269" == data.code) {
                let newUserInfo = JSON.stringify(data.record);
                /*
                    把runningcat用户信息存入cookie中.
                 */
                console.log("newUserInfo:::"+newUserInfo);
                res.cookie('runningcatUserInfo', newUserInfo, { maxAge: maxAge, path: '/' });
                res.redirect("/profile/edit-profile.html");
            } else if ("100270" == data.code) {
                res.redirect("/public/register.html");
            } else {
                res.redirect("/public/login.html?fromUrl="+fromUrl);
            }
        }, next);
    }
}

/*
    完善资料
 */
exports.updateUserInfo = (req, res, next) => {
    new rest({
        functionCode: 'member.updateUserInfo',
    }).post(req, res, next);
}

/*
    根据会员ID查找会员信息
 */

exports.memberInfo = (req, res, next) => {
    new rest({
        functionCode: 'member.memberinfo',
    }).link(req, res, next);
}

/*
    根据会员ID查找会员信息
 */

exports.getUserInfo = (req, res, next) => {
    new rest({
        functionCode: 'member.memberinfo',
    }).post(req, res, next);
}

/*
    根据unionId获取用户信息
 */
exports.getUsrInfoByUnionId = (req, res, next) => {
    new rest({
        functionCode: 'member.getUsrInfoByUnionId',
    }).post(req, res, next);
}

/*
    根据手机号登录
 */
exports.loginByMobileNo = (req, res, next) => {
    new rest({
        functionCode: 'member.loginByMobileNo',
    }).post(req, res, next);
}
