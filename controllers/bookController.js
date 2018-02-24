var Book = require('../models/book');

exports.index = function(req, res) {
    res.send('Not Implemented: Site Home Page');
};

// Display list of all books
exports.book_list = function(req, res) {
    res.send('Not Implemented: Book list');
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('Not Implemented: Book detail: ' + req.params._id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('Not Implemented: Book create GET');
};

// Handle book create form on POST.
exports.book_create_post = function(req, res) {
    res.send('Not Implmented: Book create POST');
};

// Display book delete on GET.
exports.book_delete_get = function(req, res) {
    res.send('Not Implemented: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('Not Implemented: Book delete POST');
};

// Display book update on GET.
exports.book_update_get = function(req, res) {
    res.send('Not Implemented: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('Not Implemented: Book update POST');
};