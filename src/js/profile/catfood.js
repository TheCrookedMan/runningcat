(function() {
    $.get('/catfood.template', {
        memberId: 1,
        isUsed: 0
    }, function(data) {
    	$(".pub-list ul").append(data);
    });
    this.scroll.on(bottomCallback,topCallback);
    function bottomCallback(){
    	debugger
    }
    function topCallback(){
    	debugger
    }
}).call(this);