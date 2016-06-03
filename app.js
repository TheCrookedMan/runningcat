var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var argv = process.argv.slice(2);
var routes, api, temp, errorRouter;
var myFilters = require('./self-defined-filters');
if ("test" == argv) {
    routes = require('./routes/page-router');
    api = require('./routes/api-router');
    temp = require('./routes/temp-router');
    errorRouter = require('./routes/error-router');
} else {
    routes = require('./lib/page-router');
    api = require('./lib/api-router');
    temp = require('./lib/temp-router');
    errorRouter = require('./lib/error-router');
}

var app = express();

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
app.use(errorRouter);

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
