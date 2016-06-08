(function() {
    var courseList = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
        this.storeId=$("#storeId").val();
    }
    courseList.prototype = {
        init: function() {
            var self = this;
            self.getCourse();
            scroll.on(function(){
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getCourse();
                }
            }, function() {});
        },
        getCourse: function() {
            var self = this;
            $.get('/course.template', {
                userId: userInfo.memberId,
                storeId:self.storeId,
                queryDate:1463587200000,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".pub-list ul").append(data);
                }
            }).error(function(err) {});
        }
    }
    this.courseList = new courseList();
    this.courseList.init();
}).call(this);
