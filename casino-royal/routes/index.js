var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Casino Royale' });
});

var Drinks = mongoose.model('Drinks');
var Transactions = mongoose.model('Transactions');

router.get('/drinks', function(req, res, next) {
  Drinks.find(function(err, drinks){
    if(err){ return next(err); }

    res.json(drinks);
  });
});

router.post('/drinks', function(req, res, next) {
  var drink = new Drinks(req.body);

  drink.save(function(err, drinks){
    if(err){ return next(err); }

    res.json(drink);
  });
});

router.get('/reset', function(req, res, next){
  Drinks.remove()
});

module.exports = router;


