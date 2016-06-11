(function() {
    $.post('/specialClass/querySpecialClassInfo', { 'userId': userInfo.memberId, 'specialId': specialId }).success(function(data) {
        if (data.code == "0000" && data.success) {
            var record = data.data;
            $(".dateRange").text(common.formatDate(record.startDate, 'yyyy/MM/dd') + " ～ " + common.formatDate(record.endDate, 'yyyy/MM/dd') + " 共计" + record.weekNum + "周");
            $(".contactPhone").text(record.contactPhone);
            $(".storeAddress").text(record.storeAddress);
            $(".classDesc").text(record.classDesc);
        }
    }).error(function(data) {
    });
}).call(this);