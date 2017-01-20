require('dotenv').config()
var express = require('express');
var app = express();
var path = require('path');

// Set the configuration for QuizApp
var config = require('./config')
var path = require('path');

var admin = require("firebase-admin");

var serviceAccount = require("./quizapp-2105e-firebase-adminsdk-nzjji-1430e2c327.js");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://quizapp-2105e.firebaseio.com"
});


var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/view'));
app.set('views', path.join(__dirname, '/view'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res){
 	res.render('index.html')
 })

app.get('/login', function(req, res){
 	res.render('login/login.html')
 })
 
 app.listen(port, function(){
 	console.log('listening on port 3000')
 })