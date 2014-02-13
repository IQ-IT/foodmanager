/*
 * Experimental groceries service
 *
 */

(function() {
    'use strict';

    foodManagerApp.factory('groceriesSvc', function($http) {
        // vars
        var shoppingLists,
            add,
            complete,
            purge;

        // methods
        add = function(itemString) {
            var strings = itemString.split(':');
            var list = _.find(shoppingLists, function(l) {
                return l.id === strings[0].trim().toLowerCase();
            });
            list.items.push({text: strings[1].trim(), done: false});
        }

        // setup
        shoppingLists = [
            {
                id: 'ko',
                name: 'Kolonial',
                items: []
            },
            {
                id: 'me',
                name: 'Mejeri',
                items: []
            }
        ];

        return {
            shoppingLists: shoppingLists,
            add: add,
            complete: complete
        }
    });
})();

