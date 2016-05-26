/*
  REST请求，用来 nodejs 统一请求 JAVA API时调用。
 */

(function() {
    var qs, _makeToken;
    qs = require('querystring');

    exports.rest = function(url, options, success, error) {
        var $config, $http, jsonObject, optionspost, postheaders, reqPost;
        $http = require('http');
        $config = require('./config');
        // var cookies = options.cookies;
        // delete options.cookies;
        jsonObject = qs.stringify(options);

        postheaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': jsonObject.length
        };
        optionspost = {
            'host': $config.wechat.host,
            'port': $config.wechat.post,
            'path': url,
            'method': 'POST',
            'headers': postheaders
        };
        /*
          do the POST call
         */
        reqPost = $http.request(optionspost, function(res) {
            var dataStr;
            res.setEncoding("utf-8");
            dataStr = "";
            res.on('data', function(d) {
                // console.log("rest d:::" + d);
                dataStr += d;
            });
            res.on('end', function(ev) {
                /**
                 * 如果遇见没有任何返回就结束了，一半是 api 没有启动。
                 */
                success(dataStr);
            });
        });

        reqPost.on('error', function(e) {
            // console.log("e:::"+e);
            error(e);
        });

        /*
          write the json data
          发送REST请求时传入JSON数据
         */
        //reqPost.write(new Buffer(jsonObject,'utf-8') + "\n");
        
        reqPost.write(jsonObject);
        reqPost.end();
    };
}).call(this);
