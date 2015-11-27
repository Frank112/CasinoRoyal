(function () {
    var app = angular.module('casino', []);

    app.filter('moneyRound', function(){
        return function(input){
            return input - (input % 10);
        };
    });

    app.controller('Controller', function($scope, $http){
        $scope.currentStockValue = 1.0;
        $scope.drinks = [];
        $scope.moneyInfo = {};
        $scope.lastTransaction = {value : 0};
        $scope.statistic = [];
        $scope.directTransactionValue = 0;

        $scope.updateStatistics = function(){
          $http.get('/statistic').success(function(data){
            $scope.statistic = data;
          });
        };

        $scope.getStatisticValue = function(drink){
            var stat = {value: 0, penalty: 0};
            for(i = 0; i < $scope.statistic.length; i++){
                if($scope.statistic[i].drink[0] === drink._id){
                    stat.value = $scope.statistic[i].value;
                    stat.penalty = $scope.statistic[i].penalty;
                    return stat;
                }
            }
            return stat;
        };

        $scope.makeTransaction = function(drink, isPenalty){
            $http.post('/transaction', {drink: drink, isPenalty: isPenalty}).success(function(data){
                $scope.lastTransaction = data;
                $scope.updateMoneyInfo();
            });
        };

        $scope.makeDirectTransaction = function(isPenalty){
            $http.post('/directTransaction', {isPenalty: isPenalty, value: $scope.directTransactionValue}).success(function(data){
                $scope.lastTransaction = data;
                $scope.updateMoneyInfo();
                $scope.directTransactionValue = 0;
            });
        };

        $http.get('/moneyInfo').success(function(data){
            $scope.moneyInfo = data;
        });

        $scope.updateMoneyInfo = function(){
            $http.get('/moneyInfo').success(function(data){
                $scope.moneyInfo = data;
            });
        };

        $scope.updateDrinks = function(){
            $http.get('/drinks').success(function(data){
                $scope.drinks = data;
            });
        };

        $http.get('/drinks').success(function(data){
            $scope.drinks = data;
        });

        $scope.setCurrentStockValue = function(value){
            $scope.currentStockValue = value;
            $scope.updateDrinks();
        };

    });

})();