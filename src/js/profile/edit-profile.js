(function() {
    $.get('/edit-profile.template', {
        memberId: userInfo.memberId
    }).success(function(data) {
        $(".edit-profile form").html(data);
    });

    var $modal = $('.pub-dialog');
    var cur_text = $(".select-attr .list");
    var text = null;
    $(".pub-dialog").on('click', ".back,.save", function() {
        $modal.modal('close');
        var idd = cur_text.data("id");
        $('input#' + idd).val(text)
    });
    $(".select-attr").on('click', ".list a", function() {
        text = $(this).text();
        $(this).addClass("cur").siblings().removeClass("cur");
    });
}).call(this)
