import express from 'express';
import user from './api/user';
import profile from './api/profile';
const router = express.Router();

// user
router.post('/login',user.login);
router.post('/registeUser',user.registeUser);
// router.post('/checkLogin',user.checkLogin);
router.post('/sendSMS',user.sendSMS);
router.post('/checkSmscode',user.checkSmscode);

//profile
router.post('/catfood',profile.catfood);
module.exports = router;