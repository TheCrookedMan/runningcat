(function() {
    var storeInfo = common.getStoreInfo();
    var privateCoach = function() {
        this.status = 0;
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    privateCoach.prototype = {
        init: function() {
            var self = this;
            self.getPrivateCoach();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getPrivateCoach();
                }
            }, function() {});
        },
        getPrivateCoach: function() {
            var self = this;
            $.get('/tmpl-private-coach.template', {
                memberId: userInfo.memberId,
                status: self.status,
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
                        $(".single-class .class-list ul").html(data);
                        $(".pub-list ul").removeClass("bd0");
                    } else {
                        $(".single-class .class-list ul").append(data);
                    }
                }
            }).error(function(err) {});
        }
    }
    this.privateCoach = new privateCoach();
    this.privateCoach.init();

    /*
        请假
     */
    $(".single-class").on("click", "a.leave", function(ev) {
        modal.confirm({
            relatedTarget: this,
            msg: "您确认请假吗？",
            onConfirm: function(options) {
                var classtimeId = $(this.relatedTarget).data("id");
                var thisPanel = $(this.relatedTarget).parents("li");
                var signinKey = $(this.relatedTarget).data("signinKey");
                $.post("/PrivateClassDoLeave", {
                    memberId: userInfo.memberId,
                    classtimeId: classtimeId,
                    signinKey: signinKey
                }).success(function(data) {
                    if (data.code == "0000" && data.success) {
                        // thisPanel.remove();
                        window.location.reload();
                    } else {
                        // modal.alert("请假失败！");
                        modal.alert(data.msg);
                    }
                })
            }
        });
        ev.stopPropagation();
    });
    /*
        签到
     */
    $(".single-class").on("click", "a.signIn", function(ev) {
        var classtimeId = $(this).data("id");
        var thisPanel = $(this).parents("li");
        $.post("/PrivateClassDoSignIn", {
            memberId: userInfo.memberId,
            classtimeId: classtimeId
        }).success(function(data) {
            if (data.code == "0000" && data.success) {
                // thisPanel.remove();
                window.location.reload();
            } else {
                // modal.alert("签到失败！");
                modal.alert(data.msg);
            }
        })
        ev.stopPropagation();
    });

    $.post('/shop/getInfo', {
        storeId: storeInfo.storeId
    }).success(function(data) {
        if (data.code == "0000" && data.success) {
            $("#rule-popup .am-popup-bd").html(data.record.classPolicyDesc);
        }
    });

}).call(this)
