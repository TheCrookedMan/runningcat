(function() {
    list(0);
    var t = 0;

    function list(isUsed) {
        $.get('/catfood.template', {
            memberId: 1,
            isUsed: isUsed
        }, function(data) {
            $("#t" + isUsed + " ul").append(data);
            $("#t"+isUsed).find("ul li").each(function(i, I) {
                var prevNode = $(I).prev().get(0);
                if (i != 0) {
                    if (I.className == prevNode.className) {
                        $(I).find(".am-icon-dot-circle-o").hide()
                    }
                }
            });
        });
    }
    $(".tab-catfood li a").click(function() {
        var isUsed = $(this).data("id");
        $(this).addClass('cur').parent().siblings().children().removeClass('cur');
        if (t == 0) {
            list(isUsed);
            t = 1;
        }
        $("#t" + isUsed).show().siblings(".pub-list").hide();
    })
    $("#sdfsd").unbind("click").click(function(e) {

    });
    this.scroll.on(bottomCallback, topCallback);

    function bottomCallback() {
        //debugger
    }

    function topCallback() {
        //debugger
    }
}).call(this);
