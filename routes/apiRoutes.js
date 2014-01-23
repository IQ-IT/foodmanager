/*
 * API routes
 *
 */

var _ = require('lodash-node/underscore');
var Category = require('../modules/Category');
var CategoryRepo = require('../modules/CategoryRepo');

 // GET /api/categories
function getCategories(req, res) {
    repo = new CategoryRepo();
    repo.getAll(function(result) {
        if (!Array.isArray(result)) {
            res.send(404, 'No data found!');
            return;
        }
        // transform result to categorylist
        var cats = _.map(result, function(c) { return new Category(c.id, c.name); });
        res.json(cats);
    });
};

// GET /api/category/:id
function getCategory(req, res) {
    repo = new CategoryRepo();
    repo.get(req.param('id'), function(result) {
        if (result.statusCode) {
            res.send(404);
            return;
        }
        res.json(new Category(result.id, result.name));
    });
};

// DELETE /api/category/:id
function deleteCategory(req, res) {
    // TODO: Implement
}

// PUT /api/categories/add
function addCategory(req, res) {
    var category = new Category(req.param('id'), req.param('name'));
    if (!category.isValid()) res.send(400, 'Invalid category data');
    repo = new CategoryRepo();
    repo.add(category, function(error) {
        if (error) res.send(500, 'Error creating category');
        res.json(category);
    });
};

exports.createRoutes = function(app) {
    app.get('/api/categories', getCategories);
    app.get('/api/category/:id', getCategory);
    app.put('/api/categories/add', addCategory);
}