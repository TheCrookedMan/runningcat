(function() {
    //初始化列表
    list(0);
    function list(){
        $.get('/till.template', {
            userId:1 ,
            storeId:4
        }, function(data) {
            $(".till ul").append(data);
            console.log(data)
        });
    }
    this.scroll.on(bottomCallback, topCallback);
    function bottomCallback() {
        //debugger
    }

    function topCallback() {
        //debugger
    }

}).call(this);
