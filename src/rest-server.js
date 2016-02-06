var express = require('express');
var lib = require('packs-lib');

//FIX THIS WHEN SPLIT TO ACTUAL APPS
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/packs');

var app = express();

var bodyParser = require('body-parser');
var crossDomain = lib.crossDomain;

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(crossDomain);

module.exports = app;