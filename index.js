var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 2370);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  var getParams = [];
  for (var g in req.query){
    getParams.push({'name':g,'value':req.query[g]})
  }
  var getContext = {};
  getContext.entries = getParams;
  res.render('get', getContext);
});

app.post('/', function (req, res) {
  var postParams = [];
	for (var p in req.query){
	postParams.push({'name':p,'value':req.query[p]})
	}
	for (var b in req.body) {
	postParams.push({ "name": b, "value": req.body[b]});
	}
  var postContext = {};
  postContext.entries = postParams;
  res.render('post', postContext);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:');
});