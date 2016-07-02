import rest from '../rest/_util';

/*
  查询出优惠的金额信息和优惠的猫粮信息
*/
exports.selectDiscountInfo = (req, res, next) => {
    new rest({
        functionCode: 'order.selectDiscountInfo',
    }).post(req, res, next);
}

/*
  查询特训营优惠的金额信息和优惠的猫粮信息
*/
exports.selectCopSpecialDiscountPolicyInfo = (req, res, next) => {
    new rest({
        functionCode: 'order.selectCopSpecialDiscountPolicyInfo',
    }).post(req, res, next);
}

/*
	课时充值接口
 */
exports.classRecharge = (req, res, next) => {
    new rest({
        functionCode: 'order.classRecharge',
    }).post(req, res, next);
}

/*
	单次课现金支付课时功能
 */
exports.classTimeMoneyPayment = (req, res, next) => {
    new rest({
        functionCode: 'order.classTimeMoneyPayment',
    }).post(req, res, next);
}

/*
	单次课课时支付预约课程
 */
exports.classTimePayOrder = (req, res, next) => {
    new rest({
        functionCode: 'order.classTimePayOrder',
    }).post(req, res, next);
}

/*
	查询优惠政策详细信息
 */
exports.selectCopSalePolicy = (req, res, next) => {
    new rest({
        functionCode: 'order.selectCopSalePolicy',
    }).link(req, res, next);
}

/*
    查询特训营优惠政策详细信息
 */
exports.selectCopSpecialDiscountPolicy = (req, res, next) => {
    new rest({
        functionCode: 'order.selectCopSpecialDiscountPolicy',
    }).link(req, res, next);
}

/*
	特训营现金支付课时功能
 */
exports.specialClassMoneyPayment = (req, res, next) => {
    new rest({
        functionCode: 'order.specialClassMoneyPayment',
    }).post(req, res, next);
}

/*
	特训营课时支付预约课程
 */
exports.specialClassPayOrder = (req, res, next) => {
    new rest({
        functionCode: 'order.specialClassPayOrder',
    }).post(req, res, next);
}

/*
	充值订单列表
 */
exports.selectUsrRechargeOrderList = (req, res, next) => {
    new rest({
        functionCode: 'order.selectUsrRechargeOrderList',
    }).link(req, res, next);
}

/*
	查询剩余课时总数
 */
exports.selectUsrRechargeOrderRemainNum = (req, res, next) => {
    new rest({
        functionCode: 'order.selectUsrRechargeOrderRemainNum',
    }).post(req, res, next);
}

/* 单次课支付页面数据获取 */
exports.classTimeMoneyPaymentData = (req, res, next)=>{
    new rest({
        functionCode: 'order.classTimeMoneyPaymentData',
    }).post(req, res, next);
}

/* 特训营支付页面数据获取 */
exports.specialClassMoneyPaymentData = (req, res, next)=>{
    new rest({
        functionCode: 'order.specialClassMoneyPaymentData',
    }).post(req, res, next);
}