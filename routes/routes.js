import express from 'express';
import user from './api/user';
import wechatAuth from './api/wechat';

let router = express.Router();

router.get('/public/register.html', (req, res, next) => {
    return res.render('public/register', { title: '注册' });
});
router.get('/public/profile.html', (req, res, next) => {
    let params = req.query;
    return res.render('public/profile', { title: '完善资料', password: params.password, mobileNo: params.mobileNo });
});

router.get('/public/shop.html', (req, res, next) => {
    return res.render('public/shop', { title: '店铺' });
});

router.get('/profile/catfood.html', (req, res, next) => {
    return res.render('profile/catfood', { title: '猫粮记录' });
});

router.get('/wechatAuth.html', (req, res, next) => {
    let options = req.query;
    wechatAuth.accessToken(options.code,function(data){
        //没有errcode字段表示请求成功
        if(!data.errcode){
            
        }
    })
});

router.get('*.html', (req, res, next) => {
    var url = req.url;
    var allPath = url.substring(0, url.indexOf(".html"));
    // var filename = allPath.substring(allPath.lastIndexOf("/"));
    var filename = allPath.substring(1);
    console.log("filename:::" + filename);
    return res.render(filename, { title: filename });
});

/* GET home page. */

router.get('*', (req, res, next) => {
    return res.render('index', { title: 'index' });
});

module.exports = router;
