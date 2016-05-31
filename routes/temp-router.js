import express from 'express';
import common from './common';
import profile from './api/profile';
let router = express.Router();

router.get('/catfood.template', [profile.catfood], (req, res, next) => {
    return res.render('_partial/template/catfood', {
        data: res.data['usrMemberCatfood.getUsrMemberCatfoods']['record']
    });
});
module.exports = router;