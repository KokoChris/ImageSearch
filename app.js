var express = require('express'),
	http 	= require('http'),
	request = require('request'),
	port    = process.env.PORT || 3000,
	apiKey  = 'PtDnqJYXMyc+KnBQWMpykJmKunkbJfv2fTqOgx21a6A',
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	app  	= express();

app.use(bodyParser.urlencoded({extended:false}));


app.get('/',function (req,res) {
	res.send("Hello from the root route");
});



app.get('/search/:term',function(req,res) {
	// var options = {

	// } 
    request('https://user:PtDnqJYXMyc+KnBQWMpykJmKunkbJfv2fTqOgx21a6A@api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27xbox%27&$top=10&$format=JSON', function (error, response, body) {
	   
	    if (!error && response.statusCode == 200) {
	    	res.json(JSON.parse(body));
  	}
})
});

app.listen(port,function(){
	console.log('Server running on port '+ port)
});



