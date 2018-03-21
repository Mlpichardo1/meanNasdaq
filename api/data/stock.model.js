var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
    Symbol: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    LastSale: String,
    Sector: String,
    StockUrl: String
});

mongoose.model('Stock', stockSchema);