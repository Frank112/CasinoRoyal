(function () {
    var app = angular.module('casino', []);

    app.controller('StockCtrl', function($scope){
        $scope.currentStockValue = 1.0;

        $scope.setCurrentStockValue = function(value){
            $scope.currentStockValue = value;
        };

    });

    app.controller('DrinksCtrl', function ($scope, $http) {
        $scope.drinks = [];

        $http.get('/drinks').success(function(data){
            $scope.drinks = data;
        });
    });

})();