/*
 * Mocked categoryRepo
 *
 */

/* jslint node:true */

'use strict';

var nconf = require('nconf');
var _ = require('lodash-node/underscore');
var Category = require('./entities/Category');

function MockedCategoryRepo() {
    this.categories = [
        new Category('fg', 'Frugt og grønt'),
        new Category('ko', 'Kolonial'),
        new Category('me', 'Mejeri')
    ];
}

MockedCategoryRepo.prototype = {
    add: function(category, callback) {
        var self = this;
        if (_.any(self.categories, {'id':category.id})) {
            callback();
            return;
        }
        self.categories.push(category);
        callback();
    },
    get: function(id, callback) {
        var self = this;
        var result = _.find(self.categories, {'id':id});
        if (result === undefined) {
            callback({
                errorCode: '404',
                errorText: 'No category found'
            });
            return;
        }
        callback(result);
    },
    update: function(category, callback) {
        var self = this;
        var cat = _.find(self.categories, {'id':category.id});
        if (cat === undefined) {
            callback({
                errorCode: '404',
                errorText: 'No category found'
            });
            return;
        }
        cat.name = category.name;
        cat.setGroceryItems = category.groceryItems;
    },
    delete: function(id, callback) {
        return;
    },
    getAll: function(callback) {
        var self = this;
        callback(self.categories);
    },
    getByName: function(name, callback) {
        var self = this;
        var result = _.find(self.categories, {'name':name});
        if (result === undefined) {
            callback({
                errorCode: '404',
                errorText: 'No category found'
            });
            return;
        }
        callback(result);
    },
    queryAll: function(callback) {
        var self = this;
        callback({errorCode: '204'});
    },
    setGroceries: function(categoryId, groceries, callback) {
        var self = this;
        self.get(categoryId, function(category) {
            category.setGroceryItems(groceries);
            self.update(category, callback);
        });
    }
};

module.exports = MockedCategoryRepo;