(function() {
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
        $.post('/sendSMS', { 'mobileNo': mobileNo }).success(function(data) {
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
                $.AMUI.utils.cookie.set('runningcatUserInfo', runningcatUserInfo, 365 * 24 * 60 * 60, '/');
                window.location.href = "/public/shop.html";
            } else {
                if("10015" == data.code){
                    window.location.href = "/public/register.html";
                } else {
                    modal.alert(data.msg);
                }
            }
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        });
    }
}).call(this)
