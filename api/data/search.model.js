var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({

    Symbol: {
        type: String,
        required: true

    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Search', searchSchema);