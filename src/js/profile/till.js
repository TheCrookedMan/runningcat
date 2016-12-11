(function() {
    var specialId = $("#specialId").val();
    var storeInfo = common.getStoreInfo();
    $.post('/specialClass/querySpecialClassInfo', { 'userId': userInfo.memberId, specialId: specialId }).success(function(data) {
        var res = data.data;
        //console.log(res);
        $("#className").html(res.className);
        $("#storeAddress").html(res.storeAddress);
        $(".till-class .pub-pinfo #startDate").html(common.formatDate(res.startDate, 'yyyy/MM/dd'));
        $(".till-class .pub-pinfo #endDate").html(common.formatDate(res.endDate, 'yyyy/MM/dd'));
        $("#courseNum").html(res.courseNum);
        $("#imgUrl").attr("src", window.imageAddress + res.imgUrl);
        // $("#week").html(common.toWeek(res.startDate));
        $(".till-class .pub-pinfo .classTime").text(res.classTime);
        
    }).error(function(data) {

    })
    var getUsrSpecialOnce = function() {
        this.status = 0;
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    getUsrSpecialOnce.prototype = {
        init: function() {
            var self = this;
            self.getSingleClass();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getSingleClass();
                }
            }, function() {});
        },
        getSingleClass: function() {
            var self = this;
            $.get('/getUsrSpecialOnce.template', {
                memberId: userInfo.memberId,
                status: self.status,
                specialId: specialId,
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
    this.getUsrSpecialOnce = new getUsrSpecialOnce();
    this.getUsrSpecialOnce.init();
    /*
        请假
     */
    $(".till-class").on("click", "a.leave", function(ev) {
        modal.confirm({
            relatedTarget: this,
            msg: "您确认请假吗？",
            onConfirm: function(options) {
                var classtimeId = $(this.relatedTarget).data("id");
                var thisPanel = $(this.relatedTarget).parents("li");
                var signinKey = $(this.relatedTarget).data("signinKey");
                $.post("/doLeave", {
                    memberId: userInfo.memberId,
                    classtimeId: classtimeId,
                    signinKey: signinKey
                }).success(function(data) {
                    if (data.code == "0000" && data.success) {
                        // thisPanel.remove();
                        window.location.reload();
                    } else {
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
    $(".till-class").on("click", "a.signIn", function(ev) {
        var classtimeId = $(this).data("id");
        var thisPanel = $(this).parents("li");
        $.post("/doSignIn", {
            memberId: userInfo.memberId,
            classtimeId: classtimeId
        }).success(function(data) {
            if (data.code == "0000" && data.success) {
                // thisPanel.remove();
                window.location.reload();
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
            $("#rule-popup .am-popup-bd").html(data.data.classPolicyDesc);
        }
    });

    // $(".single-class .pub-tab").on("click", "a", function(ev) {
    //     $(".single-class .pub-tab .cur").removeClass("cur");
    //     $(this).addClass("cur");
    //     self.status = $(this).data("status");
    //     self.pageNo = 1;
    //     $(".single-class .class-list ul").html('<p class="pub_nodata">暂无特训营记录！</p>');
    //     self.getSingleClass();
    // });
}).call(this);
