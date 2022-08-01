const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [2, 'Username must be at least 2 characters long']
    },
    password: {
        type: String,
        minlenght: [6, 'Password mmust be at least 6 characters long'],
        required: true
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next()
        });

});

userSchema.static('findByUsername', function(username) {
    return this.findOne({username})
});

const User = mongoose.model('User', userSchema);

module.exports = User;