var express = require('express'),
	http 	= require('http'),
	request = require('request'),
	port    = process.env.PORT || 3000,
    apiStart = "https://user:"
	apiKey  = 'PtDnqJYXMyc+KnBQWMpykJmKunkbJfv2fTqOgx21a6A',
    apiCode = "@api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27"
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	app  	= express();


var logSchema = new mongoose.Schema({
    log: {
        type: String
    	}
	},
    {
    	timestamps: true

    }
);

var Log = mongoose.model("Log", logSchema);

mongoose.connect('mongodb://dev:dev123@ds013320.mlab.com:13320/imglayer234')

app.use(bodyParser.urlencoded({extended:false}));


app.get('/',function (req,res) {
	var newLog = { log: 'just a test' };
     Log.create(newLog, function(err, log) {

     });
	res.send("Hello from the root route");
});



app.get('/search/:term',function(req,res) {
    
    var id = req.query.id;
	
    
    res.end("I have received the ID: " + id);
    
        
	//sample request--this is not yet dynamic :term from request should take the place of xbos,also we should have dynamic limit and take less data from the json body of the request
    request(apiStart+apiKey+apiCode+ req.params.term + '%27&$top=10&$format=JSON', function (error, response, body) {
        
        
	   
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

app.get('/logs',function(req,res){
  var q = Log.find({}).sort({'created_at':-1}).limit(10).exec(function(err,data){res.send(data)});
  
});

app.listen(port,function(){
	console.log('Server running on port '+ port)
});



