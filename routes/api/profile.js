import rest from '../rest/_util';
/*
    猫粮纪录
 */

exports.catfood = (req, res, next) => {
    new rest({
        functionCode: 'usrMemberCatfood.getUsrMemberCatfoods',
    }).link(req, res, next);
}

/*
  查询剩余猫粮
*/

exports.surplus = (req, res, next) => {
    new rest({
        functionCode: 'usrMemberCatfood.selectUsrSurplusAmount',
    }).post(req, res);
}


/*查询用户活力值排名*/
exports.queryUserFuelList = (req, res, next) => {
    new rest({
        functionCode: 'member.queryUserFuelList',
    }).link(req, res, next);
}

/*查询用户训练时间排名*/
exports.queryUserTrainList = (req, res, next) => {
    new rest({
        functionCode: 'member.queryUserTrainList',
    }).link(req, res, next);
}

/*查询用户的单次课*/

exports.getUsrClasstimeOrder = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.getUsrClasstimeOrder',
    }).link(req, res, next);
}

/* 查询用户系统消息 */
exports.getMemberMessages = (req, res, next) => {
    new rest({
        functionCode: 'member.getMemberMessages',
    }).link(req, res, next);
}

/*
    删除系统消息
 */
exports.delMsg = (req, res, next) => {
    new rest({
        functionCode: 'member.delMsg',
    }).post(req, res);
}

/*
    设置消息已读
 */
exports.redMsg = (req, res, next) => {
    new rest({
        functionCode: 'member.redMsg',
    }).post(req, res);
}

/* 查询我的特训营 */
exports.getUsrSpecialClass = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.getUsrSpecialClass',
    }).link(req, res, next);
}

/* 查询课次作业 */
exports.getCourseWorkInfo = (req, res, next) => {
    new rest({
        functionCode: 'usrCoursetimeWork.getCourseWorkInfo',
    }).link(req, res, next);
}

/* 查询用户心率 */
exports.queryUserHeartrate = (req, res, next) => {
    new rest({
        functionCode: 'userCenter.queryUserHeartrate',
    }).post(req, res);
}

/* 查询用户卡路里 */
exports.queryUserCaLone = (req, res, next) => {
    new rest({
        functionCode: 'userCenter.queryUserCaLone',
    }).post(req, res);
}