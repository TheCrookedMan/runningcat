import express from 'express';
import user from './api/user';
import profile from './api/profile';
import shop from './api/shop';
import course from './api/course';
import till from './api/till';
import usrClass from './api/usr-class';
import common from './api/common';
import wechat from './api/wechat';
import order from './api/order';
const router = express.Router();

// common
router.post('/common/getSysDictionary', common.getSysDictionary);
router.post('/common/getAreaList', common.getAreaList);
router.post('/common/uploadImage', common.uploadImage);

//wechat
router.post('/wechat/getJSApiTicket', wechat.getJSApiTicket);

// user
router.post('/login', user.login);
router.post('/registeUser', user.registeUser);
// router.post('/checkLogin',user.checkLogin);
router.post('/sendSMS', user.sendSMS);
router.post('/checkSmscode', user.checkSmscode);

router.post('/user/getUsrInfoByUnionId',user.getUsrInfoByUnionId);

router.post('/updateUserInfo', user.updateUserInfo);
router.post('/memberInfo', user.memberInfo);
// 获取用户信息
router.post('/user/getUserInfo', user.getUserInfo);
router.post('/authLogin', user.authLogin);

//shop
router.post('/queryOftenStore', shop.queryOftenStore);
router.post('/queryCopStoreList', shop.queryCopStoreList);
router.post('/queryIndexStoreList', shop.queryIndexStoreList);

//profile
/*猫粮*/
router.post('/catfood', profile.catfood);
router.post('/usrMemberCatfood/selectUsrSurplusAmount', profile.surplus);
/*我的成就每月锻炼次数*/
router.post('/member/getTrainTimes', profile.getTrainTimes);
/*查询我的成就数据*/
router.post('/member/getAchievement', profile.getAchievement);
/*查询我的fuel*/
router.post('/userCenter/queryUserFuel', profile.queryUserFuel);

/* message */
router.post('/message/delMsg', profile.delMsg);
router.post('/message/redMsg', profile.redMsg);
/*till*/
router.post('/getUsrSpecialClass', profile.getUsrSpecialClass);
router.post('/getUsrSpecialOnce', profile.getUsrSpecialOnce);
router.post('/doSignIn', profile.doSignIn);
router.post('/doLeave', profile.doLeave);
router.post('/bePraise', profile.bePraise);
/*home*/
router.post('/getCourseWorkInfo', profile.getCourseWorkInfo);

/*排名*/
router.post('/queryUserFuelList', profile.queryUserFuelList);
router.post('/queryUserTrainList', profile.queryUserTrainList);

//course
router.post('/course', course.course);
router.post('/coursePlan/queryCoursePlanInfo', course.courseDetail);
router.post('/queryCoursePlanInfo', course.queryCoursePlanInfo);
router.post('/queryCoursePlanTimeList', course.queryCoursePlanTimeList);

//till
router.post('/till', till.till);
router.post('/specialClass/querySpecialClassInfo', till.tillDetail);
router.post('/querySpecialClassInfo', till.querySpecialClassInfo);

//usr-class
router.post('/usr-class/doSignIn', usrClass.doSignIn);
router.post('/usr-class/doLeave', usrClass.doLeave);
router.post('/usr-class/getCourseWorkInfo', usrClass.getCourseWorkInfo);
router.post('/usr-class/findMyCourseWorkt', usrClass.findMyCourseWorkt);
router.post('/usr-class/doCourseWork', usrClass.doCourseWork);
router.post('/usr-class/updateCourseWork', usrClass.updateCourseWork);

// userCenter
router.post('/userCenter/queryUserHeartrate', profile.queryUserHeartrate);
router.post('/userCenter/queryUserCaLone', profile.queryUserCaLone);

//单次课评价
router.post('/classEvaluate/addUsrClassEvaluate', usrClass.addUsrClassEvaluate_classEvaluate);
//特训营单次课添加评价
router.post('/specialEvaluate/addUsrClassEvaluate', usrClass.addUsrClassEvaluate_specialEvaluate);

// order
/*
	查询出优惠的金额信息和优惠的猫粮信息
 */
router.post('/order/selectDiscountInfo', order.selectDiscountInfo);
/*
	课时充值接口
 */
router.post('/order/classRecharge', order.classRecharge);
/*
	单次课现金支付课时功能
 */
router.post('/order/classTimeMoneyPayment', order.classTimeMoneyPayment);
/*
	单次课课时支付预约课程
 */
router.post('/order/classTimePayOrder', order.classTimePayOrder);
/*
	查询优惠政策详细信息
 */
// router.post('/order/selectCopSalePolicy',order.selectCopSalePolicy);
/*
	特训营现金支付课时功能
 */
router.post('/order/specialClassMoneyPayment', order.specialClassMoneyPayment);
/*
	特训营课时支付预约课程
 */
router.post('/order/specialClassPayOrder', order.specialClassPayOrder);
/*
	充值订单列表
 */
router.post('/order/selectUsrRechargeOrderRemainNum', order.selectUsrRechargeOrderRemainNum);

/* 单次课支付页面数据获取 */
router.post('/order/classTimeMoneyPaymentData',order.classTimeMoneyPaymentData);

/* 特训营支付页面数据获取 */
router.post('/order/specialClassMoneyPaymentData',order.specialClassMoneyPaymentData);


module.exports = router;
