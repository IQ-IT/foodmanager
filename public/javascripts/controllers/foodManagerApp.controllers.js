(function() {
    'use strict';

    foodManagerApp.controller('categoryCtrl', ['$scope', 'categorySvc', function ($scope, categorySvc) {
        $scope.header = 'Kategorier';
        $scope.alerts = [];
        $scope.categories = [];
        categorySvc.getCategories().then(function(cats) {
            $scope.categories = cats;
        }); // getCategories is a $q.promise

        $scope.removeItem = function(item) {
            categorySvc.remove(item)
                .then(function(cats) {
                    $scope.categorie = cats;
                    $scope.alerts.push({type: 'success', msg: 'Kategorien blev slettet'});
                });
        };

        $scope.addItem = function() {
            $scope.categories.push({id: 't', name: $scope.addItemTxt});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
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