(function() {
    $("form").submit(function() {
        var data = common.parseForm("form");
        login(data);
        return false;
    });

    function login(data) {
        $.post('/login', data).success(function(data) {
            window.location.href = "/public/shop.html";
        }).error(function(data) {
            modal.alert(data.responseJSON.msg);
        })
    }
}).call(this)
