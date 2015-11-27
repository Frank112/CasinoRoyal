var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Casino Royale' });
});

router.get('/bank', function(req, res, next){
  res.render('bank', {title: 'Casino Royale - Bank'});
});

var Drinks = mongoose.model('Drinks');
var Transactions = mongoose.model('Transactions');

var moneyBank = 30000;
var moneyCirculation = 0;
var drinkStatistic = [];
var moneyDiff = function(){
  Transactions.find(function(err, tas){
    moneyDiff = 0;
    for(i = 0; i < tas.length; i++){
      moneyDiff += tas[i].value;
      if(tas[i].drink !== []) {
        var inserted = false;
        for (j = 0; j < drinkStatistic.length; j++) {
          if(drinkStatistic[j].drink[0].equals(tas[i].drink[0])){
            if(tas[i].value < 0){
              drinkStatistic[j].value +=1;
            }
            else {
              drinkStatistic[j].penalty += 1;
            }
            inserted = true;
          }
        }
        if(!inserted){
          var value = 0;
          var penalty = 1;
          if(tas[i].value < 0){
            value = 1;
            penalty = 0;
          }
          drinkStatistic.push({drink: tas[i].drink, value: value, penalty: penalty});
        }
        }
    }
    moneyBank += moneyDiff;
    moneyCirculation -= moneyDiff;
  });
}();

var computeStockValue = function(){
  return 1 - moneyCirculation / (moneyBank + moneyCirculation);
};


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
  res.json({value: computeStockValue()});
});

router.get('/moneyInfo', function(req, res, next){
  res.json({
    bank: moneyBank,
    circulation: moneyCirculation
  });
});

router.post('/transaction', function(req, res, next){
  var transaction = new Transactions({
    value: function(){
      var value = 0;
      if(req.body.isPenalty) {
        value = req.body.drink.penalty * (1 + 0.5 * computeStockValue());
      }
      else {
        value = -req.body.drink.value * computeStockValue();
      }

      return value - (value % 10)
    }(),
    drink: req.body.drink
  });

    var inserted = false;
    for (j = 0; j < drinkStatistic.length; j++) {
      if(drinkStatistic[j].drink[0].equals(transaction.drink[0])){
        if(transaction.value < 0){
          drinkStatistic[j].value +=1;
        }
        else {
          drinkStatistic[j].penalty += 1;
        }
        inserted = true;
      }
    }
    if(!inserted){
      var value = 0;
      var penalty = 1;
      if(transaction.value < 0){
        value = 1;
        penalty = 0;
      }
      drinkStatistic.push({drink: transaction.drink, value: value, penalty: penalty});
    }

  moneyDiff += transaction.value;
  moneyBank += transaction.value;
  moneyCirculation -= transaction.value;
  transaction.save(function(err, transaction){
    if(err){return next(err);}

    res.json(transaction);
  });
});

router.post('/directTransaction', function(req, res, next){
  var transaction = new Transactions({
    value : function(){
      if(req.body.isPenalty){
        return req.body.value;}
      return -req.body.value;
    }()
  });
  moneyDiff += transaction.value;
  moneyBank += transaction.value;
  moneyCirculation -= transaction.value;
  transaction.save(function(err, transaction){
    if(err) {return next(err);}
    res.json(transaction);
  });
});

router.get('/statistic', function(req, res, next){
  res.json(drinkStatistic);
});

module.exports = router;


