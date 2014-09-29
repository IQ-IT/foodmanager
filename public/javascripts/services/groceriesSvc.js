/*
 * Experimental groceries service
 *
 */

/* global _, foodManagerApp */

(function() {
    'use strict';

    foodManagerApp.factory('groceriesSvc', ['$q', 'categorySvc', function($q, categorySvc) {
        // vars
        var _shoppingLists,
            _updateList,
            add,
            getGroceries;

        // private methods
        _updateList = function() {
            // TODO: Implement or delete?
        };

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
        };

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
                            };
                        });
                    });
            }

            return deferred.promise;
        };

        return {
            getGroceries: getGroceries,
            add: add
        };
    }]);
})();

