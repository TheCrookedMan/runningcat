(function() {
    var isBuyFlag = $("#isBuyFlag").val();
    $.post('/trainingDetail', { 'userId': userInfo.memberId, 'courseId': courseId }).success(function(data) {
        var res = data.data;
        //console.log(res);
        $("#contactPhone").html(res.contactPhone);
        $("#courseDate").html(common.formatDate(res.courseDate, 'yyyy-MM-dd'));
        $("#courseDesc").html(res.courseDesc);
        $("#courseFlow").html(res.courseFlow);
        $("#courseName").html(res.courseName);
        $("#courseRemark").html(res.courseRemark);
        $("#courseTarget").html(res.courseTarget);
        $("#courseTip").html(res.courseTip);
        $("#courseTarget").html(res.courseTarget);
        $("#storeAddress").html(res.storeAddress);
        $("#startTime").html(res.startTime);
        $("#endTime").html(res.endTime);
        $("#buyerNum").html(res.courseMaxNum);
        $("#openCourseNum").html(res.onceCourseHour);
         $("#dayOfWeek").html(res.dayOfWeek);
            var dayOfWeek = parseInt($("#dayOfWeek").html());
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
        if (!res.buyerNum) {
            res.buyerNum = 0;
        }

        $(".onceCourseHour").text("所需课时：" + res.onceCourseHour + "课时");

        $("#buyerNum").html(res.buyerNum);
        //var carouselFigure = res.carouselFigure;
        var playTimePictures = res.playTimePictures;

        /*循环人数*/
        for(i=1;i<=4;i++){
            var pricestr="<a href='javascript:void(0);' data-href='/pay/training/pay-page.html?courseId="+courseId+"&buyCopies="+i+"'><p>"+i+"人</p><p>"+i+"课时</p></a>";
            $(".pub_peolist").append(pricestr);
            $(".pub_peolist a:first").addClass('cur');
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

        $(".pub_peolist").on("click","a",function(ev){
            var url = $(this).data("href");
            $(this).siblings(".cur").removeClass("cur");
            $(this).addClass("cur");
            window.location.href = url;
        })

        if (isBuyFlag == 1) {
            $(".pub-rbtn .btn").removeAttr("href");
            $(".pub-rbtn .btn").addClass("end");
            $(".pub-rbtn .btn").removeClass("can");
        }

        $(".pub-rbtn .can").on("click",function(){
             window.location.href = $(".pub_peolist a.cur").data("href");
        })

    }).error(function(data) {

    });


}).call(this);
