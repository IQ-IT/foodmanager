/*
 * CategoryRepo
 *
 */

var azure = require('azure');
var nconf = require('nconf');
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
        self.storage.get(id, callback);
    },
    update: function(category, callback) {
        var self = this;
        // self.storage.update(category, callback);
    },
    delete: function(id, callback) {
        var self = this;
        // self.storage.delete(category, callback);
    },
    getAll: function(callback) {
        var self = this;
        self.storage.getAll(callback);
    }
}

module.exports = CategoryRepo;