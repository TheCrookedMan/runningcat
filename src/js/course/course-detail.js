(function() {
    $.post('/coursePlan/queryCoursePlanInfo', {'userId':userInfo.memberId,'courseId':courseId}).success(function(data) {
        var res=data.data;
        $("#contactPhone").html(res.contactPhone);
        $("#courseDate").html(common.formatDate(res.courseDate,'yyyy-MM-dd'));
        $("#courseDesc").html(res.courseDesc);
        $("#courseFlow").html(res.courseFlow);
        $("#courseName").html(res.courseName);
        $("#courseRemark").html(res.courseRemark);
        $("#courseTarget").html(res.courseTarget);
        $("#courseTip").html(res.courseTip);
        $("#storeAddress").html(res.storeAddress);
        $("#startTime").html(res.startTime);
        $("#endTime").html(res.endTime);
        $("#openCourseNum").html(res.openCourseNum);
        $("#buyerNum").html(res.buyerNum);
        var carouselFigure=res.carouselFigure;
        var playTimePictures=res.playTimePictures;
        for(var ele in carouselFigure){
            var str="<li><img src='"+window.imageAddress+carouselFigure[ele].imgUrl+"'/></li>";
            $('#carouselFigure').append(str);
        }
        $('.am-slider').flexslider();
        for(var ele in playTimePictures){
            var str="<p><img src='"+window.imageAddress+playTimePictures[ele].imgUrl+"'/></p>";
            $('#playTimePictures').append(str);
        }
    }).error(function(data) {
       
    });

    
}).call(this);
