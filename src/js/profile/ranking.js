(function() {
    //var wechatUserInfo = $.cookie("wechatUserInfo");
    //wechatUserInfo = eval(wechatUserInfo);
    //console.log(wechatUserInfo.nickname)
    //初始化猫粮列表
    var t = 0;
    var pageNo=1;
    var pageSize=10;

    $.get('/rankingFuel.template',{
        pageNo: pageNo,
        pageSize:pageSize
    }, function(data) {
        console.log(data);
        $("#tFuel .rank-list").append(data);
         
    });

    $.get('/rankingFuel.template',{
        memberId: 1
    }, function(data) {
        $("#mFuel .myrank").append(data)
    });
    

    $(".rank-tab li a").click(function() {
        var spec = $(this).data("id");
        $(this).addClass('cur').parent().siblings().children().removeClass('cur');
        if (t == 0) {
            if (spec == 'Fuel') {
                $.get('/rankingFuel.template',{
                    pageNo: pageNo,
                    pageSize:pageSize
                }, function(data) {
                    $("#t" + spec+" .rank-list").append(data); 
                });

                $.get('/rankingFuel.template',{
                    memberId: 1
                }, function(data) {
                    $("#m" + spec+" .myrank").append(data); 
                });
            }
            else{
                 $.get('/rankingTrain.template',{
                    pageNo: pageNo,
                    pageSize:pageSize
                }, function(data) {
                    $("#t" + spec+" .rank-list").append(data);   
                });

                $.get('/rankingTrain.template',{
                    memberId: 1
                }, function(data) {
                    $("#m" + spec+" .myrank").append(data); 
                });
            }
            t = 1;
        }
        $("#t" + spec).show().siblings("table").hide();
        $("#m" + spec).show().siblings("table").hide();
    })
    this.scroll.on(bottomCallback, topCallback);
    function bottomCallback() {
        pageNo=pageNo+1;
        pageSize=pageSize*pageNo;
    }

    function topCallback() {
        //debugger
    }

}).call(this);
