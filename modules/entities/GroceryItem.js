/*
 * Grocery item
 *
 */

/* global module */

function GroceryItem(txt) {
    'use strict';
    this.text = txt;
    this.done = false;
}

GroceryItem.prototype.toggle = function() {
    'use strict';
    var self = this;
    self.done = !self.done;
};

module.exports = GroceryItem;