(function(){
	$.post('/userCenter/queryUserCaLone',{
		// memberId:userInfo.memberId,
		memberId:1,
		month:'2016-05'
	}).success(function(){
		debugger
	})
}).call(this)