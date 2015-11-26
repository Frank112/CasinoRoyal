(function () {
    var app = angular.module('casino', []);

    app.controller('DrinksCtrl', [ $http, function ($http) {
        this.drinks = [];

        $http.get('/drinks').success(function(data){
            this.drinks = data;
        })
    }]);
});