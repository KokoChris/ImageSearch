var mongoose = require('mongoose');


var logSchema = new mongoose.Schema(
	{
	    log: {
	        type: String
	    }
	}, 
	{
	    
	    timestamps: true
	}
);


module.exports = mongoose.model('Log',logSchema);