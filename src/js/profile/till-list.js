(function() {
    //userInfo.memberId
    var storeInfo = common.getStoreInfo();
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
                memberId: userInfo.memberId,
                storeId: storeInfo.storeId,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    if (self.pageNo == 1) {
                        $(".till ul").html(data);
                    } else {
                        $(".till ul").append(data);
                    }
                }
                // console.log(data)
            }).error(function(err) {});
        }
    }
    this.tillList = new tillList();
    this.tillList.init();
}).call(this);
