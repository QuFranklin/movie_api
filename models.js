const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        genre: {
            name: String,
            description: String
        },
        director: {
            name: String,
            bio: String
        },
        actors: [String],
    //  ImagePath: String,
    //  Featured: Boolean
    }
);

let userSchema = mongoose.Schema(
    {
        Username: {type: String, required: true},
        Password: {type: String, required: true},
        Email: {type: String, required: true},
        Birthday: Date,
        FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
    }
);

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

let directorSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        bio: {type: String, required: true},
        birthDate: Date
    }
);

let genreSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true}
    }
);

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre', genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;