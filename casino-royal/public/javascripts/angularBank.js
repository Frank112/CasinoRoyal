/**
 * Created by frank on 27.11.15.
 */
(function () {
    var app = angular.module('bank', []);

    app.controller('DrinksCtrl', function ($scope, $http) {
        $scope.drinks = [];

        $http.get('/drinks').success(function(data){
            $scope.drinks = data;
        });
    });

    app.controller('MoneyInfoCtrl', function($scope, $http){
        $scope.moneyInfo = {};

        $http.get('/moneyInfo').success(function(data){
            $scope.moneyInfo = data;
        });

        $scope.updateMoneyInfo = function(){
            $http.get('/moneyInfo').success(function(data){
                $scope.moneyInfo = data;
            });
        };
    });

})();