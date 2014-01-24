/*
 * AzureTableStorage
 * Base class for an azure table storage repo
 *
 */

var azure = require('azure');

// Properties
function AzureTableStorage(storageClient, tableName, partitionKey) {
    this.storageClient = storageClient;
    this.tableName = tableName;
    this.partitionKey = partitionKey;
    this.storageClient.createTableIfNotExists(tableName, function(error) {
        if (error) {
            throw error;
        }
    });
};

// Methods
AzureTableStorage.prototype = {
    add: function(item, callback) {
        var self = this;
        // Azure ids - needs to have Uppercased beginning
        item.RowKey = item.id;
        item.PartitionKey = self.partitionKey;
        // Insert item
        console.log(item);
        self.storageClient.insertEntity(self.tableName, item, function(error) {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    },
    get: function(id, callback) {
        var self = this;
        self.storageClient.queryEntity(self.tableName, self.partitionKey, id, function(error, entity) {
            if (error) {
                callback(error);
            } else {
                callback(entity);
            }
        });
    },
    getAll: function(callback) {
        var self = this;
        var query = azure.TableQuery
            .select()
            .from(self.tableName);
        self.storageClient.queryEntities(query, function(error, items) {
            if (error) {
                callback(error);
            } else {
                callback(items);
            }
        });
    },
    delete: function(id, callback) {
        var self = this;
        var entityid = {
            PartitionKey: self.partitionKey,
            RowKey: id
        }
        self.storageClient.deleteEntity(self.tableName, entityid, function(error) {
            if (error) {
                callback(error)
            } else {
                callback();
            }
        });
    } 
};

module.exports = AzureTableStorage;