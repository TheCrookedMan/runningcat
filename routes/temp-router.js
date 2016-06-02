import express from 'express';
import common from './common';
import profile from './api/profile';
import course from './api/course';
import till from './api/till';
let router = express.Router();

router.get('/catfood.template', [profile.catfood], (req, res, next) => {
    return res.render('_partial/template/catfood', {
        data: res.data['usrMemberCatfood.getUsrMemberCatfoods']['record']
    });
});

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

router.get('/course.template', [course.course], (req, res, next) => {
    return res.render('_partial/template/course', {
        data: res.data['coursePlan.queryCoursePlanList']['record']
    });
});

router.get('/till.template', [till.till], (req, res, next) => {
    return res.render('_partial/template/till', {
        data: res.data['specialClass.querySpecialClasses']['record']
    });
});
module.exports = router;