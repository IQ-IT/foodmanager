/*
 * CategoryRepo
 *
 */

var azure = require('azure');
var nconf = require('nconf');
var _ = require('lodash-node/underscore');
var AzureTableStorage = require('./AzureTableStorage');
var Category = require('./Category');


function CategoryRepo() {
    this.client = azure.createTableService(nconf.get('AzureAccountName'), nconf.get('AzureAccountKey'));
    this.tableName = 'categories';
    this.partitionKey = nconf.get('ApplicationName');
    this.storage = new AzureTableStorage(this.client, this.tableName, this.partitionKey);
};

CategoryRepo.prototype = {
    add: function(category, callback) {
        var self = this;
        self.storage.add(category, callback);
    },
    get: function(id, callback) {
        var self = this;
        self.storage.get(id, function(result) {
            console.log(result);
            if (result.statuscode) {
                callback({
                    errorCode: '404',
                    errorText: 'No category found'
                });
                return;
            }
            callback(new Category(result.id, result.name));
        });
    },
    update: function(category, callback) {
        var self = this;
        // self.storage.update(category, callback);
    },
    delete: function(id, callback) {
        var self = this;
        self.storage.delete(id, callback);
    },
    getAll: function(callback) {
        var self = this;
        self.storage.getAll(function(result) {
            if (result.length === 0) {
                //  Nothing was found
                callback({
                    errorCode: '204',
                    errorText: 'No categories found!'
                });
                return;
            }
            cats = _.map(result, function(c) {
                return new Category(c.id, c.name);
            });
            callback(cats);
        });
    }
}

module.exports = CategoryRepo;