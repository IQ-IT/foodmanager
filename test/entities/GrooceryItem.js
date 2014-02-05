/*
 * Unit tests for grocery item
 *
 */

var should = require('should'),
    Category = require('../../modules/entities/Category'),
    GroceryItem = require('../../modules/entities/GroceryItem');

describe('GroceryItem', function() {
    describe('when newing up without parameters', function() {
        it('should throw an error when missing a text', function() {
            (function() {
                var g = new GroceryItem();
            }).should.throw('Invalid parameters');
        });

        it('should contain a default category when missing a category', function() {
            var g = new GroceryItem('1kg mel');
            g.should.have.property('category', {id: 'in', name: 'Indkøb'});
        });
    })

    describe('when newed up with category and item', function() {
        var groceryItem = null;

        before(function() {
            groceryItem = new GroceryItem('1kg mel', new Category('ko', 'Kolonial'));
        });

        it('should have a category and an item property', function() {
            groceryItem.should.have.properties('category', 'item');
        });

        it('should contain the item text', function() {
            groceryItem.should.have.property('item', '1kg mel');
        });

        it('should contain a category', function() {
            groceryItem.should.have.property('category', {id: 'ko', name: 'Kolonial'});
        });
    });
});

