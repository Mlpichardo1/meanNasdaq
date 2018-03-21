var express = require('express');
var router = express.Router();

var ctrlStocks = require('../controllers/stocks.controllers.js');
var ctrlSearch = require('../controllers/search.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

// Stock routes
router
  .route('/stocks')
  .get(ctrlStocks.stocksGetAll)
//   .post(ctrlStocks.stocksAddOne);

router
  .route('/stocks/:stockId')
  .get(ctrlStocks.stocksGetOne)
  .put(ctrlStocks.stocksUpdateOne);

// Search routes
router
  .route('/stocks/search/:symbol')
  .get(ctrlStocks.getOneSymbol)

//search route to display saved search results 
router
  .route('/stocks/search/')
  .post(ctrlSearch.searchAddOne)
  .get(ctrlSearch.searchGetAll);

// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

  router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;