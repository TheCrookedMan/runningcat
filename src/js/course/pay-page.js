(function() {
    var usrRechargeOrderRemainNum = 0;
    var needCourseNum = 0;
    var buyCopiesNumber = 1;
    $.post('/order/selectUsrRechargeOrderRemainNum', { memberId: userInfo.memberId, courseHourStatus: 1 }).success(function(data) {
        if (data.code == "0000" && data.success) {
            usrRechargeOrderRemainNum = data.data;
            $(".usrRechargeOrderRemainNum").text(data.data);
        } else {
            $(".usrRechargeOrderRemainNum").text(0);
        }
        getPayPageInfo();
    });

    function getPayPageInfo() {
        $.post('/coursePlan/queryCoursePlanInfo', { 'userId': userInfo.memberId, 'courseId': courseId }).success(function(data) {
            if (data.code == "0000" && data.success) {
                var record = data.data,
                    payInfo = [];
                payInfo.push("<ul>");
                payInfo.push("<li>");
                payInfo.push("时间：");
                payInfo.push(common.formatDate(record.courseDate, 'yyyy/MM/dd'));
                payInfo.push("周二 ");
                payInfo.push(record.startTime);
                payInfo.push(" ～");
                payInfo.push(record.endTime);
                payInfo.push(" </li>");
                payInfo.push("<li>");
                payInfo.push("所需课时：" + record.onceCourseHour + "课时");
                payInfo.push("</li>");
                payInfo.push("<li>");
                payInfo.push("地址：" + record.storeAddress);
                payInfo.push("</li>");
                payInfo.push("</ul>");
                $(".pay-info").html(payInfo.join(""));
                var oncePrice = record.oncePrice == undefined ? 0 : record.oncePrice;
                var peolist = [];
                for (var i = 1; i < 5; i++) {
                    if (i == 1) {
                        peolist.push('<a href="javascript:void(0)" data-num="' + i + '" data-once-price="' + oncePrice + '" data-once-course-hour="' + record.onceCourseHour + '" class="cur">');
                    } else {
                        peolist.push('<a href="javascript:void(0)" data-num="' + i + '" data-once-price="' + oncePrice + '" data-once-course-hour="' + record.onceCourseHour + '">');
                    }

                    peolist.push('<p>' + i + '人</p>');
                    peolist.push('<p>' + i * record.onceCourseHour + '课时</p>');
                    peolist.push('</a>');
                }
                $(".pub_peolist").html(peolist.join(""));
                totalPrice();
            }
        }).error(function(data) {

        });
    }

    $("body").on("click", ".pub_peolist a", function(ev) {
        $(".pub_peolist a.cur").removeClass("cur");
        $(this).addClass("cur");
        totalPrice();
        ev.stopPropagation();
    });

    function totalPrice() {
        var num = $(".pub_peolist a.cur").data("num");
        buyCopiesNumber = num;
        var oncePrice = $(".pub_peolist a.cur").data("oncePrice");
        var onceCourseHour = $(".pub_peolist a.cur").data("onceCourseHour");
        needCourseNum = num * onceCourseHour;
        var string = "¥ ";
        string += (num * oncePrice).toFixed(2);
        string += "（需" + needCourseNum + "课时）";

        if (usrRechargeOrderRemainNum < needCourseNum) {
            var href = $(".rechargePanel a").data('href');
            $(".rechargePanel a").attr('href',href+"?needCourseNum="+needCourseNum);
            $(".rechargePanel").show();
            $(".paymentPanel").hide();
        } else {
            $(".rechargePanel").hide();
            $(".paymentPanel").show();
        }
        rechargeObj.selectDiscountInfo(needCourseNum);
        gettimeMoneyPaymentList(needCourseNum, usrRechargeOrderRemainNum);
        $(".totalPrice").text(string);
    }
    /*
        获取可用课时纪录列表
     */
    function gettimeMoneyPaymentList(needCourseNum, usrRechargeOrderRemainNum) {
        $.get('/timeMoneyPayment_rechargelist.template', {
            memberId: userInfo.memberId,
            courseHourStatus: 1,
            needCourseNum: needCourseNum,
            usrRechargeOrderRemainNum: usrRechargeOrderRemainNum
        }).success(function(data) {
            data = data.replace(/(^\s+)|(\s+$)/g, "");
            $(".usrRechargeOrderList .rechargeList").html(data)
                // $(data).insertAfter();
        }).error(function(err) {});
    }
    /*
        课时支付 输入课时 功能
     */
    $("body").on("change", ".rechargeList input", function(ev) {
        var value = $(this).val();
        var maxValue = $(this).data("maxNum");
        if (!/^\d+$/g.test(value)) {
            $(this).val(needCourseNum);
        }
        value = $(this).val();
        if (value > maxValue) {
            if (needCourseNum > maxValue) {
                $(this).val(maxValue);
            } else {
                $(this).val(needCourseNum);
            }
        }
        ev.stopPropagation();
    });

    $(".cashPayment .info-body").hide();

    $("body").on("click", ".cashPayment", function(ev) {
        $(this).find(".info-body").show();
        $(this).addClass("cur");
        $(".classTimePayment").removeClass("cur");
        $(".classTimePayment .usrRechargeOrderList").hide();
        $(".classTimePayment .list-icon").removeClass("am-icon-dot-circle-o");
        $(".classTimePayment .list-icon").addClass("am-icon-circle-o");
        $(this).find(".list-icon").removeClass("am-icon-circle-o");
        $(this).find(".list-icon").addClass("am-icon-dot-circle-o");
        ev.stopPropagation();
    });

    $("body").on("click", ".classTimePayment", function(ev) {
        $(this).find(".list-icon").removeClass("am-icon-circle-o");
        $(this).find(".list-icon").addClass("am-icon-dot-circle-o");
        $(this).addClass("cur");
        $(".cashPayment").removeClass("cur");
        $(".cashPayment .list-icon").removeClass("am-icon-dot-circle-o");
        $(".cashPayment .list-icon").addClass("am-icon-circle-o");
        $(".cashPayment .info-body").hide();
        $(this).find(".usrRechargeOrderList").show();
        ev.stopPropagation();
    });

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
                    storeId: self.storeId
                }).success(function(data) {
                    if (data.code == "0000" && data.success) {
                        var record = data.data;
                        // var totalPrice = record.totalPrice.toFixed(2);
                        var actualPrice = record.actualPrice.toFixed(2);
                        var discountPrice = record.discountPrice.toFixed(2);
                        var nmemberCatFood = record.nmemberCatFood;
                        var catExchangePrice = record.catExchangePrice.toFixed(2);
                        var memberCatFood = record.memberCatFood;
                        var orderUnitPrice = record.orderUnitPrice.toFixed(2);
                        // $(".totalPrice").text(totalPrice);
                        $(".actualPrice").text(actualPrice);
                        $(".discountPrice").text(discountPrice);
                        $(".nmemberCatFood").text(nmemberCatFood);
                        $(".catExchangePrice").text(catExchangePrice);
                        $(".memberCatFood").text(memberCatFood);
                        $(".orderUnitPrice").text(orderUnitPrice);

                        self.discountInfo = {
                            totalNum: totalNum,
                            nmemberCatFood: nmemberCatFood
                        }
                        self.gradePanelString = '<tr><td colspan="4" class="col-red txt-l">*当前为' + record.gradeName + '，可再享受' + (record.mlevemRatio * 10).toFixed(1) + '折优惠</td></tr>';
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
                self.gradePanelString = "";
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
                    storeId: self.storeId
                }).success(function(data) {
                    $("#detail-popup").html(data);
                    $("#detail-popup tbody").append(self.gradePanelString);
                });
            } else {
                modal.alert("请购买课时！");
            }
        }
    }
    this.rechargeObj = new recharge();

    $("body").on("click", "#show-discount-detail", function(ev) {
        if (needCourseNum > 0) {
            $("#detail-popup").modal('open');
        } else {
            modal.alert("请购买课时！");
        }
        ev.stopPropagation();
    });
    $("#detail-popup").on('open.modal.amui', function() {
        rechargeObj.selectCopSalePolicy(needCourseNum);
    });
    /*
    单次课课时支付
     */
    $("body").on("click", ".classTimePaymentButton", function(ev) {
        if (needCourseNum > 0) {
            $.post('/order/classTimePayOrder', {
                memberId: userInfo.memberId,
                onceId: courseId,
                storeId: rechargeObj.storeId,
                buyCopies:buyCopiesNumber
            }).success(function(data) {
                if (data.code == "0000" && data.success) {
                    window.location.href = "/course/pay-success.html?courseId=" + courseId;
                } else {
                    // modal.alert(data.msg);
                }
            });
        } else {
            modal.alert("请输入需要购买课程所需的课时！");
        }

        ev.stopPropagation();
    });
    /*
        单次课现金支付
     */
    $("body").on("click", ".wechatPayment", function(ev) {
        if (needCourseNum > 0) {
            $.post('/order/classTimeMoneyPayment', {
                memberId: userInfo.memberId,
                totalNum: rechargeObj.discountInfo.totalNum,
                storeId: rechargeObj.storeId,
                hourSouce: 1,
                payType: 2,
                type: 1,
                catfood: rechargeObj.discountInfo.nmemberCatFood,
                onceId: courseId,
                openId: common.getOpenId(),
                buyCopies:buyCopiesNumber
            }).success(function(data) {
                if (data.code == "0000" && data.success) {
                    if (!data.data.retcode) {
                        modal.alert(data.data.error);
                    } else {
                        pay.go(data.data).then(function() {
                            // success
                        }, function() {
                            // error
                        });
                    }
                } else {
                    // modal.alert(data.msg);
                }
            })
        } else {
            modal.alert("请输入需要购买课程所需的课时！");
        }
        ev.stopPropagation();
    });
}).call(this)
