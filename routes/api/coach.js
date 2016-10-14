import rest from '../rest/_util';
/*
    私教
 */

/*私教列表*/
exports.coach = (req, res, next) => {
    new rest({
        functionCode: 'privateCourse.queryPrivateCourseList',
    }).link(req, res, next);
}

/*私教详情*/
exports.coachDetail = (req, res, next) => {
    new rest({
        functionCode: 'privateCourse.queryPrivateCourseInfo',
    }).post(req, res, next);
}

exports.coachDetail_link = (req, res, next) => {
    new rest({
        functionCode: 'privateCourse.queryPrivateCourseInfo',
    }).link(req, res, next);
}


/*私教详情 link*/
exports.coachInfo = (req, res, next) => {
    new rest({
        functionCode: 'privateCourse.queryPrivateCourseInfo',
    }).link(req, res, next);
}

/*私教时间列表*/
exports.queryPrivatePlanTimeList = (req, res, next) => {
    new rest({
        functionCode: 'privateCourse.queryPrivatePlanTimeList',
    }).link(req, res, next);
}

/*会员私教课评价页面课程总结*/
exports.getClasstimeSummary = (req, res, next) => {
    new rest({
        functionCode: 'usrPrivateClassEvaluate.getClasstimeSummary',
    }).link(req, res, next);
}