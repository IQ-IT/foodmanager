/*
 * API routes
 *
 */

var Category = require('../modules/entities/Category');
var CategoryRepo = require('../modules/CategoryRepo');

// GET /api/categories
function getCategories(req, res) {
    repo = new CategoryRepo();
    // test for query
    if (!Object.keys(req.query).length) {
        repo.getAll(function(result) {
            if (result.errorCode) {
                res.send(result.errorCode, result.errorText);
                return;
            }
            res.json(result);
        });
        return;
    }
    // perform query
    repo.queryAll(req.query, function(result) {
        if (result.errorCode) {
            res.send(result.errorCode, result.errorText);
            return;
        }
        res.json(result); 
    });
}

// GET /api/categories/name/:name
function getCategoriesByName(req, res) {
    repo = new CategoryRepo();
    repo.getByName(req.param('name'), function(result) {
        if (result.errorCode) {
            res.send(result.errorCode, result.errorText);
            return;
        }
        res.json(result);
    });
}

// GET /api/category/:id
function getCategory(req, res) {
    repo = new CategoryRepo();
    repo.get(req.param('id'), function(result) {
        if (result.errorCode) {
            res.send(result.errorCode, result.errorText);
            return;
        }
        res.json(result);
    });
}

// DELETE /api/category/:id
function deleteCategory(req, res) {
    var repo = new CategoryRepo();
    repo.delete(req.param('id'), function(error) {
        if (error) {
            res.send(500, error);
            return;
        }
        res.send(204);
    });
}

// POST /api/category/:id
function updateCategory(req, res) {
    // recreate category from post params
    // update category by passing it to categoryrepo
    var repo = new CategoryRepo();
    repo.setGroceries(req.params.id, req.param('groceries'));
    console.log(req.param('groceries'));
    res.send(501, 'Not implemented yet');
    // TODO: Implement above
}

// PUT /api/category
function addCategory(req, res) {
    try {
        var category = new Category(req.param('id'), req.param('name'));
        repo = new CategoryRepo();
        repo.add(category, function(error) {
            if (error) res.send(500, 'Error creating category');
            res.json(category);
        });
    } 
    catch(e) {
        res.send(400, 'Invalid category data');
    }
}

module.exports.createRoutes = function(app) {
    app.get('/api/categories', getCategories);
    app.get('/api/categories/name/:name', getCategoriesByName);
    app.put('/api/category', addCategory);
    app.post('/api/category/:id', updateCategory);
    app.get('/api/category/:id', getCategory);
    app.delete('/api/category/:id', deleteCategory);
};