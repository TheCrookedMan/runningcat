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
    let data = {};
    new rest({
        functionCode: 'member.loginByopenId',
        data: {
            openId: openId
        }
    }).normalRequest(function(d) {
        if (undefined == d || "" == d) {
            data = {
                isSuccess: false,
                msg: '操作失败！'
            };
        } else {
            data = JSON.parse(d);
        }
        success(data);
    }, error);
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
        let cookieUserId = runningcatUserInfo.cookieUserId;
        new rest({
            functionCode: 'member.checkLogin',
            data: {
                cookieUserId: cookieUserId
            }
        }).normalRequest(function(success) {
            //请求成功，需要区分信息
        }, function(error) {
            //服务器请求失败
        });
    }
}
