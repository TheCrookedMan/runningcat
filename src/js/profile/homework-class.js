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

         var imglength=0;
         $(".uploadImage").uploadImage({
            url: "/common/uploadImage",
            callback: function(file, data, resp) {
                imglength++;
                var path = data.images[0].userFilePath;
                var arr=new Array(imglength);
                arr.push(path);
                var str="<div class='task'><p><img src='"+window.imageAddress+arr[imglength]+"' id='imgUrl"+imglength+"'/></p></div>"
                $(".uploadImage").parents(".img-list").prepend(str);
            }
        });
    }).error(function(err) {});


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
