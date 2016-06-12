let logErrors, clientErrorHandler, errorHandler;

/*
   logErrors 将请求和错误信息写入标准错误输出、日志或类似服务：
*/

logErrors = (err, req, res, next) => {
    console.log("logErrors::::"+JSON.stringify(err));
    let method = req.method.toUpperCase()
    console.error("================================================ 错误输出 begin ================================================");
    console.error("请求方式===============>   " + method);
    console.error("请求URL===============>   " + req.url);
    console.error("cookies===============>   " + JSON.stringify(req.cookies));
    if ("GET" == method) {
        console.error("请求数据===============>   " + JSON.stringify(req.query));
    } else if ("POST" == method) {
        console.error("请求数据===============>   " + JSON.stringify(req.body));
    }
    console.error("error message===============>   " + err.msg);
    console.error("================================================ 错误输出 end ================================================");
    next(err);
}

/*
     clientErrorHandler 的定义如下（注意这里将错误直接传给了 next）：
 */

clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: '数据获取失败，请检查REST接口是否正确。' });
    } else {
        next(err);
    }
}

/*
    errorHandler 能捕获所有错误，其定义如下：
 */

errorHandler = (err, req, res, next) => {
    console.log("errorHandler::::"+JSON.stringify(err));
    // res.status(500);
    res.render('error', { error: err.msg });
}
module.exports = (app) => {
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
}
