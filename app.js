var express = require('express'),
    http = require('http'),
    request = require('request'),
    port = process.env.PORT || 3000,
    apiStart = "https://user:",
    apiKey = process.env.BINGAPIKEY,
    apiCode = "@api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27",
    mongoose = require('mongoose'),
    Log = require('./models/log')
    app = express();



mongoose.connect(process.env.IMAGELAYERDB);


app.get('/', function(req, res) {
    res.send("Hello from the root route");
});



app.get('/search/:term', function(req, res) {

    var offset = req.query.offset || 0;

    request(apiStart + apiKey + apiCode + req.params.term + '%27&$top=10' + '&$skip=' + offset + '&$format=JSON', function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var parsedBody = JSON.parse(body);
            var queryImages = parsedBody.d.results
            var output = { results: [] };
            queryImages.forEach(function(Image) {
                output.results.push({

                    'ID': Image.ID,
                    'ImageURL': Image.MediaUrl,
                    'SourceURL': Image.SourceUrl,
                    'Title': Image.Title,
                });
            })
            var newLog = { log: req.params.term };
            Log.create(newLog, function(err, log) {

                if (err) {
                    console.log(err);
                } else {
                    console.log(log)
                }

            });
            res.json(output);
        } else if (error) {
            res.redirect('/')
        }
    })
});

app.get('/logs', function(req, res) {
    var q = Log.find({}).
    sort({ 'createdAt': -1 }).
    limit(10).
    select({ "createdAt": 1, "log": 1, _id: 0 }).
    exec(function(err, data) { res.send(data) });

});

app.listen(port, function() {
    console.log('Server running on port ' + port)
});
