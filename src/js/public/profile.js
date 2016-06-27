(function() {
    var wechatUserInfo = common.getWechatInfo();
    if (!wechatUserInfo) {
        wechatUserInfo = {};
    }
    var store = common.getStoreInfo();

    $("#openId").val(wechatUserInfo.openid);
    $("#unionId").val(wechatUserInfo.unionid);
    $("#storeId").val(store.storeId);
    // if (type == "improve_and_perfect") {
    //     // getUsrInfoByUnionId(wechatUserInfo.unionid);
    //     getUsrInfoByUnionId("o85Fpt8L9Qze0864dKrVQ0i-HUx0");
    // } else {
    $("#userPic").attr("src", wechatUserInfo.headimgurl);
    $("#photoUrl").val(wechatUserInfo.headimgurl);
    $("#nicknameText").text(wechatUserInfo.nickname);
    $("#nickName").val(wechatUserInfo.nickname);
    // }

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
                // if (type == "improve_and_perfect") {
                //     updateUserInfo(data);
                // } else {
                register(data);
                // }
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
                // $.AMUI.utils.cookie.set('runningcatUserInfo', runningcatUserInfo, common.maxAge, '/');
                $.cookie('runningcatUserInfo', runningcatUserInfo, { expires: common.expires, path: '/' });
                window.location.href = "/public/shop.html";
            } else {
                modal.alert("注册失败！");
            }
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        });
    }

    function updateUserInfo(data) {
        $.post('/updateUserInfo', data).success(function(data) {
            if (data.success) {
                var runningcatUserInfo = JSON.stringify(data.data);
                // $.AMUI.utils.cookie.set('runningcatUserInfo', runningcatUserInfo, common.maxAge, '/');
                $.cookie('runningcatUserInfo', runningcatUserInfo, { expires: common.expires, path: '/' });
                window.location.href = "/public/shop.html";
            } else {
                modal.alert("完善信息失败！");
            }
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        });
    }

    // function getUsrInfoByUnionId(unionId) {
    //     $.post('/user/getUsrInfoByUnionId', { unionId: unionId }).success(function(data) {
    //         if ("0000" == data.code && data.success) {
    //             var record = data.data;
    //             $("#name").val(record.userName);
    //             var mobileNo = $("#mobileNo").val();
    //             if (!mobileNo) {
    //                 $("#mobileNo").val(record.mobileNo);
    //             }
    //             $("input[name='sex']").each(function(i, I) {
    //                 if (I.value == record.sex) {
    //                     $(I).attr("checked", "checked");
    //                 }
    //             });
    //             var photoUrl = record.photoUrl;
    //             if (!photoUrl) {
    //                 $("#photoUrl").val(wechatUserInfo.headimgurl);
    //                 $("#userPic").attr("src", wechatUserInfo.headimgurl);
    //             } else {
    //                 $("#photoUrl").val(photoUrl);
    //                 $("#userPic").attr("src", photoUrl);
    //             }
    //             var nickName = record.nickName;
    //             if (!nickName) {
    //                 $("#nicknameText").text(wechatUserInfo.nickname);
    //                 $("#nickName").val(wechatUserInfo.nickname);
    //             } else {
    //                 $("#nicknameText").text(nickName);
    //                 $("#nickName").val(nickName);
    //             }
    //             if (!!record.birthday) {
    //                 $("#borth").val(common.formatDate(record.birthday, 'yyyy-MM-dd'));
    //             }
    //             $("#memberId").val(record.id);
    //             $("#wx").val(record.wechat);
    //             $("#sid").val(record.idcard);
    //             $("#weight").val(record.beforeWeight);
    //             $("#height").val(record.height);
    //         }
    //     })
    // }
}).call(this);
