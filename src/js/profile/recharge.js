(function() {

    function recharge() {
        var store = common.getStoreInfo();
        this.storeId = store.storeId;
        this.discountInfo = {};
    }
    recharge.prototype = {
        selectDiscountInfo: function(totalNum) {
            var self = this;
            if (totalNum > 0) {
                $.post('/order/selectDiscountInfo', {
                    memberId: userInfo.memberId,
                    totalNum: totalNum,
                    storeId: self.storeId
                }).success(function(data) {
                    if (data.code == "0000" && data.success) {
                        var record = data.data;
                        var totalPrice = record.totalPrice.toFixed(2);
                        var actualPrice = record.actualPrice.toFixed(2);
                        var discountPrice = record.discountPrice.toFixed(2);
                        var nmemberCatFood = record.nmemberCatFood;
                        var catExchangePrice = record.catExchangePrice.toFixed(2);
                        var memberCatFood = record.memberCatFood;
                        var orderUnitPrice = record.orderUnitPrice.toFixed(2);
                        $(".totalPrice").text(totalPrice);
                        $(".actualPrice").text(actualPrice);
                        $(".discountPrice").text(discountPrice);
                        $(".nmemberCatFood").text(nmemberCatFood);
                        $(".catExchangePrice").text(catExchangePrice);
                        $(".memberCatFood").text(memberCatFood);
                        $(".orderUnitPrice").text(orderUnitPrice);
                    } else {
                        modal.alert(data.msg);
                    }
                });
            } else {
                $(".totalPrice").text("0.00");
                $(".actualPrice").text("0.00");
                $(".discountPrice").text("0.00");
                $(".nmemberCatFood").text("0");
                $(".catExchangePrice").text("0.00");
                $(".memberCatFood").text("0");
                $(".orderUnitPrice").text("0.00");

            }
        },
        selectCopSalePolicy: function(totalNum) {
            var self = this;
            if (totalNum > 0) {
                $.get('/copSalePolicyDetail.template', {
                    memberId: userInfo.memberId,
                    totalNum: totalNum,
                    storeId: self.storeId
                }).success(function(data) {
                    debugger
                });
            } else {
                modal.alert("请购买课时！");
            }
        }
    }
    this.rechargeObj = new recharge();

    $("body").on("click", ".pub-num .num .min", function(ev) {
        var buy_num = $(".pub-num .buy_num").val();
        buy_num = parseInt(buy_num);
        if (buy_num > 0) {
            buy_num--;
            $(".pub-num .buy_num").val(buy_num);
        }
        rechargeObj.selectDiscountInfo(buy_num);
        ev.stopPropagation();
    });
    $("body").on("click", ".pub-num .num .add", function(ev) {
        var buy_num = $(".pub-num .buy_num").val();
        buy_num = parseInt(buy_num);
        buy_num++;
        $(".pub-num .buy_num").val(buy_num);
        rechargeObj.selectDiscountInfo(buy_num);
        ev.stopPropagation();
    });
    $("body").on("change", ".pub-num .buy_num", function(ev) {
        var buy_num = $(this).val();
        buy_num = parseInt(buy_num);
        if (buy_num < 0) {
            $(this).val(0);
        }
        buy_num = $(this).val();
        rechargeObj.selectDiscountInfo(buy_num);
        ev.stopPropagation();
    });

    $("body").on("keydown", ".pub-num .buy_num", function(ev) {
        var buy_num = $(this).val();
        if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 8) {
            modal.alert("请输入数字！");
            return false;
        }
        ev.stopPropagation();
    });

    $("body").on("click", "#show-discount-detail", function(ev) {
        var buy_num = $(".pub-num .buy_num").val();
        if (buy_num > 0) {
            $("#detail-popup").modal('open');
        } else {
            modal.alert("请购买课时！");
        }
        ev.stopPropagation();
    });
    $("#detail-popup").on('open.modal.amui', function() {
        var buy_num = $(".pub-num .buy_num").val();
        rechargeObj.selectCopSalePolicy(buy_num);
    });


}).call(this)
