(function() {
    //初始化列表
    list(0);
    function list(){
        $.get('/course.template', {
            userId:1 ,
            storeId:4,
            queryDate:1463587200000
        }, function(data) {
            $(".pub-list ul").append(data);
            console.log(data)
        });
    }
    // $(".tab-catfood li a").click(function() {
    //     var isUsed = $(this).data("id");
    //     $(this).addClass('cur').parent().siblings().children().removeClass('cur');
    //     if (t == 0) {
    //         list(isUsed);
    //         t = 1;
    //     }
    //     $("#t" + isUsed).show().siblings(".pub-list").hide();
    // })
    this.scroll.on(bottomCallback, topCallback);
    function bottomCallback() {
        //debugger
    }

    function topCallback() {
        //debugger
    }

}).call(this);
