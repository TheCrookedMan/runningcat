(function(){
	$.post('/order/selectDiscountInfo',{
		memberId:memberId,
		totalNum:totalNum
	});
}).call(this)