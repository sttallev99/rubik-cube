const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Username should consists of english letters and digits'],
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Username should consists of english letters and digits'],
        minlenght: [8, 'Password mmust be at least 8 characters long'],
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

userSchema.virtual('repeatPassword').set(function(v) {
    if(v !== this.password) {
        throw new Error('Both password should be same');
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;