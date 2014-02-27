/*
 * Categoryrepo tests
 *
 */

var should = require('should'),
    nconf = require('nconf'),
    Category = require('../modules/entities/Category'),
    GroceryItem = require('../modules/entities/GroceryItem'),
    CategoryRepo = require('../modules/CategoryRepo');

describe('CategoryRepo', function() {
    describe('when setup', function() {
        var repo;

        before(function() {
            nconf.file('../config.json');
            repo = new CategoryRepo();
        });

        it('should have necessary methods', function() {
            repo.should.have.properties('add', 'get', 'update');
        });
    });
});
