var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type:String, require: true, max:100},
        family_name: {type:String, require:true, max:100},
        date_of_birth: {type:Date},
        date_of_death: {type:Date},
    }
);

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('life_formatted')
.get(function() {
    return this.date_of_birth? moment(this.date_of_birth).format('YYYY/MM/DD') : 'No info';
})

AuthorSchema
.virtual('death_formatted')
.get(function() {
    return this.date_of_death ?
    moment(this.date_of_death).format('YYYY/MM/DD') : '';
});

AuthorSchema
.virtual('lifespan')
.get(function() {
    let death_date_formatted = moment(this.date_of_death).format('YYYY/MM/DD');
    let birth_date_formatted = moment(this.date_of_birth).format('YYYY/MM/DD');

    if (this.date_of_birth==null) {return 'No Info';}
    else if (this.date_of_death)
    {
        let lifespan = birth_date_formatted + ' - ' + death_date_formatted;
        return lifespan;
    }
    else {
        let lifespan = birth_date_formatted + ' -';
        return lifespan;
    }
});

AuthorSchema
.virtual('name')
.get(function() {
    return this.family_name + ', ' + this.first_name
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);