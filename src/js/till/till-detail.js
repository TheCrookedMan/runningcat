(function() {
    var specialId=$("#specialId").val();
    $.post('/specialClass/querySpecialClassInfo', {'userId':userInfo.memberId,'specialId':specialId}).success(function(data) {
        var res=data.data;
        $("#classDesc").html(res.classDesc);
        $("#contactPhone").html(res.contactPhone);
        $("#storeAddress").html(res.storeAddress);
        $("#trainingFlow").html(res.trainingFlow);
        $("#trainingResults").html(res.trainingResults);
        $("#trainingTips").html(res.trainingTips);
        var trainers=res.trainers;
        for(var p in trainers){
             var str="<li><img src='http://115.159.62.18:8085/pic/images/"+trainers[p].jheadPhotoUrl+"'/><h2>"+trainers[p].userName+""+ trainers[p].nickName+"</h2><p>"+trainers[p].remark+"</p></li>";
             console.log(str);
             $("#trainers").append(str);
        }
        for(i=1;i<5;i++){
            var pricestr="<a href='javascript:void(0)' class='cur'><p>"+(res.perPrice)*i+"人</p><p>"+(res.courseNum)*i+"课时</p></a>";
            var priceslect="<option value="+i+">￥"+(res.perPrice)*i+"/人（所需"+(res.courseNum)*i+"课时）</option>"
            $(".pub_peolist").append(pricestr);
            $("#select").append(priceslect);
        }
        var start=new Date(res.startDate).toLocaleDateString();
        var end=new Date(res.endDate).toLocaleDateString()
        var datastr="训练周期："+start+"~"+end+"，"+res.weekNum+" 周共"+res.courseNum+"次课";
        $("#data").html(datastr);
        var carouselFigure=res.carouselFigure;
        for(var ele in carouselFigure){
            var str="<li><img src='http://115.159.62.18:8085/pic/images/"+carouselFigure[ele].imgUrl+"'/></li>";
            $('#carouselFigure').append(str);
        }
    }).error(function(data) {
       
    })
}).call(this);
