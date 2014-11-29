/*
 * Category controller
 *
 */

/* global foodManagerApp */

(function() {
    'use strict';

    foodManagerApp.controller('categoryCtrl', ['$scope', 'categorySvc', function ($scope, categorySvc) {
        var updateCategory;

        $scope.header = 'Kategorier';
        $scope.itemTxt = '';
        $scope.isEditing= false;
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
            var newCatArr = $scope.itemTxt.split(':');
            categorySvc.add({id: newCatArr[0], name: newCatArr[1].trim()})
                .then(
                    function(cats) {
                        $scope.itemTxt = '';
                        $scope.categories = cats;
                    },
                    function(reason) {
                        $scope.alerts.push({type:'danger', msg:reason});
                    }
                ); // add is a $q.promise
        };

        $scope.editItem = function(item) {
            $scope.isEditing = true;
            $scope.itemTxt = item.id + ':' + item.name;
        };

        $scope.updateCategory = function() {
            $scope.alerts = [];
            var updateCatArr = $scope.itemTxt.split(':');
            categorySvc.update({id: updateCatArr[0], name: updateCatArr[1].trim()})
                .then(
                    function(cats) {
                        $scope.itemTxt = '';
                        $scope.isEditing = false;
                        $scope.categories = cats;
                    },
                    function(reason) {
                        $scope.itemTxt = '';
                        $scope.isEditing = false;
                        $scope.alerts.push({type:'danger', msg:reason});
                    }
                );
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }]);
})();