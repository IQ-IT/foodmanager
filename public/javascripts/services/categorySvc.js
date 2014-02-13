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

        add = function(category) {
            var deferred = $q.defer();
            if (_.findIndex(_categories, {id:category.id}) !== -1) {
                deferred.reject('En kategori med denne id findes allerede!');
            } else {
                console.log(category);
                $http({method:'PUT', url:'/api/category', data: category})
                    .success(function(category) {
                        _categories.push(category);
                        deferred.resolve(_categories);
                    })
                    .error(function() {
                        deferred.reject('Der opstod en fejl under oprettelsen af kategorien');
                    });
            }
            return deferred.promise;
        };

        update = function(data) {

        };

        remove = function(category) {
            var deferred = $q.defer();
            $http({method:'DELETE', url:'/api/category/' + category.id})
                .success(function() {
                    _categories.splice(_categories.indexOf(category), 1);
                    deferred.resolve(_categories);        
                });
            return deferred.promise;
        };

        return {
            getCategories: getCategories,
            add: add,
            remove: remove
        };
    })
})();