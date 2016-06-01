import express from 'express';
import user from './api/user';
import wechatAuth from './api/wechat';
let router = express.Router();

/*
    微信公众号验证是否注册登录流程（先验证）
 */
router.get('/wechatAuth.html', (req, res, next) => {
    let options = req.query,
        redirect_uri = "";
    wechatAuth.accessToken(options.code, function(params) {
        let data = JSON.parse(params);
        //没有errcode字段表示请求成功
        if (!data.errcode) {
            if ("snsapi_userinfo" == data.scope) {
                let access_token = data.access_token,
                    openid = data.openid;

                console.log("openid:::"+openid);

                user.loginByopenId(openid, (record) => {
                    //success
                    console.log("record:::"+JSON.stringify(record));
                    // 如果返回没有注册就获取用户的微信信息并且跳转到注册页面
                    // 如果登录成功就吧一些信息写入cookie里面
                    // wechatAuth.getUserInfo(access_token, openid, function(userinfo) {
                    //     var personalInfo = JSON.parse(userinfo);
                    // })
                }, (err) => {
                    //error
                    console.log("error:::"+JSON.stringify(err));
                })

                
            } else if ("snsapi_base" == data.scope) {}
        }
    },function(err){
    })
});



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

router.get('/course/course.html', (req, res, next) => {
    return res.render('course/course', { title: '单次课程' });
});

router.get('/course/course-detail.html', (req, res, next) => {
    let courseId = req.query.courseId;
    let dayOfWeek = req.query.dayOfWeek;
    let imgUrl = req.query.imgUrl;
    return res.render('course/course-detail', { title: '课程详情' ,courseId:courseId,dayOfWeek:dayOfWeek,imgUrl:imgUrl});
});

router.get('/till/till.html', (req, res, next) => {
    return res.render('till/till', { title: '特训营' });
});

router.get('/till/till-detail.html', (req, res, next) => {
    let userId = req.query.userId;
    return res.render('till/till-detail', { title: '特训营详情' ,userId:userId});
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
