(function() {
    var storeInfo = common.getStoreInfo();
    var privateCoach = function() {
        this.status = 1;
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

    $("body").on("click", "a.evaluate", function(ev) {
        var link = $(this).data('href');
        var onceId = $(this).data('onceId');
        $.post('/usrPrivateClassEvaluate/checkStatus', { onceId: onceId, onceType: 3 }).success(function(data) {
            if (data.code == "0000" && data.success) {
                window.location.href = link;
            } else {
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
