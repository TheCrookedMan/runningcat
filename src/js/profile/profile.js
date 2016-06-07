(function() {
    $.post('/user/getUserInfo', { memberId: userInfo.memberId }).success(function(data) {
        if (data.code == "0000" && data.success) {
        	var record = data.data;
        	if(record.photoUrl.indexOf('wx.qlogo.cn') != -1){
        		$(".profile .img img").attr('src',record.photoUrl);
        	} else {
        		$(".profile .img img").attr('src',window.imageAddress+record.photoUrl);
        	}
        	$(".profile .info .nickName").text(record.nickName);
        	$(".profile .info .mobileNo").text(record.mobileNo);
        	
        }
    })
}).call(this)
