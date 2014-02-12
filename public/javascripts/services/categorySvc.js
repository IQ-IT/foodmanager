/*
 * Category service
 *
 */

(function() {
    'use strict';

    foodManagerApp.factory('categorySvc', function ($http, $q) {
        // vars 
        var _categories,
            getCategories,
            add,
            update,
            remove;

        // methods
        getCategories = function() {
            var deferred = $q.defer();

            if (_categories) {
                deferred.resolve(_categories);
            } else {
            $http({method:'GET', url:'/api/categories'})
                .success(function(data) {
                    _categories = data;
                    deferred.resolve(_categories);
                });
            }
            return deferred.promise;
        }

        add = function(data) {

        };

        update = function(data) {

        };

        remove = function(data) {

        };

        return {
            getCategories: getCategories
        };
    })
})();