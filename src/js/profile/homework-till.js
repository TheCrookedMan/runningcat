(function() {
    var onceId = $("#onceId").val();
    // var workId;

    /*课程详情*/
    $.get('/pubtill.template', {
        onceId: onceId
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
        },
        getHomeWork: function() {
            var self = this;
            $.get('/getCourseWorkInfo.template', {
                memberId: userInfo.memberId,
                onceId: onceId,
                onceType: 2
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    $(".pub-list ul").prepend(data);
                    // workId=$("#workId").val()
                    findMyCourseWorkt();
                }
                // console.log(data)
            }).error(function(err) {});
        }
    }
    this.homeWork = new homeWork();
    this.homeWork.init();

    function findMyCourseWorkt() {
        /*查询我的课次作业*/
        $.get('/submitclass.template', {
            memberId: userInfo.memberId,
            onceId: onceId,
            workId: workId,
            onceType: 2
        }).success(function(data) {
            $(".pub-list ul").append(data);
            var imglength = 0;
            $(".uploadImage").uploadImage({
                url: "/common/uploadImage",
                callback: function(file, data, resp) {
                    imglength++;
                    var path = data.images[0].userFilePath;
                    var arr = new Array(imglength);
                    arr.push(path);
                    var str = "<div class='task'><p><img src='" + window.imageAddress + arr[imglength] + "' class='imgUrl' data-url='" + arr[imglength] + "' /></p></div>"
                    $(".uploadImage").parents(".img-list").prepend(str);
                }
            });
        }).error(function(err) {});
    }

    /*提交作业*/
    $("body").on("submit", ".doCourseWork", function() {
        var data = common.parseForm(".doCourseWork");
        var topicAnswer = $(".doCourseWork .leaveMsg").val();
        var imglength = 0;
        var arr = new Array(imglength);
        var imgObj = {};
        $(".imgUrl").each(function(index) {
            var path = $(this).data("url");
            imglength++;
            imgObj['imgUrl' + imglength] = path;
        });
        /*
            onceType   单次课=1,特训营=2，私教课=3
         */
        var params = { 'memberId': userInfo.memberId, 'onceId': onceId, 'workId': workId, 'topicAnswer': topicAnswer, 'onceType': 2, classTimeId: classTimeId };
        params = $.extend(params, imgObj);
        $.post('/usr-class/doCourseWork', params).success(function(data) {
            if (data.code == "0000" && data.success) {
                modal.alert("提交作业成功！");
            } else {
                modal.alert("提交作业失败！");
            }
        })
        return false;
    });

    /*修改作业*/
    $("body").on("submit", ".updateCourseWork", function() {
        var data = common.parseForm(".updateCourseWork");
        var topicAnswer = $(".updateCourseWork .leaveMsg").val();
        var imglength = 0;
        var arr = new Array(imglength);
        var imgObj = {};
        $(".imgUrl").each(function(index) {
            var path = $(this).data("url");
            imglength++;
            imgObj['imgUrl' + imglength] = path;
        });
        var params = { 'memberId': userInfo.memberId, 'memberWorkId': memberWorkId, 'topicAnswer': topicAnswer };
        params = $.extend(params, imgObj);
        $.post('/usr-class/updateCourseWork', params).success(function(data) {
            if (data.code == "0000" && data.success) {
                modal.alert("修改作业成功！");
            } else {
                modal.alert("修改作业失败！");
            }
        })
        return false;
    });
}).call(this);
