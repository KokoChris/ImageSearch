var express = require('express'),
	port    = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	app  	= express();

app.get('/',function (req,res) {
	res.send("Hello from the root route");
});

app.listen(port,function(){
	console.log('Server running on port '+ port)
});



