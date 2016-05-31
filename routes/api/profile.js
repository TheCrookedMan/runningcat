import rest from '../rest/_util';
/*
	猫粮纪录
 */
exports.catfood = (req, res, next) => {
    new rest({
        functionCode: 'usrMemberCatfood.getUsrMemberCatfoods',
    }).link(req, res,next);
}