var mongoose = require('mongoose');

var DrinksSchema = new mongoose.Schema({
    name: String,
    value: Number,
    penalty: Number,
});

mongoose.model('Drinks', DrinksSchema);

