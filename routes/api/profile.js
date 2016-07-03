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
    }).post(req, res, next);
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
    /*
        点赞
     */
exports.bePraise = (req, res, next) => {
    new rest({
        functionCode: 'member.bePraise',
    }).post(req, res, next);
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
    }).post(req, res, next);
}

/*
    设置消息已读
 */
exports.redMsg = (req, res, next) => {
    new rest({
        functionCode: 'member.redMsg',
    }).post(req, res, next);
}

/* 查询我的特训营 */
exports.getUsrSpecialClass = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.getUsrSpecialClass',
    }).link(req, res, next);
}

/* 查询我的特训营课程 */
exports.getUsrSpecialOnce = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.getUsrSpecialOnce',
    }).link(req, res, next);
}

/*特训营详情*/
exports.tillDetail = (req, res, next) => {
    new rest({
        functionCode: 'specialClass.querySpecialClassInfo',
    }).post(req, res);
}

/*
    特训营签到
 */
exports.doSignIn = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.doSpecialSignIn',
    }).post(req, res, next);
}

/*
    特训营请假
 */
exports.doLeave = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.doSpecialLeave',
    }).post(req, res, next);
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
    }).post(req, res, next);
}

/* 查询用户卡路里 */
exports.queryUserCaLone = (req, res, next) => {
    new rest({
        functionCode: 'userCenter.queryUserCaLone',
    }).post(req, res, next);
}

/* 查询我的成就数据 */
exports.getAchievement = (req, res, next) => {
    new rest({
        functionCode: 'member.getAchievement',
    }).post(req, res, next);
}

/* 我的成就每月锻炼次数 */
exports.getTrainTimes = (req, res, next) => {
    new rest({
        functionCode: 'member.getTrainTimes',
    }).post(req, res, next);
}

/* 查询用户能量 */
exports.queryUserFuel = (req, res, next) => {
    new rest({
        functionCode: 'userCenter.queryUserFuel',
    }).post(req, res, next);
}


