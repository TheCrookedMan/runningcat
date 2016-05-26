let argv = process.argv.slice(2);

if ("test" == argv) {
    exports.wechat = {
        'appId': 'wx34c51d105b17c3e6',
        'redirectUri': 'http://weixinweb.epeit.com/',
        'appsecret': '59c354328fec1ad8e0569fbc4544fcf0',
        'host':'120.26.231.199',
        'post':'8888'
    }
} else {
    exports.wechat = {
        'appId': 'wx1cd873b4e2d1850f',
        'redirectUri': 'http://sh.wechat.epeit.com/',
        'appsecret': '10df9012c0c22c3d8043662d3788c223',
        'host':'',
        'post':''
    }
}