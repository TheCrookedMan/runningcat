(function() {
    var onceId=$("#onceId").val();

    /*特训营详情*/
    $.get('/pubtill.template', {
        userId:userInfo.memberId,
        specialId:onceId
    }).success(function(data) {
         $(".hr").before(data);
    }).error(function(err) {});

    /*特训营作业列表*/
    var homeWork = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    homeWork.prototype = {
        init: function() {
            var self = this;
            self.getHomeWork();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getHomeWork();
                }
            }, function() {});
        },
        getHomeWork: function() {
            var self = this;
            $.get('/getCourseWorkInfo.template', {
                memberId:userInfo.memberId,
                onceId: onceId,
                onceType: 2
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
    this.homeWork = new homeWork();
    this.homeWork.init();
}).call(this);
