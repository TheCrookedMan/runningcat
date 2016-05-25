var express = require('express');
var router = express.Router();

router.get('*.html', function(req, res, next) {
    var url = req.url;
    var allPath = url.substring(0,url.indexOf(".html"));
    // var filename = allPath.substring(allPath.lastIndexOf("/"));
    var filename = allPath.substring(1);
    console.log("filename:::"+filename);
    res.render(filename, { title: filename });
});

/* GET home page. */

router.get('*', function(req, res, next) {
    res.render('index', { title: 'index' });
});

module.exports = router;