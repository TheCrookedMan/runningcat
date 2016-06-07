import express from 'express';
import user from './api/user';
import common from './tool/common';
import wechatAuth from './api/wechat';
let router = express.Router();

/*
    微信公众号验证是否注册登录流程（先验证）
 */
router.get('/wechatAuth.html', (req, res, next) => {
    let options = req.query,
        redirect_uri = options.state;

    wechatAuth.accessToken(options.code, function(params) {
        let data = JSON.parse(params);
        //没有errcode字段表示请求成功
        if (!data.errcode) {
            if ("snsapi_userinfo" == data.scope) {
                let access_token = data.access_token,
                    openid = data.openid;
                user.loginByopenId(openid, (record) => {
                    /*
                        code：10015 用户没有注册，如果返回没有注册就获取用户的微信信息并且把信息写入本地的cookie.然后重定向至按钮对应的页面
                     */
                    if ("10015" == record.code) {
                        wechatAuth.getUserInfo(access_token, openid, function(userinfo) {
                            let info = JSON.parse(userinfo);
                            if (!info.openid) {
                                /*
                                    获取微信用户信息失败
                                 */
                                next({
                                    msg: "微信授权获取用户信息失败！"
                                });
                            } else {
                                /*
                                    返回的userinfo信息里面有openid证明请求返回成功
                                 */
                                common.setCookie("wechatUserInfo", userinfo, res);
                                res.redirect(redirect_uri);
                            }
                        });
                    } else if ("0000" == record.code) {
                        /*
                            使用用户openId登录成功
                         */
                        let runningcatUserInfo = JSON.stringify(record.record);
                        /*
                            把runningcat用户信息存入cookie中.
                         */
                        common.setCookie("runningcatUserInfo", runningcatUserInfo, res);
                        res.redirect(redirect_uri);
                    } else {
                        /*
                            其他错误处理
                         */
                        next({
                            msg: record.msg
                        });
                    }
                },next);
            } else if ("snsapi_base" == data.scope) {}
        } else {
            //error
            next({
                msg: "微信授权失败！"
            });
        }
    }, function(err) {
        //error
        next({
            msg: "微信授权失败！"
        });
    })
});

/*
    public 页面
 */

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

router.get('/public/login.html', (req, res, next) => {
    return res.render('public/login', { title: '登录' });
});

/*
    market 商城
 */

router.get('/market/market.html', (req, res, next) => {
    return res.render('market/market', { title: '商城' });
});
router.get('/market/payment.html', (req, res, next) => {
    return res.render('market/payment', { title: '支付' });
});
router.get('/market/productDetail.html', (req, res, next) => {
    return res.render('market/productDetail', { title: '商品详情' });
});


/*
    个人中心 profile 相关的页面，首先需要验证
 */
router.get('/profile/*.html', user.checkLogin);

router.get('/profile/profile.html', (req, res, next) => {
    return res.render('profile/profile', { title: '个人中心' });
});

router.get('/profile/catfood.html', (req, res, next) => {
    return res.render('profile/catfood', { title: '猫粮记录' });
});

router.get('/profile/calories.html', (req, res, next) => {
    return res.render('profile/calories', { title: '卡路里' });
});

router.get('/profile/class-recharge.html', (req, res, next) => {
    return res.render('profile/class-recharge', { title: '课时充值' });
});
/*
    单次课评价
 */
router.get('/profile/comment-class.html', (req, res, next) => {
    return res.render('profile/comment-class', { title: '评价' });
});
/*
    特训营单次课评价
 */
router.get('/profile/special-comment-class.html', (req, res, next) => {
    return res.render('profile/special-comment-class', { title: '评价' });
});

router.get('/profile/done-class.html', (req, res, next) => {
    return res.render('profile/done-class', { title: '我的单次课' });
});

router.get('/profile/done-till.html', (req, res, next) => {
    return res.render('profile/done-till', { title: '我的特训营' });
});

router.get('/profile/edit-profile.html', (req, res, next) => {
    return res.render('profile/edit-profile', { title: '完善信息' });
});

router.get('/profile/invite.html', (req, res, next) => {
    let runningcatUserInfo = JSON.parse(req.cookies.runningcatUserInfo);
    let memberId = runningcatUserInfo.memberId;
    return res.render('profile/invite', { title: 'RunningCat',memberId:memberId });
});

router.get('/profile/message.html', (req, res, next) => {
    return res.render('profile/message', { title: '系统消息' });
});

router.get('/profile/ranking.html', (req, res, next) => {
    return res.render('profile/ranking', { title: '活力值排名' });
});

router.get('/profile/recharge.html', (req, res, next) => {
    return res.render('profile/recharge', { title: '充值' });
});

router.get('/profile/single-class.html', (req, res, next) => {
    return res.render('profile/single-class', { title: '我的私教' });
});

router.get('/profile/homework-class.html', (req, res, next) => {
    let onceId = req.query.onceId;
    return res.render('profile/homework-class', { title: '单次课程作业', onceId: onceId  });
});

router.get('/profile/homework-till.html', (req, res, next) => {
    let onceId = req.query.onceId;
    return res.render('profile/homework-till', { title: '特训营作业', onceId: onceId  });
});


router.get('/profile/till-list.html', (req, res, next) => {
    let specialId = req.query.specialId;
    return res.render('profile/till-list', { title: '我的特训营', specialId: specialId });
});

router.get('/profile/till.html', (req, res, next) => {
    let specialId = req.query.specialId;
    return res.render('profile/till', { title: '我的特训营', specialId: specialId });
});

router.get('/profile/heartrate.html', (req, res, next) => {
    return res.render('profile/heartrate', { title: '心率' });
});




/*
    私教课
 */
router.get('/coach/coach.html', (req, res, next) => {
    return res.render('coach/coach', { title: 'RUNNINGCAT BOX' });
});

router.get('/course/pay-page.html', (req, res, next) => {
    return res.render('course/pay-page', { title: '私教课支付页面' });
});
router.get('/course/pay-sucess.html', (req, res, next) => {
    return res.render('course/pay-sucess', { title: '约课成功' });
});
router.get('/course/course.html', (req, res, next) => {
    return res.render('course/course', { title: '单次课程' });
});

router.get('/course/course-detail.html', (req, res, next) => {
    let courseId = req.query.courseId;
    let dayOfWeek = req.query.dayOfWeek;
    let imgUrl = req.query.imgUrl;
    return res.render('course/course-detail', { title: '课程详情', courseId: courseId, dayOfWeek: dayOfWeek, imgUrl: imgUrl });
});

/*
    特训营
 */


router.get('/till/pay-page.html', (req, res, next) => {
    return res.render('till/pay-page', { title: '特训营支付页面' });
});

router.get('/till/pay-sucess.html', (req, res, next) => {
    return res.render('till/pay-sucess', { title: '约课成功' });
});

router.get('/till/till.html', (req, res, next) => {
    return res.render('till/till', { title: '特训营' });
});

router.get('/till/till-detail.html', (req, res, next) => {
    let specialId = req.query.specialId;
    return res.render('till/till-detail', { title: '特训营详情', specialId: specialId });
});



// router.get('*.html', (req, res, next) => {
//     var url = req.url;
//     var allPath = url.substring(0, url.indexOf(".html"));
//     // var filename = allPath.substring(allPath.lastIndexOf("/"));
//     var filename = allPath.substring(1);
//     console.log("filename:::" + filename);
//     return res.render(filename, { title: filename });
// });

/* GET home page. */

router.get('*', (req, res, next) => {
    return res.render('public/shop', { title: '课程' });
});

module.exports = router;
