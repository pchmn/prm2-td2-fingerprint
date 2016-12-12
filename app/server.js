var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const util = require('util')
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ejs template
var ejs = require('ejs');
app.set('view engine', 'ejs');

// redis
var redis = require('redis');
var client = redis.createClient();

/**
 * Home page
 */
app.get('/', function (req, res) {
    res.render('index', { title: 'ejs' });
});

/**
 * Result page
 */
app.get('/result', function(req, res) {
    console.log("salut les gars");
    res.render('result', {data: "okok"});
});

/**
 * Get fingerprint
 */
app.post('/fingerprint', function(req, res, next) {

    // result
    var result = req.body;
    // get fingerprint
    var fingerprint = req.body.fingerprint;
    result.fingerprint = fingerprint;
    // components
    result.components = req.body.components;
    result.components = JSON.parse(result.components)
    console.log(typeof result.components)
    //
    result.alreadyExists = false;

    // test if already exists
    client.get(result.fingerprint, function(err, reply) {
        // already exists
        if(reply) {
            result.alreadyExists = true;
            res.render('result', {result: result})
        }
        else {
            client.set(fingerprint, true, function(err, reply) {
                console.log(reply);
            });
            res.render('result', {result: result})
        }
    });

});


/**
 * Run app on port 3000
 */
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});