/*
 * Basic Dayplan tests
 *
 */

var should = require('should'),
    Category = require('../../modules/entities/Category'),
    Dayplan = require('../../modules/entities/Dayplan'),
    GroceryItem = require('../../modules/entities/GroceryItem');

describe('Dayplan', function() {
    describe('When newed up correctly', function() {
        var dayplan = null;

        before(function() {
            dayplan = new Dayplan(new Date());
        });

        it('should have these properties: date, morningMeal, lunchMeal, dinnerMeal, groceries', function() {
            dayplan.should.have.properties('date', 'morningMeal', 'lunchMeal', 'dinnerMeal', 'groceries');
        });

        it('should have property \'groceries\' which is an array', function() {
            dayplan.groceries.should.be.an.instanceof(Array);
        });

        it('groceries should start as an empty array', function() {
            dayplan.groceries.length.should.equal(0);
        });

        it('should have it\'s date initialized to 00:00:00:000 AM', function() {
            dayplan.date.getHours().should.equal(0);
            dayplan.date.getMinutes().should.equal(0);
            dayplan.date.getSeconds().should.equal(0);
            dayplan.date.getMilliseconds().should.equal(0);
        });
    });

    describe('When adding groceries', function() {
        var dayplan = null;

        beforeEach(function() {
            dayplan = new Dayplan(new Date());
        });

        it('should add something to the groceries array', function() {
            var item = new GroceryItem('1kg mel');
            dayplan.addGroceryItem(item);
            dayplan.groceries.length.should.equal(1);
        });

        it('should not be able to add an item which is not a GroceryItem', function() {
            (function() {
                dayplan.addGroceryItem({});
            }).should.throw('Not a GroceryItem');
        });
    });
});