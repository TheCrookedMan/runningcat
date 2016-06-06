(function() {
    var specialId=$("#specialId").val();
    $.post('/specialClass/querySpecialClassInfo', {'userId':userInfo.memberId,specialId: 5}).success(function(data) {
        var res=data.data;
        //console.log(res);
        $("#className").html(res.className);
        $("#storeAddress").html(res.storeAddress);
        $("#startDate").html(new Date(res.startDate).toLocaleDateString());
        $("#courseNum").html(res.courseNum);
        $("#imgUrl").attr("src","http://115.159.62.18:8085/pic/images/"+res.imgUrl);
        $("#week").html(new Date(res.startDate).getDay())
    }).error(function(data) {
       
    })
    var getUsrSpecialOnce = function() {
        this.status = 0;
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    getUsrSpecialOnce.prototype = {
        init: function() {
            var self = this;
            $(".single-class .pub-tab").on("click", "a", function(ev) {
                $(".single-class .pub-tab .cur").removeClass("cur");
                $(this).addClass("cur");
                self.status = $(this).data("status");
                self.pageNo = 1;
                $(".single-class .class-list ul").html("");
                self.getSingleClass();
            });
            self.getSingleClass();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getSingleClass();
                }
            }, function() {});
        },
        getSingleClass: function() {
            var self = this;
            $.get('/getUsrSpecialOnce.template', {
                memberId: userInfo.memberId,
                status: self.status,
                specialId:specialId,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".single-class .class-list ul").append(data);
                }
            }).error(function(err) {});
        }
    }
    this.getUsrSpecialOnce = new getUsrSpecialOnce();
    this.getUsrSpecialOnce.init();
}).call(this);
