(function() {
    var storeInfo = common.getStoreInfo();
    $.get('/special-comment-class.template', {
        specialId: specialId,
        memberId: userInfo.memberId,
        onceId: onceId,
        storeId: storeInfo.storeId
    }).success(function(data) {
        $(".submit-class").html(data);
    });
    $("body").on("click", ".scal-line i", function(ev) {
        var list = $(this).prevUntil("span");
        $(this).removeClass("am-icon-star-o");
        $(this).addClass("am-icon-star");
        list.each(function(i, I) {
            $(I).removeClass("am-icon-star-o");
            $(I).addClass("am-icon-star");
        });
        var next = $(this).nextUntil();
        next.each(function(i, I) {
            $(I).addClass("am-icon-star-o");
            $(I).removeClass("am-icon-star");
        });
        ev.stopPropagation();
    });
    $("body").on("submit",".usrClassEvaluate",function() {
        var data = common.parseForm("form");
        // data.memberId = userInfo.memberId;
        
        var score = $(".comment .score").find("a.am-icon-star");
        score = score.length * 2;
        var trainScore = $(".comment .trainScore").find("a.am-icon-star");
        trainScore = trainScore.length * 2;

        data.memberId = userInfo.memberId;
        data.onceId = onceId;
        data.score = score;
        data.trainScore = trainScore;

        $.post('/specialEvaluate/addUsrClassEvaluate',data).success(function(data){
            if(data.code == "0000" && data.success){
                modal.alert("评论成功！");
            } else {
                modal.alert("评论失败！");
            }
        })
        return false;
    });
    $("body").on("click",".pub-num .num .min",function(ev){
        var buy_num = $(".pub-num .buy_num").val();
        buy_num = parseInt(buy_num);
        if(buy_num > 0){
            buy_num --;
            $(".pub-num .buy_num").val(buy_num);
        } 
        ev.stopPropagation();
    });
    $("body").on("click",".pub-num .num .add",function(ev){
        var buy_num = $(".pub-num .buy_num").val();
        buy_num = parseInt(buy_num);
        if(buy_num < useful_food){
            buy_num ++;
            $(".pub-num .buy_num").val(buy_num);
        }
        ev.stopPropagation();
    });
    $("body").on("change",".pub-num .buy_num",function(ev){
        var buy_num = $(this).val();
        buy_num = parseInt(buy_num);
        if(buy_num > useful_food){
            $(this).val(useful_food);
        } else if(buy_num < 0){
            $(this).val(0);
        }
        ev.stopPropagation();
    });
}).call(this);