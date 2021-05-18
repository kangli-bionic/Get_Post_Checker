var express = require("express");

var app = express()
var bodyParser = require("body-parser");  
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

app.set('port', 2370);
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function(req, res)  
{
	var queryParams = [];
	for (var param in req.query) 
    {
		queryParams.push({"name": param, "value": req.query[param]});   
	}
	var context = {data:queryParams}
	res.render("get", context);                              
});

app.post("/", function(req, res)                           
{
	var queryParams = [];
	for (var param in req.query)
    {
		queryParams.push({"name": param, "value": req.query[param]});   
	}
    var bodyParams = [];
	for (var b in req.body) 
    {
		bodyParams.push({"name": b, "value": req.body[b]});
	}
	var context = {queryList:queryParams, bodyList:bodyParams};
    console.log(req.body, "CONTEXT")
	res.render("post", context);                                          
});

app.use(function(req, res){
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render("500");
});


  app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });