let argv = process.argv.slice(2);

if ("test" == argv || "dev" == argv) {
    exports.wechat = {
        'appId': 'wx16cd0f3f1f4ee12a',
        'appsecret': 'defcd1c0a12f0e6e383cfde5aff6d30e',
        'host':'115.159.62.18',
        'post':'8888'
    }
} else {
    exports.wechat = {
        'appId': 'wx1cd873b4e2d1850f',
        'appsecret': '10df9012c0c22c3d8043662d3788c223',
        'host':'',
        'post':''
    }
}