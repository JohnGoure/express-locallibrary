const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');


// Display list of all Genre.
exports.genre_list = function(req, res) {
    
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_genres) {
        res.render('genre_list', {title: 'Genre List', genre_list: list_genres})
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
            .exec(callback);
        },

        genre_books: function(callback) {
            Book.find({'genre': req.params.id})
            .exec(callback);
        },
    },

    function(err, results, next) {
        if(err) {return next(err); }
        if (results.genre==null) {// No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
    res.render('genre_detail', {title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books});

    });
}

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render('genre_form', {title: 'Create Genre'});
};

// Handle Genre create form on POST.
exports.genre_create_post = [

    body('name', 'Genre name required').isLength({min: 1}).trim(),

    sanitizeBody('name').trim().escape(),

    function(req, res, next) {
        const errors = validationResult(req);
        
        var genre = new Genre(
            {name: req.body.name}
        );

        if (!errors.isEmpty()) {
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid
            // Check if Genre with same name already exists
            Genre.findOne({'name': req.body.name})
            .exec( function(err, found_genre) {
                if (err) {return next(err);}

                if (found_genre) {
                    res.redirect(found_genre.url);
                }
                else {
                    genre.save(function(err){
                        if (err) {return next(err);}
                        res.render(genre.url);
                    });
                }
            });
        }
    }
];

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
