// Imports
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors())

// GET call to return JSON that formats natural and unix 
app.get('/dateValues/:dateVal', function (req,res, next){
    // gets the request data
    var dateVal = req.params.dateVal;

    var dateFormattingOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if(isNaN(dateVal)) {
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString("en-US", dateFormattingOptions);
        var unixDate = new Date(dateVal).getTime()/1000;
    }
    else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal * 1000) 
        naturalDate = naturalDate.toLocaleDateString("en-US", dateFormattingOptions);
    }

    res.json({ unix: unixDate, natural: naturalDate });
});


app.listen(5000, function() {
    console.log('Working')
})
