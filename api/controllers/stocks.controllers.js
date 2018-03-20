var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');

module.exports.stocksGetAll = function(req, res) {

    var offset = 0;
    var count = 3500;
    //count works with datafactory and stocklist controller for # items to display
    var maxCount = 3500;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
        //because queries come in a string, have to use parseInt
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
        //because queries come in a string, have to use parseInt
    }
    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "if supplied in querystring, count and offset should be numbers"

            });
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " exceeded"
            });
        return;
    }

    Stock
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, stocks) {
            if (err) {
                console.log("Error finding stocks");
                res
                    .status(500)
                    .json(err);
            }
            else {
                console.log("found stocks", stocks.length);
                res
                    .json(stocks);
            }
        });
};

module.exports.stocksGetOne = function(req, res) {
    var stockId = req.params.stockId;
    // var thisStock = stockData(stockId);
    //can stockId be symbol?
    console.log("GET stockId", stockId);

    Stock
        .findById(stockId)
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding stock");
                response.status = 500;
                response.message = err;

            }
            else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Stock ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

module.exports.stocksUpdateOne = function(req, res) {
    //probably not needed for comments and not updating stock info
    var stockId = req.params.stockId;
    // var thisStock = stockData(stockId);
    //can stockId be symbol?
    console.log("GET stockId", stockId);

    Stock
        .findById(stockId)
        .select("-comments")
        //excluding subdocuments

        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding stock");
                response.status = 500;
                response.message = err;

            }
            else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Stock ID not found"
                };
            }

            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            }
            else {
                //if wanted to edit stocks would include all fields of object    
                res
                    .status(200)
                    .json(doc);
            }
        });
};

module.exports.getOneSymbol = function(req, res) {
    var symbol = req.params.symbol;

    // var thisStock = stockData(stockId);
    //can stockId be symbol?
    console.log("GET stockSymbol", symbol);
    Stock

        .find({ Symbol: symbol })
        //({ parameter_name: req.params.name })
        .exec(function(err, doc) {
            // console.log(doc);
            // console.log(err);

            if (err) {
                console.log("Error finding stock symbol");
                res.status = 500;
                res.message = err;

            }
            else if (!doc) {
                console.log("!doc");
                res.status(404)
                    .json(
                        "Stock Symbol not found")
            }

            else if (doc) {
                console.log("res");
                console.log("else if doc getOneSymbol in stockscontroller:", doc);
                res
                    .status(200)
                    .json(doc);
                }
        });
};