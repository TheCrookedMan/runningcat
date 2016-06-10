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
                memberId:/*userInfo.memberId*/49,
                onceId: /*onceId*/55,
                onceType: 1
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".pub-list ul").prepend(data);
                }
               // console.log(data)
            }).error(function(err) {});
        }
    }
    this.homeWork = new homeWork();
    this.homeWork.init();


    /*查询我的课次作业*/
    $.get('/submitclass.template', {
        memberId:/*userInfo.memberId*/46,
        onceId:/*onceId*/55,
        workId:11
    }).success(function(data) {
         $(".pub-list ul").append(data);
         //console.log(data.data)
    }).error(function(err) {});


    $(".uploadImage").uploadImage({
        url: "/common/uploadImage",
        callback: function(file, data, resp) {
            var path = data.images[0].userFilePath;
            $(this).parents(".task").siblings(".task").find(".topicImgUrl").attr('src', window.imageAddress + path);
            $(this).siblings(".photoUrl").val(path);
        }
    });


    /*提交作业*/
    $("body").on("submit",".doCourseWork",function() {
        var data = common.parseForm("form");
        $.post('/usr-class/doCourseWork',data).success(function(data){
            if(data.code == "0000" && data.success){
                modal.alert("提交作业成功！");
            } else {
                modal.alert(data.msg);
            }
        })
        return false;
    });

    /*修改作业*/
    $("body").on("submit",".updateCourseWork",function() {
        var data = common.parseForm("form");
        $.post('/usr-class/updateCourseWork',data).success(function(data){
            if(data.code == "0000" && data.success){
                modal.alert("修改作业成功！");
            } else {
                modal.alert(data.msg);
            }
        })
        return false;
    });
}).call(this);
