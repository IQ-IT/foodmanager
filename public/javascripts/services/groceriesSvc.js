/*
 * Experimental groceries service
 *
 */

(function() {
    'use strict';

    foodManagerApp.factory('groceriesSvc', ['$http', '$q', 'categorySvc', function($http, $q, categorySvc) {
        // vars
        var _shoppingLists,
            add,
            getGroceries;

        // methods
        add = function(itemString) {
            var deferred = $q.defer();

            var strings = itemString.split(':');
            var list = _.find(_shoppingLists, function(l) {
                return l.id === strings[0].trim().toLowerCase();
            });
            list.items.push({text: strings[1].trim(), done: false});
            deferred.resolve(_shoppingLists);

            return deferred.promise;
        }

        getGroceries = function() {
            var deferred = $q.defer();

            if (_shoppingLists) {
                deferred.resolve(_shoppingLists);
            } else {
                categorySvc.getCategories()
                    .then(function(cats) {
                        _shoppingLists = _.map(cats, function(cat) {
                            return {
                                id: cat.id,
                                name: cat.name,
                                items: []
                            }
                        });
                    });
            }

            return deferred.promise;
        }

        return {
            getGroceries: getGroceries,
            add: add
        }
    }]);
})();

