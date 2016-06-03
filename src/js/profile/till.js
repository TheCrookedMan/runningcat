(function() {
    // //查询剩余猫粮
    // $.post('/usrMemberCatfood/selectUsrSurplusAmount', {'memberId':userInfo.memberId}).success(function(data) {
    //     var res=data.data;
    //     $("#surplus em").html(res.surplusAmount)
    // }).error(function(data) {
       
    // })
    var tillList = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    tillList.prototype = {
        init: function() {
            var self = this;
            self.getFillList();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getFillList();
                }
            }, function() {});
        },
        getFillList: function() {
            var self = this;
            $.get('/getUsrSpecialClass.template', {
                userId: 1,
                storeId: 1,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".till ul").append(data);
                }
               // console.log(data)
            }).error(function(err) {});
        }
    }
    this.tillList = new tillList();
    this.tillList.init();
}).call(this);
