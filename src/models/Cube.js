const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100
    },
    imageUrl: {
        type: String,
        required: true,
        //validate: /^https?:\/\//i
        validate: {
            validator: function(value) {
                return /^https?:\/\//i.test(value);
            },
            message: 'Image URL is invalid!'
        }
    },
    difficutyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }

});

const Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;