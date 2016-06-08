(function() {
    var tillList = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
        this.storeId=$("#storeId").val();
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
                    $(".till ul").append(data);
                }
            }).error(function(err) {});
        }
    }
    this.tillList = new tillList();
    this.tillList.init();
}).call(this);