/*
 * FoodPlanRepository tests
 *
 */

/* jslint node: true */
/* global require, describe, before, it */

'use strict';

var should = require('should'),
    nconf = require('nconf'),
    FoodPlanRepository = require('../modules/FoodPlanRepository'),
    FoodPlan = require('../modules/entities/FoodPlan'),
    DayPlan = require('../modules/entities/DayPlan');

describe('FoodPlanRepository', function() {
    describe('when setup', function() {
        var repo;

        before(function() {
            nconf.file('config.json');
            repo = new FoodPlanRepository();
        });

        it('should have these properties', function() {
            repo.should.have.properties('tableName', 'partitionKey', 'storage');
        });

        it('should have necessary methods', function() {
            repo.should.have.properties('add', 'get', 'getAll', 'update', 'delete');
        });

        it('should have tableName = foodplans', function() {
            repo.tableName.should.equal('foodplans');
        });
    });

    describe.skip('when doing crud operations', function() {
        var repo, foodplan;

        before(function() {
            nconf.file('config.json');
            repo = new FoodPlanRepository();
            foodplan = new FoodPlan({year: 2015, week: 2});
        });

        it('should be able to add and get a FoodPlan in storage', function(done) {
            repo.add(foodplan, function(result) {
                repo.get(foodplan.key, function(newplan) {
                    newplan.key.should.equal(foodplan.key);
                done(); // This makes mocha wait for the callback to execute
                });
            });
        });

        it('should be able to get a FoodPlan by key', function(done) {
            repo.get('201502', function(plan) {
                plan.should.be.instanceOf(FoodPlan)
                    .and.have.property('key', '201502');
                done();
            });
        });

        it('should be able to get all foodplans in storage', function(done) {
            repo.add(new FoodPlan({year: 2015, week: 3}), function() {
                repo.getAll(function(plans){
                    plans.length.should.equal(2);
                    plans[0].key.should.equal('201502');
                    plans[1].key.should.equal('201503');
                    done();
                });
            });
        });

        it('should be able to delete an already stored foodplan', function() {

        });


    });
});
