/*
 * Grocery item
 *
 */

/* jslint node:true */

'use strict';

function GroceryItem(txt) {
    this.text = txt;
    this.done = false;
}

GroceryItem.prototype.toggle = function() {
    var self = this;
    self.done = !self.done;
};

module.exports = GroceryItem;