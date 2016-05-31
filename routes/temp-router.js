import express from 'express';
import common from './common';
import profile from './api/profile';
let router = express.Router();

router.get('/catfood.template', [profile.catfood], (req, res, next) => {
    let data = res.data['usrMemberCatfood.getUsrMemberCatfoods']['record'];
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            data[i]['showCircle'] = true
        } else {
            let curr, prev;
            curr = common.formatDate(data[i].modifyTime,'yyyy-MM');
            prev = common.formatDate(data[i-1].modifyTime,'yyyy-MM');
            if (curr != prev) {
                data[i]['showCircle'] = true
            } else {
                data[i]['showCircle'] = false
            }
        }
    }
    return res.render('_partial/template/catfood', {
        data: data
    });
});

module.exports = router;
