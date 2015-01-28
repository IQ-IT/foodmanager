    /*
 * Categoryrepo tests
 *
 */

/* jslint node: true */
/* global require, describe, before, it */

var should = require('should'),
    nconf = require('nconf'),
    Category = require('../modules/entities/Category'),
    GroceryItem = require('../modules/entities/GroceryItem'),
    CategoryRepo = require('../modules/CategoryRepo');

describe('CategoryRepo', function() {
    describe('when setup', function() {
        var repo;

        before(function() {
            nconf.file('config.json');
            repo = new CategoryRepo();
        });

        it('should have necessary methods', function() {
            repo.should.have.properties('add', 'get', 'update');
        });
    });

    describe('when adding', function() {
        var repo, cat;

        before(function() {
            nconf.file('config.json');
            repo = new CategoryRepo();
            cat = new Category('xx', 'TestCategory');
        });

        it('should be able to store category in storage', function() {
            repo.add(cat, function() {
                repo.get(cat.id, function(storedCat) {
                    storedCat.should.have.property('id', cat.id);
                });
            });
        });
    });

    describe('when editing', function() {
        var repo, cat;
        
        before(function() {
            nconf.file('config.json');
            repo = new CategoryRepo();
            cat = new Category('xx', 'TestCategory');
            repo.add(cat, null);
        });

        it('should be able to update the category', function() {
            cat.name = 'UpdatedName';
            repo.update(cat, function() {
                repo.get(cat.id, function(storedCat){
                    storedCat.should.have.property('name', 'UpdatedName');
                });
            });
        });

        it('should be able to save updated groceryitems', function() {
            cat.addGroceryItem('Testitem');
            repo.update(cat, function() {
                repo.get(cat.id, function(storedCat) {
                    storedCat.should.have.property('groceries');
                    storedCat.groceries.should.have.lengthOf(1);
                    storedCat.groceries[0].should.equal('Testitem');
                });
            });
        });
    });
});
