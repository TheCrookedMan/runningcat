import rest from '../rest/_util';
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
    根据 openId 登录
 */

exports.loginByopenId = (openId, success, next) => {
    let data = {};
    new rest({
        functionCode: 'member.loginByopenId',
        data: {
            openId: openId
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
        storeId = req.query.storeId;
    if (!runningcatUserInfo) {
        //没有runningcatUserInfo表示没有注册或者登录过，需要跳转到登录
        //从店铺页面验证的授权，如果用户没有权限跳转登录页面的时候带上 storeId
        if (!!storeId) {
            res.redirect("/public/login.html?storeId=" + storeId);
        } else {
            res.redirect("/public/login.html");
        }
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
                //从店铺页面验证的授权，如果用户没有权限跳转登录页面的时候带上 storeId
                if (!!storeId) {
                    res.redirect("/public/login.html?storeId=" + storeId);
                } else {
                    res.redirect("/public/login.html");
                }
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