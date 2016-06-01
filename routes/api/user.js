import rest from '../rest/_util';
/*
    会员登录
 */
exports.login = (req, res, next) => {
    new rest({
        functionCode: 'member.userLogin',
    }).post(req, res);
}

/*
    会员注册
 */

exports.registeUser = (req, res, next) => {
    new rest({
        functionCode: 'member.registeUser',
    }).post(req, res);
}

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

exports.loginByopenId = (openId, success, error) => {
    new rest({
        functionCode: 'member.loginByopenId',
        data: {
            openId: openId
        }
    }).normalRequest(success, error);
}


/*
    根据cookieUserId来验证用户是否登录
 */

exports.checkLogin = (req, res, next) => {
    let cookieUserId = req.cookies.cookieUserId;
    if (!cookieUserId) {
        //没有cookieUserId没有注册或者登录过，需要跳转到登录
    } else {
        new rest({
            functionCode: 'member.checkLogin',
            data: {
                cookieUserId: cookieUserId
            }
        }).normalRequest(function(success){}, function(error){});
    }
}