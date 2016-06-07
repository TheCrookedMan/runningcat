(function() {
    $("form").submit(function() {
        var data = common.parseForm("form");
        login(data);
        return false;
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
        })
    }
}).call(this)
