var express = require('express');

var sigab = module.exports = express();

var bodyParser = require('body-parser');

sigab.listen(5000);

sigab.use(bodyParser.json());

sigab.use(bodyParser.urlencoded({

	extended: true
}));
