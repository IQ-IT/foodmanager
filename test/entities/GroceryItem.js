/*
 * Testing groceryitem
 *
 */

var should = require('should'),
    GroceryItem = require('../../modules/entities/GroceryItem');

describe('GroceryItem', function() {
    describe('When newed up correctly', function() {
        var groceryItem;

        before(function() {
            // set it up
            groceryItem = new GroceryItem('Test');
        });

        it('should have properties text, done', function() {
            groceryItem.should.have.properties('text', 'done');
        });

        it('should have its done property set to false', function() {
            groceryItem.done.should.equal(false);
        });
    });

    describe('when toggling done', function() {

        before(function() {
            // set it up
            groceryItem = new GroceryItem('Test');
        });

        it('should toggle the done property', function() {
            groceryItem.toggle();
            groceryItem.done.should.equal(true);
        })
    });
});
