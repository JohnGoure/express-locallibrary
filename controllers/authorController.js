const Author = require('../models/author');
const Book = require('../models/book');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

let async = require('async');

// Display list of all Authors.
exports.author_list = function(req, res) {
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
        if (err) {return next(err);}
        res.render('author_list', {title: 'Author List', author_list: list_authors});
    });
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {
    
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
            .exec(callback);
        },
        authors_books: function(callback) {
            Book.find({'author': req.params.id}, 'title summary')
            .exec(callback);
        },
    }, function(err, results) {
            if(err) {return next(err);}
            if(results == null) {
                let err = new Error('Author not found');
                err.status = 404;
                return next(err);
        }
        // Successful, so render.
        res.render('author_detail', {title:'Author', author: results.author, author_books: results.authors_books})
    });
    
};

// Display Author create form on GET
exports.author_create_get = function(req, res) {
    res.render('author_form', {title: 'Create Author'});
};

// Handle Author create on Post
exports.author_create_post = [
    // Validate fields.
    body('first_name').isLength({min:1}).trim().withMessage('First name bust be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({min:1}).trim().withMessage('Family name must be specified.')
    .Alphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({checkFalsy: true}).isIS08601(),
    boyd('date_of_death', 'Invalid date of death').optional({checkFalsy: true}).isIS08601(),

    // Sanitize fields.
    sanitizeBody('firstname').trim().escape(),
    sanitizeBody('family_name').trim().escape,
    sanitizeBody('date_of_birth').trim().toDate(),
    sanitizeBody('date_of_death').trim().toDate(),

    // Process request after validation and sanitization.
    function(req, res, next) {
        const erros = validationResult(req);

        if (!error.isEmpty()) {
            res.render('author_form', {title: 'Create Author', author: req.body, errors: erros.array()});
            return;
        }
        else {
            var author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_bith: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });

            author.save(function(err) {
                if (err) {return next(err);}
                res.redirect(author.url);
            });
        }
    }
];

// Display Author delete form on GET
exports.author_delete_get = function(req, res) {
    res.send('Not Implemented: Author delete GET');
};

// Handle Author delete on POST
exports.author_delete_post = function(req, res) {
    res.send('Not Implemented: Author delete POST');
};

// Display Author update form on Get
exports.author_update_get = function(req, res) {
    res.send('Not Implemented: Author update GET');
};

// Handle Author update on POST
exports.author_update_post = function(req, res) {
    res.send('Not Implemented: Author update POST');
};