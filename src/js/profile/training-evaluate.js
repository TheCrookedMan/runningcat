(function() {
    var storeInfo = common.getStoreInfo();
    $.get('/training-evaluate.template', {
        courseId: onceId,
        memberId: userInfo.memberId,
        onceId: onceId,
        storeId: storeInfo.storeId,
        classTimeId: classTimeId
    }).success(function(data) {
        $(".submit-class").html(data);
    });
    $("body").on("click", ".scal-line a", function(ev) {
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
    $("body").on("submit", ".usrClassEvaluate", function() {
        var data = common.parseForm("form");
        // data.memberId = userInfo.memberId;

        var score = $(".comment .score").find("a.am-icon-star");
        score = score.length * 2;
        data.memberId = userInfo.memberId;
        data.onceId = onceId;
        data.score = score;
        data.classTimeId = classTimeId;

        if (!data.leaveMsg) {
            modal.alert("留言信息不能为空！");
            return false;
        }
        /*
            自助训练添加评价
         */
        $.post('/usrSelfClassEvaluate/addEvaluate', data).success(function(data) {
            if (data.code == "0000" && data.success) {
                modal.alert("评论成功！", undefined, function() {
                    window.history.go(-1);
                });
            } else {
                modal.alert(data.msg);
            }
        })
        return false;
    });


}).call(this);
