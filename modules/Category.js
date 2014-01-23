/*
 * Category object
 *
 */

 function Category(id, name) {
    this.id = '';
    this.name = '';
    if (id) this.id = id;
    if (name) this.name = name;
 }

 Category.prototype = {
    isValid: function() {
        var self = this;
        return self.id && self.name;
    }
 }

 module.exports = Category;