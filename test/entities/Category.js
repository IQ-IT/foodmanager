/*
 * Basic Category tests
 *
 */

var should = require('should'),
    Category = require('../../modules/entities/Category');

describe('Category', function() {
    describe('when newed up correctly', function() {
        var category = null;
        
        before(function() {
            category = new Category('newid', 'newname');
            console.log(category);
        });

        it('should have a property called id with value \'newid\'', function() {
            category.should.have.property('id', 'newid');
        });

        it('should have a property called name with value \'newname\'', function() {
            category.should.have.property('name', 'newname');
        });

        it('should have a property called groceries which is an empty array', function() {
            category.should.have.property('groceries');
            category.groceries.should.be.an.Array
                .and.have.lengthOf(0);
        });

        it('should have a method for adding groceries', function() {
            category.addGroceryItem.should.be.a.Function;
        });
    });

    describe('when not newed up correctly', function() {
        it('should throw an error if id is missing', function() {
            (function() {
                var c = new Category();
            }).should.throw(/^Invalid/);
        });

        it('should throw an error if name is missing', function() {
            (function() {
                var c = new Category('newid');
            }).should.throw(/^Invalid/);
        });

        it('should throw an error if id or name is an empty string', function() {
            (function() {
                var c = new Category('', 'newname');
            }).should.throw(/^Invalid/);
            (function() {
                var c = new Category('newid', '');
            }).should.throw(/^Invalid/);
        });
    });

    describe('when adding groceries', function() {
        var category;

        beforeEach(function() {
            category = new Category('te', 'Test');
        });

        it('should add an item to the groceries array', function() {
            category.addGroceryItem('2kg test');
            category.groceries.should.have.lengthOf(1);
        });
    });
});