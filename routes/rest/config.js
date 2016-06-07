let argv = process.argv.slice(2);

if ("test" == argv || "dev" == argv) {
    exports.wechat = {
        'appId': 'wx16cd0f3f1f4ee12a',
        'appsecret': 'defcd1c0a12f0e6e383cfde5aff6d30e',
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
        'shareQRCodeAddress':"http://115.159.62.18:8888/wechatApi/file/createCode?memberId="
    }
} else {
    exports.wechat = {
        'appId': 'wx1cd873b4e2d1850f',
        'appsecret': '10df9012c0c22c3d8043662d3788c223',
        'host':'',
        'post':''
    }
}