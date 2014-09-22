/*
 * Shop controller
 *
 */

(function() {
    foodManagerApp.controller('shopCtrl', ['$scope', 'categorySvc', function ($scope, categorySvc) {
        $scope.header = 'Indkøbsliste';
        $scope.shoppingLists = [];
        $scope.addTxt = '';

        // setup
        categorySvc.getCategories()
            .then(function(categories) {
                $scope.shoppingLists = categories;
            }
        );

        $scope.toggleItem = function(item) {
            item.done = !(item.done);
        }

        $scope.addGroceryItem = function() {
            if ($scope.addTxt) {
                categorySvc.addGroceryItem($scope.addTxt)
                    .then(function(lists){
                        $scope.shoppingLists = lists;
                        $scope.addTxt = '';
                        // TODO: $("#addTxt").focus();
                    });
            }
        }
    }])
})();