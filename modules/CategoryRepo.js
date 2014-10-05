/*
 * CategoryRepo
 *
 */

/* global console, require, module */

var azure = require('azure');
var nconf = require('nconf');
var _ = require('lodash-node/underscore');
var AzureTableStorage = require('./AzureTableStorage');
var Category = require('./entities/Category');


function CategoryRepo() {
    'use strict';

    this.client = azure.createTableService(nconf.get('AzureAccountName'), nconf.get('AzureAccountKey'));
    this.tableName = 'categories';
    this.partitionKey = nconf.get('ApplicationName');
    this.storage = new AzureTableStorage(this.client, this.tableName, this.partitionKey);
}

CategoryRepo.prototype = {
    add: function(category, callback) {
        'use strict';

        var self = this;
        var storeThis = {
            id: category.id,
            name: category.name,
            storedCat: category.getStorageCategory()
        };
        self.storage.add(storeThis, callback);
    },
    get: function(id, callback) {
        'use strict';

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
            var cat = new Category(result.id, result.name);
            cat.parseStorageCategory(result.storedCat);
            callback(cat);
        });
    },
    update: function(category, callback) {
        'use strict';

        var self = this;
        var storeThis = {
            id: category.id,
            name: category.name,
            storedCat: category.getStorageCategory()
        };
        self.storage.update(storeThis, callback);
    },
    delete: function(id, callback) {
        'use strict';
        var self = this;
        self.storage.delete(id, callback);
    },
    getAll: function(callback) {
        'use strict';
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
            var cats = _.map(result, function(c) {
                    var cat = new Category(c.id, c.name);
                    cat.parseStorageCategory(c.storedCat);
                    return cat;
                });
            callback(cats);
        });
    },
    getByName: function(name, callback) {
        'use strict';
        var self = this;
        var qry = azure.TableQuery
            .select()
            .from(self.tableName)
            .where('PartitionKey == ?', self.partitionKey)
            .and('name eq ?', name);
        console.log(qry);
        // execute query
        self.storage.storageClient.queryEntities(qry, function(error, items) {
            if (error) {
                callback({errorCode: '500', errorText: 'Error performing query!'});
                return;
            }
            if (items.length === 0) {
                callback({errorCode: '204'});
                return;
            }
            var cats = _.map(items, function(c) {
                var cat = new Category(c.id, c.name);
                cat.parseStorageCategory(c.storedCat);
                return cat;
            });
            callback(cats);
        });
    },
    queryAll: function(qry, callback) {
        'use strict';
        var self = this;
        console.log(qry);
        callback({errorCode: '204'});
    },
    setGroceries: function(categoryId, groceries, callback) {
        'use strict';
        var self = this;
        self.get(categoryId, function(category) {
            category.setGroceryItems(groceries);
            // TODO implement saving of updated category here
            self.update(category, callback);
        });
    }
};

module.exports = CategoryRepo;