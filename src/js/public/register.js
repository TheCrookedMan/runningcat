(function() {
    var time, count = 10;
    $(".am-form").on("click", ".sendSMS", function(ev) {
        var data = $(".am-form").serialize();
        debugger
        $(this).attr('disabled', 'disabled');
        timeout();
        sendSMS();
    })

    function sendSMS() {
        $.post('/sendSMS').success(function() {
            debugger
        }).error(function() {
            debugger
        })
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
}).call(this);
