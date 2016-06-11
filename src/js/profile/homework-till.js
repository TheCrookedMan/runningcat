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
            console.log(path);
            // $(this).parents(".task").siblings(".task").find(".topicImgUrl").attr('src', window.imageAddress + path);
            // $(this).siblings(".photoUrl").val(path);
        }
    });


    /*提交作业*/
    $("body").on("submit",".doCourseWork",function() {
        var data = common.parseForm(".doCourseWork");
        var workContent=$(".doCourseWork .leaveMsg").val();
        $.post('/usr-class/doCourseWork',{'memberId': userInfo.memberId,'onceId':55,'workId':1,'imgUrl1':1,'imgUrl2':2,'workContent':workContent}).success(function(data){
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
        var data = common.parseForm(".updateCourseWork");
        var workContent=$(".updateCourseWork .leaveMsg").val();
        $.post('/usr-class/updateCourseWork',{'memberId': userInfo.memberId,'memberWorkId':1,'imgUrl1':1,'workContent':workContent}).success(function(data){
            if(data.code == "0000" && data.success){
                modal.alert("修改作业成功！");
            } else {
                modal.alert(data.msg);
            }
        })
        return false;
    });
}).call(this);
