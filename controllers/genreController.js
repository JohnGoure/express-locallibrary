var Genre = require('../models/genre');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    res.send('Not Implemented: Genre list');
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    res.send('Not Implemented: Genre detail: ' + req.params._id);
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('Not Implemented: Genre create GET');
};

// Handle Genre create form on POST.
exports.genre_create_post = function(req, res) {
    res.send('Not Implemented: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('Not Implemented: Genre delete GET');
};

// Handle Genre delete form on POST
exports.genre_delete_post = function(req, res) {
    res.send('Not Implemented: Genre delete POST');
};

// Display Genre update form on GET
exports.genre_update_get = function(req, res) {
    res.send('Not Implemented: Genre update GET');
};

// Handle Genre update form on POST
exports.genre_update_post = function(req, res) {
    res.send('Not Implemented: Genre update POST');
};
