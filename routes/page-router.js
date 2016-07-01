import express from 'express';
import user from './api/user';
import common from './tool/common';
import wechatAuth from './api/wechat';
import { maxAge } from './constants';

let router = express.Router();
/*
    微信公众号验证是否注册登录流程（先验证）
 */
// router.get('/wechatAuth.html', (req, res, next) => {
//     let options = req.query,
//         redirect_uri = options.state;
//     let list = [];

//     wechatAuth.accessToken(options.code, function(params) {

//         let data = JSON.parse(params);
//         //没有errcode字段表示请求成功
//         if (!data.errcode) {
//             if ("snsapi_userinfo" == data.scope) {

//                 let access_token = data.access_token,
//                     openid = data.openid;

//                 res.cookie('openId', openid, { maxAge: 31536000, path: '/' });
//                 wechatAuth.getUserInfo(access_token, openid, function(userinfo) {
//                     let info = JSON.parse(userinfo);
//                     if (!info.openid) {
//                         /*
//                             获取微信用户信息失败
//                          */
//                         next({
//                             msg: "微信授权获取用户信息失败！"
//                         });
//                     } else {
//                         /*
//                             返回的userinfo信息里面有openid证明请求返回成功
//                          */
//                         res.cookie('wechatUserInfo', userinfo, { maxAge: 31536000, path: '/' });
//                         user.loginByunionId(info.unionid, (record) => {
//                             /*
//                                 code：10015 用户没有注册，如果返回没有注册就获取用户的微信信息并且把信息写入本地的cookie.然后重定向至按钮对应的页面
//                              */
//                             res.cookie('runningcatUserInfo', "{}", { maxAge: 31536000, path: '/' });
//                             if ("10015" == record.code) {
//                                 res.redirect(redirect_uri);
//                             } else if ("0000" == record.code) {
//                                 /*
//                                     使用用户openId登录成功
//                                  */
//                                 let runningcatUserInfo = JSON.stringify(record.record);
//                                 /*
//                                     把runningcat用户信息存入cookie中.
//                                  */
//                                 res.cookie('runningcatUserInfo', runningcatUserInfo, { maxAge: 31536000, path: '/' });

//                                 // redirect_uri 如果为空的话，自动跳转至 /public/shop.html

//                                 if (!redirect_uri) {
//                                     res.redirect("/public/shop.html");
//                                 } else {
//                                     /*
//                                         redirect_uri 跳转链接不能有登录、注册等页面跳转 因为已经登录成功了。如果 redirect_uri 含有下面的链接字符 那么自动跳转到 /public/shop.html
//                                      */
//                                     if (redirect_uri.indexOf('/public/register.html') == -1 && redirect_uri.indexOf('/public/profile.html') == -1 && redirect_uri.indexOf('/public/login.html') == -1) {
//                                         res.redirect(redirect_uri);
//                                     } else {
//                                         res.redirect("/public/shop.html");
//                                     }
//                                 }
//                             } else if ("100269" == record.code) {
//                                 /*
//                                     信息不完善需要跳转至 完善信息页面。
//                                  */
//                                 res.redirect("/public/profile.html?type=improve_and_perfect");
//                             } else if ("100270" == record.code) {
//                                 /*
//                                     信息不完善，没有手机号需要跳转至 注册页面。
//                                  */
//                                 res.redirect("/public/register.html?type=improve_and_perfect");
//                             } else {
//                                 /*
//                                     其他错误处理
//                                  */
//                                 next({
//                                     msg: record.msg
//                                 });
//                             }
//                         }, next);
//                     }
//                 });
//             } else if ("snsapi_base" == data.scope) {}
//         } else {
//             //error
//             next({
//                 msg: "微信授权失败！"
//             });
//         }
//     }, function(err) {
//         //error
//         next({
//             msg: "微信授权失败！"
//         });
//     });
// });

