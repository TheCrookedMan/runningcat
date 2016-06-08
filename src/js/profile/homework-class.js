(function() {
    var onceId=$("#onceId").val();

    /*课程详情*/
    $.get('/pubclass.template', {
        userId:userInfo.memberId,
        courseId:onceId
    }).success(function(data) {
         $(".hr").before(data);
    }).error(function(err) {});

    /*课程作业列表*/
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
                onceType: 1
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

    /*查询我的课次作业*/
    $.get('/submitclass.template', {
        memberId:userInfo.memberId,
        courseId:onceId,
        workId:1
    }).success(function(data) {
         //$(".hr").before(data);
    }).error(function(err) {});


}).call(this);
