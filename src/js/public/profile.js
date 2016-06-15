(function() {
    var wechatUserInfo = common.getWechatInfo();
    if (!wechatUserInfo) {
        wechatUserInfo = {};
    }

    $("#userPic").attr("src", wechatUserInfo.headimgurl);
    $("#nicknameText").text(wechatUserInfo.nickname);
    $("#nickName").val(wechatUserInfo.nickname);
    $("#photoUrl").val(wechatUserInfo.headimgurl);
    $("#openId").val(wechatUserInfo.openid);
    $("#unionId").val(wechatUserInfo.unionid);

    var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
    $tooltip.appendTo(document.body);
    var $form = $('#loginForm');

    $form.validator({
        validate: function(validity) {
            $tooltip.hide();
            if (validity.field.name == "wechat") {
                if (validity.field.value == "" || common.regSkip(validity.field.value)) {
                    validity.valid = false;
                } else {
                    validity.valid = true;
                }
            } else if (validity.field.name == "idcard") {
                validity.valid = regCardId.test(validity.field.value);
            } else if (validity.field.name == "birthday") {
                if (validity.field.value == "" || !common.regRealAge(validity.field.value)) {
                    validity.valid = false;
                } else {
                    validity.valid = true;
                }
            } else if (validity.field.name == "beforeWeight") {
                validity.valid = common.regBeforeWeight(validity.field.value);
            } else if (validity.field.name == "height") {
                validity.valid = common.regInteger(validity.field.value);
            }
        },
        submit: function(form) {
            if (this.isFormValid()) {
                var data = common.parseForm(".am-form");
                // if (!regCardId.test(data.idcard)) {
                //     modal.alert("身份证格式错误！");
                //     return false;
                // } 
                register(data);
                return false;
            }
            return false;
        }
    });

    var validator = $form.data('amui.validator');

    $form.on('focusin focusout', '.am-form-error input', function(e) {
        if (e.type === 'focusin') {
            var $this = $(this);
            var offset = $this.offset();
            var msg = $this.data('foolishMsg') || validator.getValidationMessage($this.data('validity'));

            $tooltip.text(msg).show().css({
                left: offset.left + 10,
                top: offset.top - $(this).outerHeight() - 10
            });
        } else {
            $tooltip.hide();
        }
    });

    function register(data) {
        $.post('/registeUser', data).success(function(data) {
            if (data.success) {
                var runningcatUserInfo = JSON.stringify(data.data);
                $.AMUI.utils.cookie.set('runningcatUserInfo', runningcatUserInfo, 365 * 24 * 60 * 60, '/');
                window.location.href = "/public/shop.html";
            } else {
                modal.alert("注册失败！");
            }
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        });
    }
}).call(this);