router.get('/wechatAuth.html', (req, res, next) => {
    let options = req.query,
        redirect_uri = options.state,
        tenantId = options.tenantId;
    let list = [];
    res.cookie('tenantId', tenantId, { maxAge: maxAge, path: '/' });

    wechatAuth.accessToken(options.code, function(params) {

        let data = JSON.parse(params);
        //没有errcode字段表示请求成功
        if (!data.errcode) {
            if ("snsapi_userinfo" == data.scope) {
                let access_token = data.access_token,
                    openid = data.openid;

                res.cookie('openId', openid, { maxAge: maxAge, path: '/' });
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
                        res.cookie('wechatUserInfo', userinfo, { maxAge: maxAge, path: '/' });
                        res.redirect("/public/shop.html");
                    }
                });
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
    });
});

/*
    public 页面
 */

router.get('/public/register.html', (req, res, next) => {
    let refereeId = req.query.refereeId;
    return res.render('public/register', { title: '注册', refereeId: refereeId });
});
router.get('/public/profile.html', (req, res, next) => {
    let params = req.query;
    return res.render('public/profile', { title: '完善资料', mobileNo: params.mobileNo, refereeId: params.refereeId });
});

router.get('/public/shop.html', (req, res, next) => {
    let storeId = req.query.storeId;
    let storeName = req.query.storeName;
    // res.cookies['openId'] = "123";
    // req.cookies['openId'] = "123";

    // let list = [];
    // list.push("openId=oLy9ruKx06rNSaQBFsxIdM4Vo5Lk;Max-Age=31536000; Path=/;proxy=true");
    // list.push("runningcatUserInfo={};Max-Age=31536000; Path=/");
    // list.push("wechatUserInfo1={\"openid\":\"oLy9ruKx06rNSaQBFsxIdM4Vo5Lk\",\"nickname\":\"|\",\"sex\":1,\"language\":\"zh_CN\",\"city\":\"\",\"province\":\"上海\",\"country\":\"中国\"};Max-Age=31536000; Path=/");
    // list.push( "wechatUserInfo2={\"headimgurl\":\"http://wx.qlogo.cn/mmopen/J1EYE814VZic83pfL3fdnRP4GF7mBZzZOBWJ3IvebURORknxSzPRjEDudRRbUCDkjGGTccMIiaFAyZzIcyWfpKlg/0\"};Max-Age=31536000; Path=/");
    // list.push("wechatUserInfo3={\"privilege\":[]};Max-Age=31536000; Path=/");
    // res.setHeader("Set-Cookie", list);
    return res.render('public/shop', { title: '店铺', storeId: storeId, storeName: storeName });
});

