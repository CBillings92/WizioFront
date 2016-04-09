var express = require('express');
var config = require('../config/config.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/test', function(req, res, next) {
    res.render('sdfa', {
        title: 'Express'
    });
});
router.get('/envbeurl', function(req, res, next){
    res.send(config.backendAPIURL);
});

module.exports = router;
