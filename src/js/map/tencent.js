(function() {
    window.mapisReady = false;
    var geocoder;
    var store = common.getStoreInfo();
    var storeAddress = store.address;
    var storeName = store.storeName;
    // storeAddress = '上海市闸北区 彭浦镇 江场三路市北半岛国际中心';

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
        },
        openMap: function() {
            this.getEndLocation(storeAddress, function(location) {
                wx.openLocation({
                    latitude: location.lat, // 纬度，浮点数，范围为90 ~ -90
                    longitude: location.lng, // 经度，浮点数，范围为180 ~ -180。
                    name: storeName, // 位置名
                    address: storeAddress, // 地址详情说明
                    scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            });
        },
        getEndLocation: function(address, callback) {
            //调用地址解析类
            geocoder = new qq.maps.Geocoder({
                complete: function(result) {
                    var location = result.detail.location;
                    callback(location);
                }
            });
            geocoder.getLocation(address);
        }
    }
    wx.ready(function() {
        window.mapisReady = true;
    });
    var wxinit = new initWXConfig();
    $("body").on("click", ".view-map", function(ev) {
        if (window.mapisReady) {
            wxinit.openMap();
        }
        ev.stopPropagation();
    });
}).call(this)
