(function() {
    var isBuyFlag = $("#isBuyFlag").val();
    $.post('/coursePlan/queryCoursePlanInfo', { 'userId': userInfo.memberId, 'courseId': courseId }).success(function(data) {
        var res = data.data;
        $("#contactPhone").html(res.contactPhone);
        $("#courseDate").html(common.formatDate(res.courseDate, 'yyyy-MM-dd'));
        $("#courseDesc").html(res.courseDesc);
        $("#courseFlow").html(res.courseFlow);
        $("#courseName").html(res.courseName);
        $("#courseRemark").html(res.courseRemark);
        $("#courseTarget").html(res.courseTarget);
        $("#courseTip").html(res.courseTip);
        $("#storeAddress").html(res.storeAddress);
        $("#startTime").html(res.startTime);
        $("#endTime").html(res.endTime);
        $("#openCourseNum").html(res.courseMaxNum);

        if (!res.buyerNum) {
            res.buyerNum = 0;
        }


        $("#buyerNum").html(res.buyerNum);
        var carouselFigure = res.carouselFigure;
        var playTimePictures = res.playTimePictures;
        //console.log(carouselFigure)
        if (carouselFigure.length) {
            for (var ele in carouselFigure) {
                var str = "<li><img src='" + window.imageAddress + carouselFigure[ele].imgUrl + "'/></li>";
                $('#carouselFigure').append(str);
            }
        } else {
            var str = "<li><img src='/img/default.jpg'/></li>";
            $('#carouselFigure').append(str);
        }

        $('.am-slider').flexslider();
        for (var ele in playTimePictures) {
            var str = "<p><img src='" + window.imageAddress + playTimePictures[ele].imgUrl + "'/></p>";
            $('#playTimePictures').append(str);
        }
        
        if (res.buyerNum == res.courseMaxNum) {
            $(".pub-rbtn .btn").removeAttr("href");
            $(".pub-rbtn .btn").addClass("end");
        }

    }).error(function(data) {

    });

    if (isBuyFlag == 1) {
        $(".pub-rbtn .btn").removeAttr("href");
        $(".pub-rbtn .btn").addClass("end");
    }

    var dayOfWeek = parseInt($("#dayOfWeek").text());
    switch (dayOfWeek) {
        case 1:
            $("#dayOfWeek").html("周日");
            break;
        case 2:
            $("#dayOfWeek").html("周一");
            break;
        case 3:
            $("#dayOfWeek").html("周二");
            break;
        case 4:
            $("#dayOfWeek").html("周三");
            break;
        case 5:
            $("#dayOfWeek").html("周四");
            break;
        case 6:
            $("#dayOfWeek").html("周五");
            break;
        case 7:
            $("#dayOfWeek").html("周六");
            break;
    }
}).call(this);
