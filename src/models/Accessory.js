const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        requred: [true, 'Image URL is required!'],
        validate: [/^https?\/\//i, 'image URL is invalid!']
    },
    description: {
        type: String,
        required: true,
        maxLength: 100
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;