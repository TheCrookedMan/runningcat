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
        modal.confirm({
            relatedTarget:this,
            msg: "是否确认删除此条信息！",
            onConfirm: function(options) {
                var msgId = $(this.relatedTarget).data("id");
                var thisPanel = $(this.relatedTarget).parents("dl");
                $.post('/message/delMsg', {
                    msgId: msgId
                }).success(function(data) {
                    if (data.code == "0000" && data.success) {
                        thisPanel.remove();
                    } else {
                        // modal.alert(data.msg);
                    }
                })
            }
        })
        ev.stopPropagation();
    });
    $(".profile-message").on("click", "dl.noRead", function(ev) {
        var msgId = $(this).data("id");
        var self = $(this);
        $.post('/message/redMsg', { msgId: msgId }).success(function(data) {
            if (data.code == "0000" && data.success) {
                self.removeClass("noRead");
            } else {
                // modal.alert(data.msg);
            }
        })
    });
}).call(this)
