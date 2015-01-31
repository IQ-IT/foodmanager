/*
 * Foodplan repository
 *
 */

 /* jslint node: true */

 'use strict';

 var azure = require('azure'),
     nconf = require('nconf'),
     _ = require('lodash-node/underscore'),
     AzureTableStorage = require('./AzureTableStorage'),
     FoodPlan = require('./entities/FoodPlan'),
     DayPlan = require('./entities/DayPlan');

function FoodPlanRepository() {
    this.client = azure.createTableService(nconf.get('AzureAccountName'), nconf.get('AzureAccountKey'));
    this.tableName = 'foodplans';
    this.partitionKey = nconf.get('ApplicationName');
    this.storage = new AzureTableStorage(this.client, this.tableName, this.partitionKey);
}

FoodPlanRepository.prototype = {
    add: function(foodplan, callback) {
        var self = this;
        var storeThis = {
            id: foodplan.key,
            name: foodplan.key,
            storedPlan: foodplan.getStorageFoodPlan()
        };
        self.storage.add(storeThis, callback);
    },
    get: function(key, callback) {
        var self = this;
        self.storage.get(key, function(result) {
            if (result.statuscode) {
                callback({
                    errorCode: 404,
                    errorText: 'No foodplan found'
                });
                return;
            }
            var plan = new FoodPlan({year: 1900, week: 1});
            plan.parseStorageFoodPlan(result.storedPlan);
            callback(plan);
        });
    },
    update: function(foodplan, callback) {
        var self = this;
        var storeThis = {
            id: foodplan.key,
            name: foodplan.key,
            storedPlan: foodplan.getStorageFoodPlan()
        };
        self.storage.update(storeThis, callback);
    },
    delete: function(key, callback) {
        var self = this;
        self.storage.delete(key, callback);
    },
    getAll: function(callback) {
        var self = this;
        self.storage.getAll(function(result) {
            if (result.length === 0) {
                callback({
                    errorCode: 204,
                    errorText: 'No FoodPlans found'
                });
            }
            var plans = _.map(result, function(p) {
                var plan = new FoodPlan({year: 1900, week: 1});
                plan.parseStorageFoodPlan(p.storedPlan);
                return plan;
            });
            callback(plans);
        });
    }
};

 module.exports = FoodPlanRepository;
