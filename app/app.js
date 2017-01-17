var express = require('express');
var app = express();
var path = require('path');

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
});