(function() {
    var wechatUserInfo = "";

    var wechatUserInfo1 = $.AMUI.utils.cookie.get("wechatUserInfo1");
    var wechatUserInfo2 = $.AMUI.utils.cookie.get("wechatUserInfo2");
    var wechatUserInfo3 = $.AMUI.utils.cookie.get("wechatUserInfo3");

    wechatUserInfo = wechatUserInfo1 + wechatUserInfo2 + wechatUserInfo3;
    wechatUserInfo = JSON.parse(wechatUserInfo);
    $("#userPic").attr("src", wechatUserInfo.headimgurl);
    $("#nicknameText").text(wechatUserInfo.nickname);
    $("#nickName").val(wechatUserInfo.nickname);
    $("#photoUrl").val(wechatUserInfo.headimgurl);
    $("#openId").val(wechatUserInfo.openid);

    $('#loginForm').validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var data = common.parseForm(".am-form");
                if (!regCardId.test(data.idcard)) {
                    modal.alert("身份证格式错误！");
                    return false;
                }
                register(data);
            }
            return false;
        }
    });

    function register(data) {
        $.post('/registeUser', data).success(function(data) {
            if (data.success) {
                var runningcatUserInfo = JSON.stringify(data.data);
                $.AMUI.utils.cookie.set('runningcatUserInfo', runningcatUserInfo, 365 * 24 * 60 * 60, '/');
                window.location.href = "/public/shop.html";
            } else {
                modal.alert(data.msg);
            }
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        });
    }
}).call(this);
