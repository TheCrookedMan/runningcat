var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var argv = process.argv.slice(2);
var routes, api, temp, errorRouter,myFilters,config;
if ("test" == argv) {
    routes = require('./routes/page-router');
    api = require('./routes/api-router');
    temp = require('./routes/temp-router');
    errorRouter = require('./routes/error-router');
    myFilters = require('./routes/tool/self-defined-filters');
    config = require('./routes/rest/config');
} else {
    routes = require('./lib/page-router');
    api = require('./lib/api-router');
    temp = require('./lib/temp-router');
    errorRouter = require('./lib/error-router');
    myFilters = require('./lib/tool/self-defined-filters');
    config = require('./lib/rest/config');
}

var app = express();

app.use(compression());

var swig = require('swig');
var _setting = {
    cache: false,
    locals: {
        now: function() {
            return new Date();
        }
    }
};

myFilters(swig);
swig.setDefaults(_setting);
app.engine('html', swig.renderFile);
// view engine setup
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
//设置全局属性
// app.set('wechat_appId', config.wechat.appId);
app.set('imageAddress', config.wechat.imageAddress);
app.set('shareQRCodeAddress', config.wechat.shareQRCodeAddress);
app.set('redirect_uri',config.wechat.redirect_uri);

app.set('environment',argv);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', api);
app.use('/', temp);
app.use('/', routes);
errorRouter(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
