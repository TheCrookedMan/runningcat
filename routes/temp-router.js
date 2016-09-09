import express from 'express';
import profile from './api/profile';
import shop from './api/shop';
import course from './api/course';
import usrClass from './api/usr-class';
import user from './api/user';
import till from './api/till';
import coach from './api/coach';
import training from './api/training';
import order from './api/order';
let router = express.Router();

/*店铺*/
router.get('/oftenshop.template', [shop.queryOftenStore], (req, res, next) => {
    return res.render('_partial/template/oftenshop', {
        data: res.data['store.queryOftenStore']['record']
    });
});

router.get('/shop.template', [shop.queryCopStoreList], (req, res, next) => {
    return res.render('_partial/template/shop', {
        data: res.data['store.queryCopStoreList']['record']
    });
});

router.get('/shopSearch.template', [shop.queryIndexStoreList], (req, res, next) => {
    return res.render('_partial/template/shopSearch', {
        data: res.data['store.queryIndexStoreList']['record']
    });
});

/*猫粮*/
router.get('/catfood.template', [profile.catfood], (req, res, next) => {
    return res.render('_partial/template/catfood', {
        data: res.data['usrMemberCatfood.getUsrMemberCatfoods']['record']
    });
});
/*我的特训营*/
router.get('/getUsrSpecialClass.template', [profile.getUsrSpecialClass], (req, res, next) => {
    return res.render('_partial/template/getUsrSpecialClass', {
        data: res.data['usrClasstimeOrder.getUsrSpecialClass']['record']
    });
});

router.get('/getUsrSpecialOnce.template', [profile.getUsrSpecialOnce], (req, res, next) => {
    let specialId = req.body.specialId;
    return res.render('_partial/template/getUsrSpecialOnce', {
        data: res.data['usrClasstimeOrder.getUsrSpecialOnce']['record'],
        specialId: specialId
    });
});
/*我的课程作业*/
router.get('/getCourseWorkInfo.template', [profile.getCourseWorkInfo], (req, res, next) => {
    return res.render('_partial/template/getCourseWorkInfo', {
        data: res.data['usrCoursetimeWork.getCourseWorkInfo']['record']
    });
});
/*我的排名*/
router.get('/rankingFuel.template', [profile.queryUserFuelList], (req, res, next) => {
    return res.render('_partial/template/rankingFuel', {
        data: res.data['member.queryUserFuelList']['record']
    });
});

router.get('/rankingTrain.template', [profile.queryUserTrainList], (req, res, next) => {
    return res.render('_partial/template/rankingTrain', {
        data: res.data['member.queryUserTrainList']['record']
    });
});
/*常规课*/
router.get('/course.template', [course.course], (req, res, next) => {
    // console.log("::::"+JSON.stringify(res.data['coursePlan.queryCoursePlanList']['record']));
    return res.render('_partial/template/course', {
        data: res.data['coursePlan.queryCoursePlanList']['record']
    });
});
/*特训营*/
router.get('/till.template', [till.till], (req, res, next) => {
    return res.render('_partial/template/till', {
        data: res.data['specialClass.querySpecialClasses']['record']
    });
});

/*
    我的单次课模板
 */
router.get('/tmpl-single-class.template', [profile.getUsrClasstimeOrder], (req, res, next) => {
    return res.render('_partial/template/tmpl-single-class', {
        data: res.data['usrClasstimeOrder.getUsrClasstimeOrder']['record']
    });
});

/*
    我的私教课模板
 */
router.get('/tmpl-private-coach.template', [profile.getUsrPrivateClass], (req, res, next) => {
    return res.render('_partial/template/tmpl-private-coach', {
        data: res.data['usrPrivateClasstime.getUsrPrivateClass']['record']
    });
});

/**
 * 我的自助训练列表模板
 */
router.get('/tmpl-training-list.template', [profile.getUsrSelfClass], (req, res, next) => {
    return res.render('_partial/template/tmpl-training-list', {
        data: res.data['selfClasstime.getSelfClasstimes']['record']
    });
});

/*
    用户系统消息模板
 */
router.get('/message.template', [profile.getMemberMessages], (req, res, next) => {
    return res.render('_partial/template/message', {
        data: res.data['member.getMemberMessages']['record']
    });
});

/*
    单次课评价模板
 */
router.get('/comment-class.template', [course.queryCoursePlanInfo, usrClass.getUsrClassEvaluate_classEvaluate, usrClass.getTrainFeel, usrClass.getMemberFoodNum], (req, res, next) => {
    let courseId = req.query.courseId,
        onceId = req.query.onceId;
    return res.render('_partial/template/comment-class', {
        data: res.data,
        courseId: courseId,
        onceId: onceId
    });
});

/*
    私教课评价模板
 */
router.get('/private-coach-evaluate.template', [course.queryCoursePlanInfo, usrClass.usrPrivateClassEvaluate_getUsrClassEvaluate, usrClass.getTrainFeel, usrClass.getMemberFoodNum], (req, res, next) => {
    let courseId = req.query.courseId,
        onceId = req.query.onceId;
    return res.render('_partial/template/private-coach-evaluate', {
        data: res.data,
        courseId: courseId,
        onceId: onceId
    });
});

