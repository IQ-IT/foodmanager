/*
 * Category object
 *
 */

function Category(id, name) {
    this.id = id || '';
    this.name = name || '';
}

Category.prototype.isValid = function() {
    var self = this;
    return self.id && self.name;
}

module.exports = Category;