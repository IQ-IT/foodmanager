/*
 * Routes
 *
 */

// GET /
function indexPage(req, res) {
    res.render('index', {});
}

exports.createRoutes = function(app) {
    app.get('/', indexPage)
}