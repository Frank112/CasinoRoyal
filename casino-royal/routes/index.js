var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Casino Royale' });
});

var Drinks = mongoose.model('Drinks');
var Transactions = mongoose.model('Transactions');

var moneyContingent = 30000;
var moneyBank = moneyContingent;
var moneyCirculation = moneyContingent - moneyBank;

router.get('/drinks', function(req, res, next) {
  Drinks.find(function(err, drinks){
    if(err){ return next(err); }

    res.json(drinks);
  });
});

router.post('/drinks', function(req, res, next) {
  var drink = new Drinks(req.body);

  drink.save(function(err, drink){
    if(err){ return next(err); }

    res.json(drink);
  });
});

router.get('/currentStockValue', function(req, res, next){
  res.json({value: 1 - moneyCirculation / (moneyBank + moneyCirculation)});
});

router.get('/moneyInfo', function(req, res, next){
  res.json({
    bank: moneyBank,
    circulation: moneyCirculation
  });
});

router.post('/transaction', function(req, res, next){
  var transaction = new Transactions(req.body);

  transaction.save(function(err, transaction){
    if(err){return next(err);}

    res.json(transaction);
  });
});

module.exports = router;


