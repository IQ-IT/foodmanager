/*
 * Experimental groceries service
 *
 */

(function() {
    'use strict';

    foodManagerApp.factory('groceriesSvc', function() {
        // vars
        var shoppingLists,
            add,
            complete,
            purge;

        shoppingLists = [
            {
                id: 'ko',
                name: 'Kolonial',
                items: [
                    {text: '2kg mel', done: false},
                    {text: 'Mandler', done: true},
                    {text: 'Groft salt', done: false}
                ]
            },
            {
                id: 'me',
                name: 'Mejeri',
                items: [
                    {text: '2l letmælk', done: false},
                    {text: 'Smør', done: false}
                ]
            }
        ];

        return {
            shoppingLists: shoppingLists,
            add: add,
            complete: complete
        }
    });
})();

