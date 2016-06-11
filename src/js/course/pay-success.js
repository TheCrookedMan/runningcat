(function() {
    $.post('/coursePlan/queryCoursePlanInfo', { 'userId': userInfo.memberId, 'courseId': courseId }).success(function(data) {
        if (data.code == "0000" && data.success) {
            var record = data.data;
            $(".dateRange").text(common.formatDate(record.courseDate, 'yyyy/MM/dd') +" "+ common.toWeek(record.courseDate));
            $(".timeRange").text(record.startTime+"～"+record.endTime);
            $(".contactPhone").text(record.contactPhone);
            $(".storeAddress").text(record.storeAddress);
            $(".classDesc").text(record.classDesc);
        }
    }).error(function(data) {
    });
}).call(this);