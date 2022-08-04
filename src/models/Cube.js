const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Cube name should consists of english letters, digits and spaces'],
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        minlenght: 20
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: [/^https?:\/\//i, 'invalid image URL']
        validate: {
            validator: function(value) {
                return /^https?:\/\//i.test(value);
            },
            message: (props) => `Image URL ${props.value} is invalid!`
        }
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;