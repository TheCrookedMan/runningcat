(function() {
    $.post('/specialClass/querySpecialClassInfo', { 'userId': userInfo.memberId, 'specialId': specialId }).success(function(data) {
        if (data.code == "0000" && data.success) {
            var record = data.data;
            $(".sucess .ico img").attr('src',window.imageAddress+record.imgUrl);
            $(".dateRange").text(common.formatDate(record.startDate, 'yyyy/MM/dd') + " ～ " + common.formatDate(record.endDate, 'yyyy/MM/dd') + " 共计" + record.weekNum + "周、"+record.courseNum+"次课");
            $(".classTime").text(record.classTime);
            $(".contactPhone").text(record.contactPhone);
            $(".storeAddress").text(record.storeAddress);
            $(".classDesc").html(record.classDesc);
        }
    }).error(function(data) {
    });
}).call(this);