(function() {
    var message = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    message.prototype = {
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
            $.get('/message.template', {
                memberId: userInfo.memberId,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".profile-message").append(data);
                }
            }).error(function(err) {});
        }
    }
    this.message = new message();
    this.message.init();

    $(".profile-message").on("click", ".fr a", function(ev) {
        var msgId = $(this).data("id");
        modal.confirm({
            msg: "是否确认删除此条信息！",
            onConfirm: function(options) {
                $.post('/message/delMsg',{
                	msgId:msgId
                }).success(function(data){

                })
            }
        })
    });
    $(".profile-message").on("click",".message-collapse",function(ev){
    	var msgId = $(this).data("id");
    	$.post('/message/redMsg',{msgId:msgId}).success(function(data){
    	})
    });
}).call(this)
