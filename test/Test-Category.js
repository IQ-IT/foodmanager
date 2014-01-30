/*
 * Basic Category tests
 *
 */

var should = require('should'),
    Category = require('../modules/Category');

describe('Category', function() {
    describe('when newed up correctly', function() {
        var category = null;
        
        before(function() {
            category = new Category('newid', 'newname');
        });

        it('should have a property called id with value \'newid\'', function() {
            category.should.have.property('id', 'newid');
        });

        it('should have a property called name with value \'newname\'', function() {
            category.should.have.property('name', 'newname');
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
    })
});