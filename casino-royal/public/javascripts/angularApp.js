(function () {
    var app = angular.module('casino', []);

    app.controller('DrinksCtrl', function ($http) {
        var dc = this;
        dc.drinks = [];

        $http.get('/drinks').success(function(data){
            debugger;
            dc.drinks = data;
        });
    });
})();