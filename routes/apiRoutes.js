/*
 * API routes
 *
 */

// GET /api/categories
function getCategories(req, res) {
    var categories = [
        {id: 'ko', name: 'Kolonial'},
        {id: 'me', name: 'Mejeri'},
        {id: 'gr', name: 'Grønt'},
        {id: 'kø', name: 'Kød'},
        {id: 'ki', name: 'Kiosk'}
    ];
    res.json(categories);
}

exports.createRoutes = function(app) {
    app.get('/api/categories', getCategories);
}