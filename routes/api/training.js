import rest from '../rest/_util';
/*
	自助训练
 */

/*自助训练列表*/
exports.training = (req, res, next) => {
    new rest({
        functionCode: 'selfCourse.querySelfCourseList',
    }).link(req, res, next);
}

/*自助训练详情*/
exports.trainingDetail = (req, res, next) => {
    new rest({
        functionCode: 'selfCourse.querySelfCourseInfo',
    }).post(req, res, next);
}

/*自助训练详情 link*/
exports.trainingInfo = (req, res, next) => {
    new rest({
        functionCode: 'selfCourse.querySelfCourseInfo',
    }).link(req, res, next);
}

/*自助训练时间列表*/
exports.querySelfPlanTimeList = (req, res, next) => {
    new rest({
        functionCode: 'selfCourse.querySelfPlanTimeList',
    }).link(req, res, next);
}
