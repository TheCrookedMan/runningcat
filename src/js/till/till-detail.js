(function() {
    var specialId=$("#specialId").val();
    var isBuyFlag=$("#isBuyFlag").val();
    $.post('/specialClass/querySpecialClassInfo', {'userId':userInfo.memberId,'specialId':specialId}).success(function(data) {

        var res=data.data;
        var total=res.totalPrice;
        var perPrice=res.perPrice;
        var num=total/perPrice;
        var trainers=res.trainers;
        var buyCopies=res.specialPolicyList;

        $("#classDesc").html(res.classDesc);
        $("#contactPhone").html(res.contactPhone);
        $("#storeAddress").html(res.storeAddress);
        $("#trainingFlow").html(res.trainingFlow);
        $("#trainingResults").html(res.trainingResults);
        $("#trainingTips").html(res.trainingTips);
        $("#classTime").html(res.classTime);
        $("#totalPrice").html(res.totalPrice);
        $("#classNum").html(num);

        /*循环教练*/
        for(var p in trainers){
             var str="<li><img src='"+window.imageAddress+trainers[p].jheadPhotoUrl+"'/><h2>"+trainers[p].userName+""+ trainers[p].englishName+"</h2><p>"+trainers[p].remark+"</p></li>";
             $("#trainers").append(str);
        }

        /*循环人数*/
        for(var i in buyCopies){
            var pricestr="<a href='javascript:void(0);' data-href='/pay/till-pay-page.html?specialId="+specialId+"&buyCopies="+buyCopies[i].buyCopies+"'><p>"+buyCopies[i].buyCopies+"人</p><p>"+num*buyCopies[i].buyCopies+"课时</p></a>";
            $(".pub_peolist").append(pricestr);
            $(".pub_peolist a:first").addClass('cur');
        }

        if(buyCopies.length > 0){
            $("li.peo").show();
        }

        var start=new Date(res.startDate).toLocaleDateString();
        var end=new Date(res.endDate).toLocaleDateString();
        var datastr="训练周期："+start+"~"+end+"，"+res.weekNum+" 周共"+res.courseNum+"次课";

        $("#data").html(datastr);
        var carouselFigure=res.carouselFigure;

        /*循环轮播*/
        if(carouselFigure.length){
            for(var ele in carouselFigure){
                var str="<li><img src='"+window.imageAddress+carouselFigure[ele].imgUrl+"'/></li>";
                $('#carouselFigure').append(str);
            }
        }
        else{
            var str="<li><img src='/img/default.jpg'/></li>";
            $('#carouselFigure').append(str);
        }

        /*初始化轮播*/
        $('.am-slider').flexslider();

    }).error(function(data) {
       
    });

    // 倒计时
    var timer = window.setInterval(function(){
        var year=$(".pub-countdown").data("year");
        var month=$(".pub-countdown").data("mm");
        var day=$(".pub-countdown").data("day");

        var now = new Date();
        var endDate = new Date(year, month-1, day); 
        var leftTime=endDate.getTime()-now.getTime(); 
        var leftsecond = parseInt(leftTime/1000); 

        var day1=Math.floor(leftsecond/(60*60*24)); 
        var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
        var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
        var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);

        if (day1<10)
        {
            day1="0"+day1.toString();
        }
        if(hour<10){
            hour="0"+hour.toString();
        }
        if(minute<10){
            minute="0"+minute.toString(); 
        }
        if(second<10){
            second="0"+second.toString();
        }

        if (leftsecond > 1) {
            $(".pub-countdown").find(".t_d").text(day1);
            $(".pub-countdown").find(".t_h").text(hour);
            $(".pub-countdown").find(".t_m").text(minute);
            $(".pub-countdown").find(".t_s").text(second);
        } else {
            clearInterval(timer);
        } 
    }, 1000);

$(".pub_peolist").on("click","a",function(ev){
    var url = $(this).data("href");
    $(this).siblings(".cur").removeClass("cur");
    $(this).addClass("cur");
    window.location.href = url;
})

if(isBuyFlag == 1){
    $(".pub-rbtn .btn").removeAttr("href");
    $(".pub-rbtn .btn").addClass("end");
}
}).call(this);
