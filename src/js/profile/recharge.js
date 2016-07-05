(function() {

    var memberLevelSalePolicyInfo = "";
    /* isUseCatfood 1:使用，0：不使用 */
    var isUseCatfood = 1;
    $.post('/user/getUserInfo', { memberId: userInfo.memberId }).success(function(data) {
        if (data.code == "0000" && data.success) {
            var record = data.data;
            if (record.photoUrl.indexOf('wx.qlogo.cn') != -1) {
                $(".course .img img").attr('src', record.photoUrl);
            } else {
                $(".course .img img").attr('src', window.imageAddress + record.photoUrl);
            }
            $(".course .info .nickName").text(record.nickName);
            $(".course .info .mobileNo").text(record.mobileNo);
        }
    })

    function recharge() {
        var store = common.getStoreInfo();
        this.storeId = store.storeId;
        this.discountInfo = {};
        this.gradePanelString = "";
    }
    recharge.prototype = {
        selectDiscountInfo: function(totalNum) {
            var self = this;
            if (totalNum > 0) {
                $.post('/order/selectDiscountInfo', {
                    memberId: userInfo.memberId,
                    totalNum: totalNum,
                    storeId: self.storeId,
                    isUseCatfood: isUseCatfood
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
                        var rechargeMin = record.rechargeMin;
                        var rechargeMax = record.rechargeMax;
                        $(".totalPrice").text(totalPrice);
                        $(".actualPrice").text(actualPrice);
                        $(".discountPrice").text(discountPrice);
                        $(".nmemberCatFood").text(nmemberCatFood);
                        $(".catExchangePrice").text(catExchangePrice);
                        $(".memberCatFood").text(memberCatFood);
                        $(".orderUnitPrice").text(orderUnitPrice);

                        $(".rechargeRange").text("*可购买课时为：" + rechargeMin + " ～ " + rechargeMax);

                        var mlevemRatio = record.mlevemRatio;
                        var gradeName = record.gradeName;

                        if (!!gradeName) {
                            if (mlevemRatio < 1) {
                                memberLevelSalePolicyInfo = "＊当前为" + gradeName + "，可再享受" + mlevemRatio * 10 + "折优惠";
                            } else {
                                memberLevelSalePolicyInfo = "＊当前为" + gradeName + "，没有可再享受的优惠！"
                            }
                        } else {
                            memberLevelSalePolicyInfo = "";
                        }

                        self.discountInfo = {
                            totalNum: totalNum,
                            nmemberCatFood: nmemberCatFood
                        }
                        self.gradePanelString = "";
                        // if(record.gradeName){
                        //     self.gradePanelString = '<tr><td colspan="4" class="col-red txt-l">*当前为' + record.gradeName + '，可再享受' + (record.mlevemRatio * 10).toFixed(1) + '折优惠</td></tr>';
                        // } else {
                        //     self.gradePanelString = "";
                        // }
                    } else {
                        // modal.alert(data.msg);
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
                $(".rechargeRange").text("");
                self.gradePanelString = "";
                memberLevelSalePolicyInfo = "";
                self.discountInfo = {
                    totalNum: 0,
                    nmemberCatFood: 0
                }
            }
        },
        selectCopSalePolicy: function(totalNum) {
            var self = this;
            if (totalNum > 0) {
                $.get('/copSalePolicyDetail.template', {
                    memberId: userInfo.memberId,
                    totalNum: totalNum,
                    storeId: self.storeId,
                    memberLevelSalePolicyInfo: memberLevelSalePolicyInfo
                }).success(function(data) {
                    $("#detail-popup").html(data);
                    $("#detail-popup tbody").append(self.gradePanelString);
                });
            } else {
                modal.alert("请先输入需要购买的课时！");
            }
        }
    }
    this.rechargeObj = new recharge();
    /*
        课时数量加减控制器
     */
    $("body").on("click", ".pub-num .num .min", function(ev) {
        var buy_num = $(".pub-num .buy_num").val();
        buy_num = parseInt(buy_num);
        if (buy_num > 1) {
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
        if (isNaN(buy_num)) {
            buy_num = 1;
        }
        buy_num = parseInt(buy_num);
        if (buy_num < 1) {
            $(this).val(1);
        }
        buy_num = $(this).val();
        rechargeObj.selectDiscountInfo(buy_num);
        ev.stopPropagation();
    });

    var old_num = 0;
    $("body").on("keydown", ".pub-num .buy_num", function(ev) {
        old_num = $(this).val();
        // if ((ev.keyCode < 48 || ev.keyCode > 57) && ev.keyCode != 8) {
        //     modal.alert("请输入数字！");
        //     return false;
        // }
        ev.stopPropagation();
    });

    $("body").on("keyup", ".pub-num .buy_num", function(ev) {
        var new_num = $(this).val();
        if (isNaN(new_num)) {
            modal.alert("请输入数字！");
            $(this).val(old_num);
        }
        ev.stopPropagation();
    });

    $("body").on("click", "#show-discount-detail", function(ev) {
        var buy_num = $(".pub-num .buy_num").val();
        if (buy_num > 0) {
            $("#detail-popup").modal('open');
        } else {
            modal.alert("请先输入需要购买的课时！");
        }
        ev.stopPropagation();
    });
    $("#detail-popup").on('open.modal.amui', function() {
        var buy_num = $(".pub-num .buy_num").val();
        rechargeObj.selectCopSalePolicy(buy_num);
    });

    function classRecharge() {
        // var catfood = 0;
        // if(isUsedCatFood){
        //     catfood = rechargeObj.discountInfo.nmemberCatFood;
        // }
        if (rechargeObj.discountInfo.totalNum > 0) {
            $.post('/order/classRecharge', {
                memberId: userInfo.memberId,
                totalNum: rechargeObj.discountInfo.totalNum,
                storeId: rechargeObj.storeId,
                /* 课时来源：原始取得=1，转让取得=2，注册赠送=3，活动赠送=4 */
                hourSouce: 1,
                /* 支付方式：支付宝=1，微信=2，猫粮=3，优惠券=4，转让=5 */
                payType: 2,
                /* 1=会员，2=员工 */
                type: 1,
                // catfood: catfood,
                isUseCatfood: isUseCatfood,
                openId: common.getOpenId()
            }).success(function(data) {
                if (data.code == "0000" && data.success) {
                    if (!data.data.retcode) {
                        modal.alert(data.data.error);
                    } else {
                        pay.go(data.data).then(function() {
                            // success
                            modal.alert("充值成功！",undefined,function(){
                                window.history.go(-1);
                            });
                        }, function(pay_info) {
                            // error
                            // modal.alert(pay_info);
                        });
                    }
                } else {
                    // modal.alert(data.msg);
                    modal.alert("支付失败！");
                }
            })
        } else {
            modal.alert("请输入需要购买的课时数！");
        }
    }
    $(".wechatPay").click(function(ev) {
        classRecharge();
        ev.stopPropagation();
    });
    var courseNum = $(".pub-num .buy_num").val();
    if (courseNum > 0) {
        rechargeObj.selectDiscountInfo(courseNum);
    }

    $("body").on("click", ".list-info .isUsedCatFod", function(ev) {
        var checkIcon = $(this).find("i.am-icon-check-square-o");
        if (checkIcon.length > 0) {
            isUseCatfood = 0;
            $(this).find("i.am-icon-check-square-o").addClass("am-icon-square-o").removeClass("am-icon-check-square-o");
        } else {
            isUseCatfood = 1;
            $(this).find("i.am-icon-square-o").addClass("am-icon-check-square-o").removeClass("am-icon-square-o");
        }
        var courseNum = $(".pub-num .buy_num").val();
        rechargeObj.selectDiscountInfo(courseNum);
        ev.stopPropagation();
    });
}).call(this);
