import express from 'express';
import user from './api/user';
import profile from './api/profile';
import shop from './api/shop';
import course from './api/course';
import till from './api/till';
import usrClass from './api/usr-class';
import common from './api/common';
import wechat from './api/wechat';
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

router.post('/updateUserInfo', user.updateUserInfo);
router.post('/memberInfo', user.memberInfo);
// 获取用户信息
router.post('/user/getUserInfo', user.getUserInfo);

//shop
router.post('/queryOftenStore', shop.queryOftenStore);
router.post('/queryCopStoreList', shop.queryCopStoreList);

//profile
/*猫粮*/
router.post('/catfood', profile.catfood);
router.post('/usrMemberCatfood/selectUsrSurplusAmount', profile.surplus);
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

//till
router.post('/till', till.till);
router.post('/specialClass/querySpecialClassInfo', till.tillDetail);

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

module.exports = router;
