(function() {
    //userInfo.memberId
    var till = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    till.prototype = {
        init: function() {
            var self = this;
            self.getFill();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getFill();
                }
            }, function() {});
        },
        getFill: function() {
            var self = this;
            $.get('/getUsrSpecialOnce.template', {
                memberId: 46,
                status: 0,
                specialId:1,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".pub-list ul").append(data);
                }
               // console.log(data)
            }).error(function(err) {});
        }
    }
    this.till = new till();
    this.till.init();
}).call(this);
