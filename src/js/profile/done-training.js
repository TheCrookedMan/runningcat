(function() {
    var storeInfo = common.getStoreInfo();
    var training = function() {
        this.status = 1;
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    training.prototype = {
        init: function() {
            var self = this;
            self.getTraining();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getTraining();
                }
            }, function() {});
        },
        getTraining: function() {
            var self = this;
            $.get('/tmpl-training-list.template', {
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
    this.training = new training();
    this.training.init();

    $("body").on("click", "a.evaluate", function(ev) {
        var link = $(this).data('href');
        var onceId = $(this).data('onceId');
        $.post('/usrPrivateClassEvaluate/checkStatus', { onceId: onceId, onceType: 4 }).success(function(data) {
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
