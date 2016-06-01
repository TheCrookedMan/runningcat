(function() {
    var userId=$("#userId").val();
    $.post('/coursePlan/queryCoursePlanInfo', {'userId':1,'storeId':1}).success(function(data) {
        var res=data.data;
        $("#contactPhone").html(res[0].contactPhone);
        $("#courseDate").html(res[0].courseDate);
        $("#courseDesc").html(res[0].courseDesc);
        $("#courseFlow").html(res[0].courseFlow);
        $("#courseName").html(res[0].courseName);
        $("#courseRemark").html(res[0].courseRemark);
        $("#courseTarget").html(res[0].courseTarget);
        $("#courseTip").html(res[0].courseTip);
        $("#storeAddress").html(res[0].storeAddress);
        $("#startTime").html(res[0].startTime);
        $("#endTime").html(res[0].endTime);
        $("#openCourseNum").html(res[0].openCourseNum);
        var carouselFigure=res[0].carouselFigure;
        var playTimePictures=res[0].playTimePictures;
        for(var ele in carouselFigure){
            var str="<li><img src='http://115.159.62.18:8085/pic/images/"+carouselFigure[ele].imgUrl+"'/></li>";
            $('#carouselFigure').append(str);
        }
        for(var ele in playTimePictures){
            var str="<p><img src='http://115.159.62.18:8085/pic/images/"+playTimePictures[ele].imgUrl+"'/></p>";
            $('#playTimePictures').append(str);
        }
    }).error(function(data) {
       
    })
}).call(this);
