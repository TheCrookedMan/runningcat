(function() {
    var storeInfo = common.getStoreInfo();
    var singleClass = function() {
        this.status = 0;
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    singleClass.prototype = {
        init: function() {
            var self = this;
            $(".single-class .pub-tab").on("click", "a", function(ev) {
                $(".single-class .pub-tab .cur").removeClass("cur");
                $(this).addClass("cur");
                self.status = $(this).data("status");
                self.pageNo = 1;
                $(".single-class .class-list ul").html('<li class="pub_nodata">暂无课程记录！</li>');
                self.getSingleClass();
            });
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
            $.get('/tmpl-single-class.template', {
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
                    if(self.pageNo == 1){
                        $(".single-class .class-list ul").html(data);
                    }
                    else{
                        $(".single-class .class-list ul").append(data);
                    }  
                }
            }).error(function(err) {});
        }
    }
    this.singleClass = new singleClass();
    this.singleClass.init();

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
                $.post("/usr-class/doLeave", {
                    memberId: userInfo.memberId,
                    classtimeId: classtimeId,
                    signinKey: signinKey
                }).success(function(data) {
                    if (data.code == "0000" && data.success) {
                        thisPanel.remove();
                    } else {
                        modal.alert("请假失败！");
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
        $.post("/usr-class/doSignIn", {
            memberId: userInfo.memberId,
            classtimeId: classtimeId
        }).success(function(data) {
            if (data.code == "0000" && data.success) {
                thisPanel.remove();
            } else {
                modal.alert("签到失败！");
            }
        })
        ev.stopPropagation();
    });
}).call(this)
