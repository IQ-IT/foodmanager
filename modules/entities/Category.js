/*
 * Category object
 *
 */

var _ = require('lodash-node'),
    GroceryItem = require('./GroceryItem');

function Category(id, name) {
    if (!id || !name) {
        throw Error('Invalid arguments')
    }
    this.id = id || '';
    this.name = name || '';
    this.groceries = [];
};

Category.prototype.addGroceryItem = function(itemTxt) {
    var self = this;
    if (itemTxt === '') throw Error('Invalid arguments');
    if (typeof(itemTxt) !== 'string') throw Error('Invalid arguments');
    self.groceries.push(new GroceryItem(itemTxt));
};

Category.prototype.purgeDoneGroceryItems = function() {
    var self = this;
    self.groceries = _.filter(self.groceries, function(g) {
        return !g.done;
    });
}

Category.prototype.getStorageCategory = function() {
    var self = this;
    return JSON.stringify(self);
}

Category.prototype.parseStorageCategory = function(storageCategory) {
    var self = this;
    var parsedCat = JSON.parse(storageCategory);
    _.assign(self, parsedCat);
};

module.exports = Category;