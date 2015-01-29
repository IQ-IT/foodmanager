/*
 * Basic tests for Foodplan
 *
 */

 /* jslint node: true */
 /* global describe, before, it */

 'use strict';

var moment = require('moment'),
    should = require('should'),
    FoodPlan = require('../../modules/entities/FoodPlan'),
    DayPlan = require('../../modules/entities/DayPlan');

describe('Foodplan', function() {
    describe('when newed up incorrectly', function() {
        it('should throw an error if no params are supplied', function() {
            (function() {
                var c = new FoodPlan();
            }).should.throw(/^Initialization error/);
        });
    });

    describe('when newed up with dates', function() {
        var foodplan = null,
            startDate, endDate;

        before(function() {
            startDate = moment('2014-01-01T00:00:00+01:00').toDate();
            endDate = moment('2014-01-31T00:00:00+01:00').toDate(); // one month
            foodplan = new FoodPlan({startDate: startDate, endDate: endDate});
        });

        it('should have key with year and weeknumber of first week in period', function() {
            foodplan.key.should.equal('201401');
        });

        it('should contain following props: "key", "startDate", "endDate", "planDays"', function() {
            foodplan.should.have.properties('key', 'startDate', 'endDate', 'planDays');
        });

        it('should have prop planDays with 31 items', function() {
            foodplan.planDays.length.should.equal(31);
        });

        it('should have matching start and end dates on first and last day', function() {
            var compFmt = 'YYYY-MM-DDTHH:mm:ss';
            moment(foodplan.planDays[0].date).format(compFmt).should.equal(moment(startDate).format(compFmt));
            moment(foodplan.planDays[30].date).format(compFmt).should.equal(moment(endDate).format(compFmt));
        });

    });

    describe('when newed up with year and weeknumber', function() {
        var foodplan = null,
            year, weeknumber;

        before(function() {
            year =  2014;
            weeknumber = 1;
            foodplan = new FoodPlan({year: year, week: weeknumber});
        });

        it('should have a key with year and weeknumber', function() {
            foodplan.key.should.match(/\d{6}/); 
        });

        it('should have startDate 30-12-2013 for week 1 of 2014', function() {
            moment(foodplan.startDate).format('DDMMYYYY').should.equal('30122013');
        });

        it('should have endDate 05-01-2014 for week 1 of 2014', function() {
            moment(foodplan.endDate).format('DDMMYYYY').should.equal('05012014');
        })

        it('should have key 201401 for week 1 of 2014', function() {
            foodplan.key.should.equal('201401');
        });

        it('should contain following props: "key", "startDate", "endDate", "planDays"', function() {
            foodplan.should.have.properties('key', 'startDate', 'endDate', 'planDays');
        });

        it('should have prop planDays with 7 items', function() {   
            // Test dates are monday through sunday = a week both days included
            foodplan.planDays.length.should.equal(7);
        });

    });

    describe('when initialized properly', function() {
        var foodplan = null,
            year, weeknumber;

        before(function() {
            year = 2014;
            weeknumber = 2;
            foodplan = new FoodPlan({year: year, week: weeknumber});
        });

        it('should have props: key, startDate, endDate, planDays', function() {
            foodplan.should.have.properties('key', 'startDate', 'endDate', 'planDays');
        });

        it('should have methods: getStorageFoodPlan, parseStorageFoodPlan', function() {
            foodplan.should.have.properties('getStorageFoodPlan', 'parseStorageFoodPlan');
        });

        it('should be able to return json representation of itself', function() {
            foodplan.getStorageFoodPlan().should.equal(JSON.stringify(foodplan));
        });

        it('should be able to hydrate itself from at stored category', function() {
            var newPlan = new FoodPlan(1900, 1);
            newPlan.parseStorageFoodPlan(foodplan.getStorageFoodPlan());
            newPlan.should.match(foodplan);
        });

        it('should have a dayplan list containing dayplans', function() {
            for (var i = 0; i < foodplan.planDays.lenght; i++) {
                foodplan.planDays[i].should.be.instanceof(DayPlan);    
            }
        });
    });
});