(function() {
    'use strict';

    foodManagerApp.controller('foodManager.indexController',
        function($scope, $http) {
            $scope.header = 'Welcome to the foodfight';
            $scope.categories = [];
            $http({method:'GET', url:'/api/categories'})
                .success(function(data) {
                    $scope.categories = data;
                });

            $scope.removeItem = function(item) {
                $scope.categories.splice($scope.categories.indexOf(item), 1);
            };

            $scope.addItem = function() {
                $scope.categories.push({id: 't', name: $scope.addItemTxt});
            };
        }
    );
})();