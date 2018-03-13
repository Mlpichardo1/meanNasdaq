var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');



module.exports.stocksGetAll = function(req, res) {

  console.log('GET the stocks');
  console.log(req.query);

  var offset = 0;
  var count = 5;
  var maxCount = 50;


  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  Stock
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, stocks) {
      console.log(err);
      console.log(stocks);
      if (err) {
        console.log("Error finding stocks");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found stocks", stocks.length);
        res
          .json(stocks);
      }
    });

};

module.exports.stocksGetOne = function(req, res) {
  var id = req.params.stockId;

  console.log('GET stockId', id);

  Stock
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding stock");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("StockId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Stock ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

module.exports.stocksAddOne = function(req, res) {
  console.log("POST new hotel");

  Stock
    .create({
      name : req.body.name,
      description : req.body.description,
      stars : parseInt(req.body.stars,10),
      services : _splitArray(req.body.services),
      photos : _splitArray(req.body.photos),
      currency : req.body.currency,
      location : {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    }, function(err, stock) {
      if (err) {
        console.log("Error creating stock");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Stock created!", stock);
        res
          .status(201)
          .json(stock);
      }
    });

};


module.exports.stocksUpdateOne = function(req, res) {
  var stockId = req.params.stockId;

  console.log('GET stockId', stockhotelId);

  Stock
    .findById(stockId)
    .select('-reviews -rooms')
    .exec(function(err, stock) {
      if (err) {
        console.log("Error finding stock");
        res
          .status(500)
          .json(err);
          return;
      } else if(!stock) {
        console.log("StockId not found in database", stockId);
        res
          .status(404)
          .lson({
            "message" : "Hotel ID not found " + stockId
          });
          return;
      }

      stock.name = req.body.name;
      stock.description = req.body.description;
      stock.stars = parseInt(req.body.stars,10);
      stock.services = _splitArray(req.body.services);
      stock.photos = _splitArray(req.body.photos);
      stock.currency = req.body.currency;
      stock.location = {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      };

      stock
        .save(function(err, stockUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};