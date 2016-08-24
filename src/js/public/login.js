(function() {
    var fromUrl = window.location.search.substr(1).replace("fromUrl=", "");
    var time, count = 60;
    var storeInfo = common.getStoreInfo();
    $(".am-form").on("click", ".sendSMS", function(ev) {
        var data = common.parseForm(".am-form");

        if (common.regMobileNo(data.mobileNo)) {
            sendSMS(data.mobileNo)
        } else {
            modal.alert("情确认手机号是否输入正确！");
        }
    })

    function sendSMS(mobileNo) {
        $.post('/sendSMS', { 'mobileNo': mobileNo, sendType: 0, storeId: storeInfo.storeId }).success(function(data) {
            if (!data.success) {
                modal.alert(data.msg);
            } else {
                $(this).attr('disabled', 'disabled');
                timeout();
            }
        }).error(function(data) {
            // modal.alert(data.msg);
        });
    }

    function timeout() {
        time = setInterval(function() {
            if (count <= 1) {
                count = 60;
                $(".am-form .sendSMS").removeAttr('disabled');
                $(".am-form .sendSMS").text("发送验证码");
                clearTimeout(time);
            } else {
                count--;
                $(".am-form .sendSMS").text(count + " 秒后重发");
            }
        }, 1000);
    }
    $('#loginForm').validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var data = common.parseForm("form");
                data.storeId = storeInfo.storeId;
                login(data);
            }
            return false;
        }
    });

    function login(data) {
        $.post('/loginByMobileNo', data).success(function(data) {
            if (data.success) {
                var runningcatUserInfo = JSON.stringify(data.data);
                // $.AMUI.utils.cookie.set('runningcatUserInfo', runningcatUserInfo, common.maxAge, '/');
                $.cookie('runningcatUserInfo', runningcatUserInfo, { expires: common.expires, path: '/' });
                window.location.href = fromUrl;
            } else {
                if ("10015" == data.code) {
                    var params = $(".am-form").serialize();
                    params = params.replace(/&/g, '_8_8_');
                    var redirect_uri = "/public/profile.html?" + params;
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wechatPublicNumberInfo.appid + "&redirect_uri="+window.redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=" + redirect_uri + "&connect_redirect=1#wechat_redirect"
                } else {
                    modal.alert(data.msg);
                }
            }
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        });
    }
}).call(this)
