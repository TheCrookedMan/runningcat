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