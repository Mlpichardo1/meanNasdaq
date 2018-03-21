var mongoose = require('mongoose');
var Search = mongoose.model('Search');

module.exports.searchAddOne = function(req, res) {

    var symbol = req.body.symbol;
    console.log("Inside searchAddOne", req.body)
    console.log("POST search to search page", symbol);

    Search.create({
            Symbol: symbol
        },

        function(err, doc) {
            if (err) {
                console.log("Error saving stock symbol");
                res
                    .status(500)
                    .json(err);
            }

            else {

                console.log('found doc', doc);

                res
                    .status(201)
                    .json(doc);
            }
        });
}

module.exports.searchGetAll = function(req, res) {
    console.log(req.query);

    Search
        .find()
        .exec(function(err, doc) {
            if (!doc) {
                console.log("No saved searches");
                res
                    .status(404)
                    .json({ "message": "No saved searches" });
                return;
            }
            else if (err) {
                console.log("Error finding saved searches");
                res
                    .status(500)
                    .json(err);
            }

            console.log("Returned doc", doc);
            res
                .status(200)
                .json(doc);
        });
};