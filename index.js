// // -- Imported Library's -- \\ \\
require('dotenv').config()
var express = require('express');

var SecretNum = process.env['SecretNum']
var rayKey = process.env['rayKey']
var rayKey2 = process.env['rayKey2']

// // -- Webserver Variables -- \\ \\
var app = express();
var port = 3000;
var test = '';
var Keys = [
'BalloonTesters',
'BalloonOwner?',
'BalloonIsTheBest',
'BoostersTheBest'

]

app.get('/test', function(req, res) {
	res.send(test)
});

app.get('/', function(req, res) {
	var key = req.query.key
	if (Keys.includes(key)) { } else { res.send(`Invalid Key`); return }
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	res.send(`${genstring() + '.' + (Buffer.from(key + rayKey + ((hours + ':' + minutes + ':' + seconds) + ':' + SecretNum) + rayKey2).toString('base64')) + '.' + genstring()}`)
})

app.get('/api', function(req, res) {
	test = `${req.query.user}.${req.query.amt}`
	res.send(req.query.user)
});

function genstring() {
	return require("randomstring").generate({ length: 20, charset: 'alphabetic' });
};

app.listen(port, () => console.log(`Red Is Watching`));
