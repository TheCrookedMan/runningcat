(function(){
	var recharge = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    recharge.prototype = {
        init: function() {
            var self = this;
            self.getMessage();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getMessage();
                }
            }, function() {});
        },
        getMessage: function() {
            var self = this;
            $.get('/recharge-record.template', {
                memberId: userInfo.memberId,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".recharge-record ul").append(data);
                }
            }).error(function(err) {});
        }
    }
    this.recharge = new recharge();
    this.recharge.init();

    $.post('/order/selectUsrRechargeOrderRemainNum',{memberId:userInfo.memberId}).success(function(data){
    	if(data.code == "0000" && data.success){
    		$(".single-class .pub-title .number").text(data.data);
    	}
    })
}).call(this)