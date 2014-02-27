/*
 * Basic Category tests
 *
 */

var should = require('should'),
    Category = require('../../modules/entities/Category'),
    GroceryItem = require('../../modules/entities/GroceryItem');

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

        it('should be able to parse stored category', function() {
            var stCat = {
                id: 1,
                name: 'Test',
                groceries: [{text:"Test1",done:false},{text:'Test2','done':true}]
            };
            category.parseStorageCategory(JSON.stringify(stCat));

            category.id.should.equal(1);
            category.name.should.equal('Test');
            category.groceries.should.have.lengthOf(2);
            category.groceries[0].should.have.property('text','Test1');
            category.groceries[0].should.have.property('done', false);
            category.groceries[1].should.have.property('text','Test2')
            category.groceries[1].should.have.property('done', true);
        });

        it('should be able to deliver storageCategory', function() {
            var stCat = {
                id: 1,
                name: 'Test',
                groceries: [{text:"Test1",done:false},{text:'Test2','done':true}]
            };
            category.parseStorageCategory(JSON.stringify(stCat));

            category.getStorageCategory().should.equal(JSON.stringify(stCat));
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

        it('should add a Category item to the groceries array', function() {
            category.addGroceryItem('2kg test');
            category.groceries[0].should.be.an.instanceOf(GroceryItem);
            category.groceries.should.have.lengthOf(1);
        });

        it('should throw an error if trying to add empty string', function() {
            (function() {
                category.addGroceryItem('');
            }).should.throw(/^Invalid/);
        });

        it('should throw an error if trying to add something that is not a string', function() {
            (function() {
                category.addGroceryItem();
            }).should.throw(/^Invalid/);
            (function() {
                category.addGroceryItem({});
            }).should.throw(/^Invalid/);
            (function() {
                category.addGroceryItem([]);
            }).should.throw(/^Invalid/);
        });
    });
});