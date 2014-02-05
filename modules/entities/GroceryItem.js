/*
 * A grocery item
 *
 */

function GroceryItem(item, category) {
    if (!item || typeof(item) !== 'string') throw new Error('Invalid parameters');
    this.category = category;
    if (!this.category) {
        this.category = {
            id: 'in',
            name: 'Indkøb'
        }
    }
    this.item = item;
};

module.exports = GroceryItem;