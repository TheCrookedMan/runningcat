import express from 'express';
let router = express.Router();

import profile from './api/profile';

router.get('/catfood.template', [profile.catfood], (req, res, next) => {
    return res.render('_partial/template/catfood', {
        data: res.data['usrMemberCatfood.getUsrMemberCatfoods']['record']
    });
});

module.exports = router;