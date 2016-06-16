(function() {
    // var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
    // $tooltip.appendTo(document.body);
    // $('#loginForm').validator({
    //     onValid: function(validity) {
    //         $tooltip.hide();
    //     },
    //     onInValid: function(validity) {
    //         var $field = $(validity.field);
    //         var offset = $field.offset();
    //         // 使用自定义的提示信息 或 插件内置的提示信息
    //         var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

    //         $tooltip.text("hahah").css({
    //             left: $field.width() - $tooltip.width()/2,
    //             top: offset.top - $field.outerHeight() - 2
    //         }).show();
    //     },
    //     submit: function(form) {
    //         if (this.isFormValid()) {
    //             var data = common.parseForm("form");
    //             login(data);
    //         }
    //         return false;
    //     }
    // });
    // var wechatUserInfo = common.getWechatInfo();
    // alert("wechatUserInfo:::"+JSON.stringify(wechatUserInfo));
    $('#loginForm').validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var data = common.parseForm("form");
                login(data);
            }
            return false;
        }
    });

    function login(data) {
        $.post('/login', data).success(function(data) {
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
}).call(this)
