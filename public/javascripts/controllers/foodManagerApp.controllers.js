(function() {
    'use strict';

    foodManagerApp.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {
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
    }]);

    foodManagerApp.controller('planCtrl', ['$scope', function ($scope) {
        $scope.header = 'Her er din madplan';
    }]);

    foodManagerApp.controller('shopCtrl', ['$scope', 'groceriesSvc', function ($scope, groceriesSvc) {
        console.log(groceriesSvc.shoppingLists);
        $scope.header = 'Indkøbsliste';
        $scope.shoppingLists = groceriesSvc.shoppingLists;
        $scope.addTxt = '';

        $scope.toggleItem = function(item) {
            item.done = !(item.done);
        }

        $scope.addItem = function() {
            if ($scope.addTxt) {
                groceriesSvc.add($scope.addTxt);
                $scope.shoppingLists = groceriesSvc.shoppingLists;
                $scope.addTxt = '';
                $("#addTxt").focus();
            }
        }
    }])
})();