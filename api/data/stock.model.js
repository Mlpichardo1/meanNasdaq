var mongoose = require('mongoose');

// var reviewSchema = new mongoose.Schema({
//   name : {
//     type : String,
//     required : true
//   },
//   rating : {
//     type : Number,
//     required : true,
//     min : 0,
//     max : 5
//   },
//   review : {
//     type : String,
//     required : true
//   },
//   createdOn : {
//     type : Date,
//     "default" : Date.now
//   }
// });


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