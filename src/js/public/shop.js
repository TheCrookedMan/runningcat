(function() {
    function initWXConfig() {
        this.nonceStr = this.generateMixed(32);
        this.timestamp = new Date().getTime();
        this.url = window.location.href;
        this.appId = wechat_appId;
        this.debug = false;
        // 所有要调用的 API 都要加到这个列表中
        this.jsApiList = [
            'checkJsApi',
            'openLocation',
            'getLocation'
        ];
        this.signature = '';
        this.getJSApi_ticket();
    }
    initWXConfig.prototype = {
        getJSApi_ticket: function() {
            var self = this;
            $.post('/wechat/getJSApiTicket', function(data) {
                var signatureString = "jsapi_ticket=" + data.ticket + "&noncestr=" + self.nonceStr + "&timestamp=" + self.timestamp + "&url=" + self.url;
                self.signature = SHA1(signatureString);
                self.setConfig();
            });
        },
        setConfig: function() {
            var self = this;
            wx.config({
                debug: self.debug,
                appId: self.appId,
                timestamp: self.timestamp,
                nonceStr: self.nonceStr,
                signature: self.signature,
                jsApiList: self.jsApiList
            });
        },
        generateMixed: function(n) {
            var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var res = "";
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += chars[id];
            }
            return res;
        }
    }
    wx.ready(function() {
        wx.getLocation({
            success: function(res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度

                var geocoder = new qq.maps.Geocoder();
                var latLng = new qq.maps.LatLng(latitude, longitude);
                //对指定经纬度进行解析
                geocoder.getAddress(latLng);
                //设置服务请求成功的回调函数
                geocoder.setComplete(function(result) {
                    alert(JSON.stringify(result));
                });
                //若服务请求失败，则运行以下函数
                geocoder.setError(function() {
                    alert("出错了，请输入正确的经纬度！！！");
                });
            },
            cancel: function() {
                alert("用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。");
            },
            fail: function() {
                alert("接口调用失败时执行的回调函数。");
            }
        });
    });
    var wxinit = new initWXConfig();
}).call(this)
