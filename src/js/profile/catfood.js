(function() {
    var t = 0;
    //查询剩余猫粮
    $.post('/usrMemberCatfood/selectUsrSurplusAmount', {'memberId':1}).success(function(data) {
        var res=data.data;
        $("#surplus em").html(res.surplusAmount)
    }).error(function(data) {
       
    })
    //初始化猫粮列表
    list(0);
    function list(isUsed){
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
    this.scroll.on(bottomCallback, topCallback);
    function bottomCallback() {
        //debugger
    }

    function topCallback() {
        //debugger
    }

}).call(this);
