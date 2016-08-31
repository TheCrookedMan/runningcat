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


