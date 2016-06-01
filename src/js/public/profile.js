(function() {
    var wechatUserInfo = $.cookie("wechatUserInfo");
    wechatUserInfo = JSON.parse(wechatUserInfo);
    $("#userPic").attr("src", wechatUserInfo.headimgurl);
    $("#nicknameText").text(wechatUserInfo.nickname);
    $("#nickName").val(wechatUserInfo.nickname);
    $("#photoUrl").val(wechatUserInfo.headimgurl);
    $("#openId").val(wechatUserInfo.openid);
    $("form").submit(function() {
        var data = common.parseForm(".am-form");
        if (!regCardId.test(data.idcard)) {
            modal.alert("身份证格式错误！");
            return false;
        }
        register(data);
        return false;
    });

    function register(data) {
        $.post('/registeUser', data).success(function(data) {
            if (data.success) {
                var runningcatUserInfo = JSON.stringify(data.data);
                $.cookie('runningcatUserInfo', runningcatUserInfo, { expires: 365, path: '/' });
                window.location.href = "/public/shop.html";
            } else {
                modal.alert(data.msg);
            }
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        })
    }
}).call(this);