router.get('/public/login.html', (req, res, next) => {
    let storeId = req.query.storeId;
    return res.render('public/login', { title: '登录', storeId: storeId });
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

router.get('/profile/holopoint.html', (req, res, next) => {
    return res.render('profile/holopoint', { title: '活力值' });
});
router.get('/profile/myReflection.html', (req, res, next) => {
    return res.render('profile/myReflection', { title: '我的成就' });
});


router.get('/profile/class-recharge.html', (req, res, next) => {
    return res.render('profile/class-recharge', { title: '课时充值' });
});
/*
    常规课评价
 */
router.get('/profile/comment-class.html', (req, res, next) => {
    let courseId = req.query.courseId,
        onceId = req.query.onceId,
        classTimeId = req.query.classTimeId;
    return res.render('profile/comment-class', { title: '评价', courseId: courseId, onceId: onceId, classTimeId: classTimeId });
});
/*
    特训营常规课评价
 */
router.get('/profile/special-comment-class.html', (req, res, next) => {
    let onceId = req.query.onceId,
        classTimeId = req.query.classTimeId;
    return res.render('profile/special-comment-class', { title: '评价', onceId: onceId, classTimeId: classTimeId });
});

router.get('/profile/done-class.html', (req, res, next) => {
    return res.render('profile/done-class', { title: '我的常规课' });
});

router.get('/profile/done-till.html', (req, res, next) => {
    return res.render('profile/done-till', { title: '我的特训营' });
});

router.get('/profile/edit-profile.html', (req, res, next) => {
    return res.render('profile/edit-profile', { title: '完善信息' });
});

router.get('/profile/invite.html', (req, res, next) => {
    let runningcatUserInfo = JSON.parse(req.cookies.runningcatUserInfo);
    let memberId = runningcatUserInfo.memberId,
        store = req.cookies.store,
        storeId = 0;

    if (!!store) {
        store = JSON.parse(store);
        storeId = store.storeId;
    }

    return res.render('profile/invite', { title: 'RunningCat', memberId: memberId, storeId: storeId });
});

router.get('/profile/message.html', (req, res, next) => {
    return res.render('profile/message', { title: '系统消息' });
});

router.get('/profile/ranking.html', (req, res, next) => {
    return res.render('profile/ranking', { title: '活力值排名' });
});

router.get('/profile/recharge.html', (req, res, next) => {
    let needCourseNum = req.query.needCourseNum;
    if (needCourseNum == undefined) {
        needCourseNum = 1;
    }
    return res.render('profile/recharge', { title: '充值', needCourseNum: needCourseNum });
});

router.get('/profile/single-class.html', (req, res, next) => {
    return res.render('profile/single-class', { title: '我的常规课' });
});

router.get('/profile/homework-class.html', (req, res, next) => {
    let onceId = req.query.onceId,
        courseId = req.query.courseId,
        classTimeId = req.query.classTimeId;
    return res.render('profile/homework-class', { title: '常规课程作业', onceId: onceId, courseId: courseId, classTimeId: classTimeId });
});

router.get('/profile/homework-till.html', (req, res, next) => {
    let onceId = req.query.onceId,
        classTimeId = req.query.classTimeId;
    return res.render('profile/homework-till', { title: '特训营作业', onceId: onceId, classTimeId: classTimeId });
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

/*
    常规课
 */
router.get('/course/pay-page.html', [user.checkLogin], (req, res, next) => {
    let courseId = req.query.courseId;
    let dayOfWeek = req.query.dayOfWeek;
    return res.render('course/pay-page', { title: '常规课支付页面', courseId: courseId, dayOfWeek: dayOfWeek });
});
router.get('/course/pay-success.html', (req, res, next) => {
    let courseId = req.query.courseId;
    return res.render('course/pay-success', { title: '约课成功', courseId: courseId });
});
router.get('/course/course.html', (req, res, next) => {
    // let storeId = req.query.storeId;
    // let storeName = req.query.storeName;
    // return res.render('course/course', { title: '常规课程' , storeId: storeId, storeName: storeName});
    return res.render('course/course', { title: '常规课程' });
});

router.get('/course/course-detail.html', (req, res, next) => {
    let courseId = req.query.courseId;
    let dayOfWeek = req.query.dayOfWeek;
    let imgUrl = req.query.imgUrl;
    let isBuyFlag = req.query.isBuyFlag;
    return res.render('course/course-detail', { title: '课程详情', courseId: courseId, dayOfWeek: dayOfWeek, imgUrl: imgUrl, isBuyFlag: isBuyFlag });
});

/*
    特训营
 */


router.get('/till/pay-page.html', [user.checkLogin], (req, res, next) => {
    let specialId = req.query.specialId;
    let buyCopies = req.query.buyCopies;
    return res.render('till/pay-page', { title: '特训营支付页面', specialId: specialId, buyCopies: buyCopies });
});

router.get('/till/pay-success.html', (req, res, next) => {
    let specialId = req.query.specialId;
    return res.render('till/pay-success', { title: '约课成功', specialId: specialId });
});

router.get('/till/till.html', (req, res, next) => {
    // let storeId = req.query.storeId;
    // let storeName = req.query.storeName;
    return res.render('till/till', { title: '特训营' });
});

router.get('/till/till-detail.html', (req, res, next) => {
    let specialId = req.query.specialId;
    let year = req.query.year;
    let mm = req.query.mm;
    let day = req.query.day;
    let isBuyFlag = req.query.isBuyFlag;
    return res.render('till/till-detail', { title: '特训营详情', specialId: specialId, year: year, mm: mm, day: day, isBuyFlag: isBuyFlag });
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
    return res.render('public/shop', { title: '店铺' });
});

module.exports = router;
