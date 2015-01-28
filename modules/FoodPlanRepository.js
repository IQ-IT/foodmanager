/*
 * Foodplan repository
 *
 */

 /* jslint node: true */

 'use strict';

 var azure = require('azure'),
     nconf = require('nconf'),
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
    get: function() {},
    update: function() {},
    delete: function() {},
    getAll: function() {}
};

 module.exports = FoodPlanRepository;
