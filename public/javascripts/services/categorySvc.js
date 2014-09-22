/*
 * Category service
 *
 */

(function() {
    'use strict';

    foodManagerApp.factory('categorySvc', function ($http, $q) {
        // vars 
        var _categories,
            _findCategoryById,
            _updateGroceries,
            getCategory,
            getCategories,
            add,
            addGroceryItem,
            update,
            updateGroceryItem,
            remove,
            removeGroceryItem;

        // private methods
        _findCategoryById = function(id) {
            if (!_categories) return null;
            return _.find(_categories, {id: id.toLowerCase()});
        };

        _updateGroceries = function(categoryId) {
            
            getCategory(categoryId).then(
                function(category){
                    var post = {
                        method: 'POST',
                        url: '/api/category/' + category.id,
                        data: {groceries: category.groceries } // TODO: Implement here
                    }
                    $http(post)
                        .success(function() {
                            console.log(updated);
                        });
                },
                function(error) {
                    console.log(error);
                }
            )
        };

        // methods
        getCategory = function(id) {
            var cat,
                deferred = $q.defer();

            if (_categories) {
                cat = _findCategoryById(id);
                if (cat) {
                     deferred.resolve(cat);
                } else {
                    deferred.reject('404');
                }
            } else {
                $http({method:'GET', url:'/api/categories'})
                    .success(function(data) {
                        _categories = data;
                        cat = _findCategoryById(id);
                        if (cat) {
                            deferred.resolve(cat);
                        } else {
                            deferred.reject('404');
                        }
                    })
                    .error(function(data, status) {
                        deferred.reject(status);
                    });
            }
            return deferred.promise;
        }

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

        addGroceryItem = function(groceryTxt) {
            // TODO: find category by id, push grocerytxt to groceries array, then return lists
            var deferred = $q.defer(),
                itemData = groceryTxt.split(':');

            getCategory(itemData[0])
                .then(
                    function(category) {
                        category.groceries.push({text: itemData[1], done: false});
                        _updateGroceries(category.id);
                        deferred.resolve(_categories);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            return deferred.promise;
        };

        update = function(data) {
            // TODO: Implement
            return;
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
            remove: remove,
            addGroceryItem: addGroceryItem
        };
    })
})();