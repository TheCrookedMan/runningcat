var util = require('../rest/_util');
/*
	会员登录
 */
exports.login = (req, res, next) => {
    new util({
        functionCode: 'member.userLogin',
    }).rest(req, res, next);
}

/*
	会员注册
 */

exports.registeUser = (req, res, next) => {
    new util({
        functionCode: 'member.registeUser',
    }).rest(req, res, next);
}

/*
	校验用户是否已登录
 */

exports.checkLogin = (req, res, next) => {
    new util({
        functionCode: 'member.checkLogin',
    }).rest(req, res, next);
}

/*
	发送验证码
 */

exports.sendSMS = (req, res, next) => {
    new util({
        functionCode: 'member.sendSMS',
    }).post(req, res, next);
    // new util(1,2).toString();
}

/*
	校验验证码是否正确
 */

exports.checkSmscode = (req, res, next) => {
    new util({
        functionCode: 'member.checkSmscode',
    }).rest(req, res, next);
}
