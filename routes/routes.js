var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'index' });
});


router.get('/*.html', function(req, res, next) {
    var url = req.url;
    var allPath = url.substring(0,url.indexOf(".html"));
    var filename = allPath.substring(allPath.lastIndexOf("/"));
    res.render(filename, { title: filename });
});

module.exports = router;
