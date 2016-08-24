let argv = process.argv.slice(2);

if ("test" == argv || "dev" == argv) {
    exports.wechat = {
        // 'appId': 'wx1dbdd8143174c693',
        // 'appsecret': 'd1959bc2399a333ea9b8effea2688dfe',
        /* REST 接口 服务器地址 */
        'host':'115.159.62.18',
        /* REST 接口 服务器端口 */
        'post':'8188',
        /* 图片显示前缀 */
        'imageAddress': 'http://115.159.62.18:8085/pic/images',
        /* 图片服务器 地址 */
        'uploadHost': "115.159.62.18",
        /* 图片服务器 端口 */
        'uploadPost': "8188",
        /* 图片上传接口 */
        'uploadUrl': "/wechatApi/proxy/uploadProxyForImage",
        /* 分享二维码获取地址 memberId 为用户的ID */
        'shareQRCodeAddress':"http://115.159.62.18:8188/wechatApi/file/createCode?memberId=",
        'redirect_uri':'http%3a%2f%2ftest.runningcat.club%2fwechatAuth.html'
    }
} else {
    exports.wechat = {
        // 'appId': 'wx1dbdd8143174c693',
        // 'appsecret': 'd1959bc2399a333ea9b8effea2688dfe',
        /* REST 接口 服务器地址 */
        'host':'115.159.62.18',
        /* REST 接口 服务器端口 */
        'post':'8888',
        /* 图片显示前缀 */
        'imageAddress': 'http://115.159.62.18:8085/pic/images',
        /* 图片服务器 地址 */
        'uploadHost': "115.159.62.18",
        /* 图片服务器 端口 */
        'uploadPost': "8888",
        /* 图片上传接口 */
        'uploadUrl': "/wechatApi/proxy/uploadProxyForImage",
        /* 分享二维码获取地址 memberId 为用户的ID */
        'shareQRCodeAddress':"http://115.159.62.18:8888/wechatApi/file/createCode?memberId=",
        'redirect_uri':'http%3a%2f%2fwechat.runningcat.club%2fwechatAuth.html'
    }
}