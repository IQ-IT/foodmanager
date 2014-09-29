/*
 * Category object
 *
 */

/* global require, module */

var _ = require('lodash-node'),
    GroceryItem = require('./GroceryItem');

function Category(id, name) {
    'use strict';
    if (!id || !name) {
        throw Error('Invalid arguments');
    }
    this.id = id || '';
    this.name = name || '';
    this.groceries = [];
}

Category.prototype.addGroceryItem = function(itemTxt) {
    'use strict';
    var self = this;
    if (itemTxt === '') {
        throw Error('Invalid arguments');
    }
    if (typeof(itemTxt) !== 'string') {
        throw Error('Invalid arguments');
    }
    self.groceries.push(new GroceryItem(itemTxt));
};

Category.prototype.setGroceryItems = function(groceryItems) {
    'use strict';
    var self = this;
    if (!groceryItems) {
        self.groceries = [];
    }
    self.groceries = groceryItems;
};

Category.prototype.purgeDoneGroceryItems = function() {
    'use strict';
    var self = this;
    self.groceries = _.filter(self.groceries, function(g) {
        return !g.done;
    });
};

Category.prototype.getStorageCategory = function() {
    'use strict';
    var self = this;
    return JSON.stringify(self);
};

Category.prototype.parseStorageCategory = function(storageCategory) {
    'use strict';
    var self = this;
    var parsedCat = JSON.parse(storageCategory);
    _.assign(self, parsedCat);
};

module.exports = Category;