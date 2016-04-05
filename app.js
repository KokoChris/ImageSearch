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
	
	//sample request--this is not yet dynamic :term from request should take the place of xbos,also we should have dynamic limit and take less data from the json body of the request
    request('https://user:PtDnqJYXMyc+KnBQWMpykJmKunkbJfv2fTqOgx21a6A@api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27xbox%27&$top=10&$format=JSON', function (error, response, body) {
	   
	    if (!error && response.statusCode == 200) {
	    	var  parsedBody =  JSON.parse(body);
	    	var  queryImages = parsedBody.d.results
	    	var  output = {results:[]};
	    	queryImages.forEach(function(Image){
	    		output.results.push({

	    			'ID':Image.ID,
	    			'ImageURL':Image.MediaUrl,
	    			'SourceURL':Image.SourceUrl,
	    			'Title':Image.Title,
	    		});
	    	})
	    	res.json(output);
  	}
})
});

app.listen(port,function(){
	console.log('Server running on port '+ port)
});



