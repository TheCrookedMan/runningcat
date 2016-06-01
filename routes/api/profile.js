import rest from '../rest/_util';
/*
	猫粮纪录
 */

/*猫粮记录*/
exports.catfood = (req, res, next) => {
    new rest({
        functionCode: 'usrMemberCatfood.getUsrMemberCatfoods',
    }).link(req, res,next);
}
/*查询剩余猫粮*/
exports.surplus = (req, res, next) => {
    new rest({
        functionCode: 'usrMemberCatfood.selectUsrSurplusAmount',
    }).post(req, res);
}