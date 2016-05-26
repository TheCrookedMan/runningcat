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
	校验用户是否已登录
 */

exports.checkLogin = (req, res, next) => {
    new rest({
        functionCode: 'member.checkLogin',
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
