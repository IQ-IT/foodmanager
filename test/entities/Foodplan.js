/*
 * Basic tests for Foodplan
 *
 */

var moment = require('moment'),
    should = require('should'),
    FoodPlan = require('../../modules/entities/FoodPlan');

describe('Foodplan', function() {
    describe('when newed up correctly', function() {
        var foodplan = null,
            startDate, endDate;

        before(function() {
            startDate = moment('2014-01-06T00:00:00+01:00').toDate();
            endDate = moment('2014-01-12T00:00:00+01:00').toDate(); // monday through sunday
            foodplan = new FoodPlan('testname', startDate, endDate);
        });

        it('should contain following props: "name", "startDate", "endDate", "planDays"', function() {
            foodplan.should.have.properties('name', 'startDate', 'endDate', 'planDays');
        });

        it('should have the name passed in', function() {
            foodplan.should.have.property('name', 'testname');
        });

        it('should have prop planDays with 7 items', function() {
            // Test dates are monday through sunday = a week both days included
            foodplan.planDays.length.should.equal(7);
        });

        it('should have matching start and end dates on first and last day', function() {
            var compFmt = 'YYYY-MM-DDTHH:mm:ss';
            moment(foodplan.planDays[0].date).format(compFmt).should.equal(moment(startDate).format(compFmt));
            moment(foodplan.planDays[6].date).format(compFmt).should.equal(moment(endDate).format(compFmt));
        });
    });
});