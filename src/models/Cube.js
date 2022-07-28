const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
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
    }

});

const Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;