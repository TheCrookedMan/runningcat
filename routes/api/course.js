import rest from '../rest/_util';
/*
    单次课程
 */

/*课程列表*/
exports.course = (req, res, next) => {
    new rest({
        functionCode: 'coursePlan.queryCoursePlanList',
    }).link(req, res, next);
}

/*课程详情*/
exports.courseDetail = (req, res, next) => {
    new rest({
        functionCode: 'coursePlan.queryCoursePlanInfo',
    }).post(req, res, next);
}

/*课程详情 link*/
exports.queryCoursePlanInfo = (req, res, next) => {
    new rest({
        functionCode: 'coursePlan.queryCoursePlanInfo',
    }).link(req, res, next);
}

/*课程列表*/
exports.queryCoursePlanTimeList = (req, res, next) => {
    new rest({
        functionCode: 'coursePlan.queryCoursePlanTimeList',
    }).link(req, res, next);
}
