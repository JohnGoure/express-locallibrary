var BookInstance = require('../models/bookinstance');

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res) {
    
    BookInstance.find()
    .populate('book')
    .exec(function(err, list_bookinstances){
        if (err) {return next(err);}
        res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: list_bookinstances});
    });
};

// Display detail page for a specific BookInstance
exports.bookinstance_detail = function(req, res) {
    
    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function(err, bookinstance) {
        if(err) {return next(err);}
        if(bookinstance==null) {
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }
        res.render('bookinstance_detail', {title: 'Book:', bookinstance: bookinstance});
    });
};

// Display BookInstance create form on GET
exports.bookinstance_create_get = function(req, res) {
    res.send('Not Implemented: BookInstance create GET');
};

// Handle BookInstance create on POST
exports.bookinstance_create_post = function(req, res) {
    res.send('Not Implemented: BookInstance create POST');
};

// Display BookInstace delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('Not Implemented: BookInstance delete GET');
};

// Handle BookInstace delete form on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('Not Implemented: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('Not Implemented: BookInstance update on GET');
};

// Handle BookInstance update form on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('Not Implemented: BookInstance update on POST');
};
