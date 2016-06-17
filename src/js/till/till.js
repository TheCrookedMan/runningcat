(function() {
    var tillList = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
        var store = common.getStoreInfo();
        $(".pub-location .storeName").text(store.storeName);
        $(".foot_ps .storeAddress").text(store.address);
        $(".foot_ps .contactPhone").text(store.contactPhone);
        this.storeId = store.storeId;
    }
    tillList.prototype = {
        init: function() {
            var self = this;
            self.getTill();
            scroll.on(function(){
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getTill();
                }
            }, function() {});
        },
        getTill: function() {
            var self = this;
            $.get('/till.template', {
                userId: userInfo.memberId,
                storeId:self.storeId,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    if(self.pageNo == 1){
                        $(".till ul").html(data);
                    }
                    else{
                        $(".till ul").append(data);
                    }
                }
            }).error(function(err) {});
        }
    }
    this.tillList = new tillList();
    this.tillList.init();

    // 倒计时
    var timer = window.setInterval(function(){
        $(".start").each(function(i){
            var year=$(this).data("year");
            var month=$(this).data("mm");
            var day=$(this).data("day");

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
                $(this).find(".t_d").text(day1);
                $(this).find(".t_h").text(hour);
                $(this).find(".t_m").text(minute);
                $(this).find(".t_s").text(second);
            } else {
                clearInterval(timer);
                $(this).parent().siblings().find(".btn").removeAttr("href").addClass('btn-end').removeClass("btn-red")
            }
        });
    }, 1000);
}).call(this);