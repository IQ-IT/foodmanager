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
            foodplan = new FoodPlan({year: 2015, week: 1});
        });

        it('should be able to add and get a FoodPlan in storage', function() {
            repo.add(foodplan, function(result) {
                repo.get(foodplan.key, function(newplan) {
                    newplan.key.should.equal(foodplan.key);
                });
            });
        });


    });
});
