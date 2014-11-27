/*
 * Category controller
 *
 */

/* global foodManagerApp */

(function() {
    'use strict';

    foodManagerApp.controller('categoryCtrl', ['$scope', 'categorySvc', function ($scope, categorySvc) {
        var updateCategory;

        // private methods
        updateCategory = function(category) {
            categorySvc.update(category)
                .then(function() {

                });
        };

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
})();