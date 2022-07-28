const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        requred: [true, 'Image URL is required!'],
        //validate: [/^https?\/\//i, 'image URL is invalid!']
        validate: {
            validator: function(value) {
                return /^https?:\/\//i.test(value);
            },
            message: (props) => `Image URL ${props.value} is invalid!`
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;