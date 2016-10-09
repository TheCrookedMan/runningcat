(function() {
    var isBuyFlag = $("#isBuyFlag").val();
    $.post('/coachDetail', { 'userId': userInfo.memberId, 'courseId': courseId }).success(function(data) {
        var res = data.data;
        $("#contactPhone").html(res.contactPhone);
        $("#courseDate").html(common.formatDate(res.courseDate, 'yyyy-MM-dd'));
        $("#courseDesc").html(res.courseDesc);
        $("#courseFlow").html(res.courseFlow);
        $("#trainerDesc").html(res.trainerDesc);
        $("#courseRemark").html(res.courseRemark);
        $("#courseTarget").html(res.courseTarget);
        $("#englishName").html(res.englishName);
        $("#courseTip").html(res.courseTip);
        $("#storeAddress").html(res.storeAddress);
        $("#startTime").html(res.startTime);
        $("#endTime").html(res.endTime);
        $("#openCourseNum").html(res.onceCourseHour);
        
         $("#courseTarget").html(res.courseTarget);

        if (!res.buyerNum) {
            res.buyerNum = 0;
        }

        var startTimes=res.startTimes;

        

        $(".onceCourseHour").text("所需课时：" + res.onceCourseHour + "课时");

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

        /*循环人数*/
        for(i=1;i<=3;i++){
            var pricestr="<a href='javascript:void(0);'><p data-id="+i+">"+i+"V"+i+"</p></a>";
            $(".ypeo").append(pricestr);
            $(".ypeo a:first").addClass('cur');
        }

        var buyCopies=$(".ypeo a.cur p").data("id");

       

        $(".ypeo").on("click","a",function(ev){
            var url = $(this).data("href");
            $(this).siblings(".cur").removeClass("cur");
            $(this).addClass("cur");
            buyCopies=$(this).find("p").data("id");
            //console.log(buyCopies)
        })

         /*循环时间*/
        for(var i in startTimes){
            var pricestr="<a href='javascript:void(0);' data-href='/coach/pay-page.html?courseId="+courseId+"'><p>"+startTimes[i].startTime+"</p></a>";
            $(".ytime").append(pricestr);
            $(".ytime a:first").addClass('cur');
        }

        $(".ytime").on("click","a",function(ev){
            var url = $(this).data("href");
            $(this).siblings(".cur").removeClass("cur");
            $(this).addClass("cur");
            window.location.href = url+"&buyCopies="+buyCopies;
        })

        $('.am-slider').flexslider();
        for (var ele in playTimePictures) {
            var str = "<p><img src='" + window.imageAddress + playTimePictures[ele].imgUrl + "'/></p>";
            $('#playTimePictures').append(str);
        }

        if (res.buyerNum == res.courseMaxNum) {
            $(".pub-rbtn .btn").removeAttr("href");
            $(".pub-rbtn .btn").addClass("end");
        }

        if (isBuyFlag == 1) {
            $(".pub-rbtn .btn").removeAttr("href");
            $(".pub-rbtn .btn").addClass("end");
            $(".pub-rbtn .btn").removeClass("can");
        }

        $(".pub-rbtn .can").on("click",function(){
             window.location.href = $(".ytime a.cur").data("href")+"&buyCopies="+buyCopies;
        })

    }).error(function(data) {

    });

    

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
