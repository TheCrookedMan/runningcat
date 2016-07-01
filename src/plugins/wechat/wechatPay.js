(function() {
    function wechatPay() {}
    wechatPay.prototype = {
        go: function(data) {
            var dtd = $.Deferred();
            if ("0" === data.retcode) {
                var $$appId = data.appid;
                var $$timeStamp = data.timestamp;
                var $$nonceStr = data.noncestr;
                var $$package = data.package;
                var $$signType = data.signType;
                var $$paySign = data.sign;
                function onBridgeReady() {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": $$appId, //公众号名称，由商户传入
                            "timeStamp": $$timeStamp, //时间戳，自1970年以来的秒数
                            "nonceStr": $$nonceStr, //随机串
                            "package": $$package,
                            "signType": $$signType, //微信签名方式:
                            "paySign": $$paySign //微信签名
                        },
                        function(res) {
                            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                //  支付成功跳转到订单页面
                                dtd.resolve();
                            } else {
                                // 支付失败跳转到订单页面继续支付
                                dtd.reject(res.err_msg);
                                // orderState=0&
                            }
                        }
                    );
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            } else {
                // alert("微信支付失败！");
                dtd.reject("微信支付失败！");
            }
            return dtd.promise();
        }
    }
    this.pay = new wechatPay();
}).call(this);