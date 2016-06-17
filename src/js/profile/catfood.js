(function() {
    //查询剩余猫粮
    $.post('/usrMemberCatfood/selectUsrSurplusAmount', {'memberId':userInfo.memberId}).success(function(data) {
        var res=data.data;
        $("#surplus em").html(res.surplusAmount)
    }).error(function(data) {
       
    })
    var catfood = function() {
        this.status = 1;
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    catfood.prototype = {
        init: function() {
            var self = this;
            $(".single-class .pub-tab").on("click", "a", function(ev) {
                $(".single-class .pub-tab .cur").removeClass("cur");
                $(this).addClass("cur");
                self.status = $(this).data("status");
                self.pageNo = 1;
                $(".single-class .pub-list ul").html('<li><i class="am-icon-dot-circle-o"></i><p class="pub_nodata">暂无猫粮记录！</p></li>');
                self.getCatfood();
            });
            self.getCatfood();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getCatfood();
                }
            }, function() {});
        },
        getCatfood: function() {
            var self = this;
            $.get('/catfood.template', {
                memberId: userInfo.memberId,
                isUsed: self.status,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    if(self.pageNo == 1){
                        $(".single-class .pub-list ul").html(data);
                    }
                    else{
                       $(".single-class .pub-list ul").append(data); 
                    }  
                }
            }).error(function(err) {});
        }
    }
    this.catfood = new catfood();
    this.catfood.init();
}).call(this);
