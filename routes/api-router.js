import express from 'express';
import user from './api/user';
import profile from './api/profile';
import course from './api/course';
import till from './api/till';
const router = express.Router();

// user
router.post('/login',user.login);
router.post('/registeUser',user.registeUser);
// router.post('/checkLogin',user.checkLogin);
router.post('/sendSMS',user.sendSMS);
router.post('/checkSmscode',user.checkSmscode);

//profile
router.post('/catfood',profile.catfood);
router.post('/usrMemberCatfood/selectUsrSurplusAmount',profile.surplus);

//course
router.post('/course',course.course);
router.post('/coursePlan/queryCoursePlanInfo',course.courseDetail);

//till
router.post('/till',till.till);
router.post('/specialClass/querySpecialClassInfo',till.tillDetail);

module.exports = router;