/* 自助训练营模板 */
router.get('/training-evaluate.template',[course.queryCoursePlanInfo, usrClass.usrSelfClassEvaluate_getEvaluate], (req, res, next) => {
    let courseId = req.query.courseId,
        onceId = req.query.onceId;
    return res.render('_partial/template/training-evaluate', {
        data: res.data,
        courseId: courseId,
        onceId: onceId
    });
});

/*
    特训营评价模板
 */
router.get('/special-comment-class.template', [till.getUsrSpecialOnceInfo, usrClass.getUsrClassEvaluate_specialEvaluate, usrClass.getTrainFeel, usrClass.getMemberFoodNum], (req, res, next) => {
    return res.render('_partial/template/special-comment-class', {
        data: res.data
    });
});

router.get('/edit-profile.template', [user.memberInfo], (req, res, next) => {
    return res.render('_partial/template/edit-profile', {
        memberInfo: res.data['member.memberinfo']['record']
    });
});

/*
    充值记录模板
 */
router.get('/recharge-record.template', [order.selectUsrRechargeOrderList], (req, res, next) => {
    return res.render('_partial/template/recharge-record', {
        data: res.data['order.selectUsrRechargeOrderList']['record']
    });
});

/*公共查询头部课程信息*/
router.get('/pubclass.template', [course.queryCoursePlanInfo], (req, res, next) => {
    return res.render('_partial/template/pubclass', {
        data: res.data['coursePlan.queryCoursePlanInfo']['record']
    });
});

/*公共查询头部特训营信息*/
router.get('/pubtill.template', [till.getUsrSpecialOnceInfo], (req, res, next) => {
    return res.render('_partial/template/pubtill', {
        data: res.data['usrClasstimeOrder.getUsrSpecialOnceInfo']['record']
    });
});

/*查询作业、提交作业*/
router.get('/submitclass.template', [usrClass.findMyCourseWorkt], (req, res, next) => {
    return res.render('_partial/template/submitclass', {
        data: res.data['usrCoursetimeWork.findMyCourseWorkt']['record']
    });
});

/*充值 查询优惠政策详细信息*/
router.get('/copSalePolicyDetail.template', [order.selectCopSalePolicy], (req, res, next) => {
    let memberLevelSalePolicyInfo = req.query.memberLevelSalePolicyInfo;
    return res.render('_partial/template/copSalePolicyDetail', {
        data: res.data['order.selectCopSalePolicy']['record'],
        memberLevelSalePolicyInfo: memberLevelSalePolicyInfo
    });
});

/*特训营 充值 查询优惠政策详细信息*/
router.get('/selectCopSpecialDiscountPolicy.template', [order.selectCopSpecialDiscountPolicy], (req, res, next) => {
    let memberLevelSalePolicyInfo = req.query.memberLevelSalePolicyInfo;
    return res.render('_partial/template/selectCopSpecialDiscountPolicy', {
        data: res.data['order.selectCopSpecialDiscountPolicy']['record'],
        memberLevelSalePolicyInfo: memberLevelSalePolicyInfo
    });
});

/* 课时支付模板 */
router.get('/timeMoneyPayment_rechargelist.template', [order.selectUsrRechargeOrderList], (req, res, next) => {
    let needCourseNum = req.query.needCourseNum;
    let usrRechargeOrderRemainNum = req.query.usrRechargeOrderRemainNum;
    return res.render('_partial/template/timeMoneyPayment_rechargelist', {
        usrRechargeOrderList: res.data['order.selectUsrRechargeOrderList']['record'],
        needCourseNum: needCourseNum,
        usrRechargeOrderRemainNum: usrRechargeOrderRemainNum
    });
});

/*查询排课时间*/
router.get('/courseDate.template', [course.queryCoursePlanTimeList], (req, res, next) => {
    return res.render('_partial/template/courseDate', {
        data: res.data['coursePlan.queryCoursePlanTimeList']['record']
    });
});

/*查询私教课时间列表*/
router.get('/coachDate.template', [coach.queryPrivatePlanTimeList], (req, res, next) => {
    return res.render('_partial/template/coachDate', {
        data: res.data['privateCourse.queryPrivatePlanTimeList']['record']
    });
});

/*查询自助训练时间列表*/
router.get('/trainDate.template', [training.querySelfPlanTimeList], (req, res, next) => {
    return res.render('_partial/template/trainDate', {
        data: res.data['selfCourse.querySelfPlanTimeList']['record']
    });
});

/*私教课*/
router.get('/coach.template', [coach.coach], (req, res, next) => {
    return res.render('_partial/template/coach', {
        data: res.data['privateCourse.queryPrivateCourseList']['record']
    });
});

/*自助训练营*/
router.get('/training.template', [training.training], (req, res, next) => {
    return res.render('_partial/template/training', {
        data: res.data['selfCourse.querySelfCourseList']['record']
    });
});

module.exports = router;
