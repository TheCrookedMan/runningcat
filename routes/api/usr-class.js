import rest from '../rest/_util';
/*
	单次课签到
 */
exports.doSignIn = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.doSignIn',
    }).post(req, res);
}

/*
	单次课请假
 */
exports.doLeave = (req, res, next) => {
    new rest({
        functionCode: 'usrClasstimeOrder.doLeave',
    }).post(req, res);
}

/*
	查询课次作业
 */

exports.getCourseWorkInfo = (req, res, next) => {
    new rest({
        functionCode: 'usrCoursetimeWork.getCourseWorkInfo',
    }).post(req, res);
}

/*
	查询我的课次作业
 */

exports.findMyCourseWorkt = (req, res, next) => {
    new rest({
        functionCode: 'usrCoursetimeWork.findMyCourseWorkt',
    }).post(req, res);
}

/*
	提交课次作业
 */

exports.doCourseWork = (req, res, next) => {
    new rest({
        functionCode: 'usrCoursetimeWork.doCourseWork',
    }).post(req, res);
}

/*
	修改课次作业
 */

exports.updateCourseWork = (req, res, next) => {
    new rest({
        functionCode: 'usrCoursetimeWork.updateCourseWork',
    }).post(req, res);
}