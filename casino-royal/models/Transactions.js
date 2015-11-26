/**
 * Created by frank on 26.11.15.
 */
var mongoose = require('mongoose');

var TransactionsSchema = new mongoose.Schema({
    value: {type: Number, default: 0},
    drink: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drinks' }]
});

mongoose.model('Transactions', TransactionsSchema);