(function() {
    $.post('/trainingDetail', { 'userId': userInfo.memberId, 'courseId': courseId }).success(function(data) {
        if (data.code == "0000" && data.success) {
            var record = data.data;
            $(".sucess .ico img").attr('src', window.imageAddress + record.carouselFigure[0].imgUrl);
            $(".dateRange").text(common.formatDate(record.courseDate, 'yyyy/MM/dd') + " " + common.toWeek(record.courseDate));
            $(".timeRange").text(record.startTime + "～" + record.endTime);
            $(".contactPhone").text(record.contactPhone);
            $(".storeAddress").text(record.storeAddress);
            $(".classDesc").html(record.classDesc);
        }
    }).error(function(data) {});
}).call(this);
