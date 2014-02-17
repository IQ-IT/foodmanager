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
                    $scope.categories = cats;
                });
        };

        $scope.addItem = function() {
            $scope.alerts = [];
            var newCatArr = $scope.addItemTxt.split(':');
            categorySvc.add({id: newCatArr[0], name: newCatArr[1].trim()})
                .then(
                    function(cats) {
                        $scope.addItemTxt = '';
                        $scope.categories = cats;
                    },
                    function(reason) {
                        $scope.alerts.push({type:'danger', msg:reason});
                    }
                ); // add is a $q.promise
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
        $scope.shoppingLists = [];
        $scope.addTxt = '';

        // setup
        groceriesSvc.getGroceries()
            .then(function(lists) {
                $scope.shoppingLists = lists;
            });

        $scope.toggleItem = function(item) {
            item.done = !(item.done);
        }

        $scope.addItem = function() {
            if ($scope.addTxt) {
                groceriesSvc.add($scope.addTxt)
                    .then(function(lists){
                        $scope.shoppingLists = lists;
                        $scope.addTxt = '';
                        $("#addTxt").focus();
                    });
            }
        }
    }])
})();