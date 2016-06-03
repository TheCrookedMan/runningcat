(function() {
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
                $(".single-class .class-list ul").html("");
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
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".single-class .class-list ul").append(data);
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
        var classtimeId = $(this).data("id");
        var signinKey = $(this).data("signinKey");
        modal.confirm({
            msg: "您确认请假吗？",
            onConfirm: function(options) {
                $.post("/usr-class/doLeave", {
                    memberId: userInfo.memberId,
                    classtimeId: classtimeId,
                    signinKey:signinKey
                }).success(function(data) {

                })
            }
        })
    });
    /*
        签到
     */
    $(".single-class").on("click", "a.signIn", function(ev) {
        var classtimeId = $(this).data("id");
        $.post("/usr-class/doSignIn", {
            memberId: userInfo.memberId,
            classtimeId: classtimeId
        }).success(function(data) {

        })
    });
}).call(this)
