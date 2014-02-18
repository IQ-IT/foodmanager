/*
 * Category object
 *
 */

function Category(id, name) {
    if (!id || !name) {
        throw Error('Invalid arguments')
    }
    this.id = id || '';
    this.name = name || '';
    this.groceries = [];
}

Category.prototype.addGroceryItem = function(item) {
    var self = this;
    self.groceries.push(item);
}

module.exports = Category;