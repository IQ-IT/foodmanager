/*
 * Category object
 *
 */

 function Category(id, name) {
    if (!id || !name) throw new Error('Invalid parameters');
    if (id) this.id = id;
    if (name) this.name = name;
 }

 module.exports = Category;