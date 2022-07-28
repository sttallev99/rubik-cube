const Accessory = require('../models/Accessory');

async function create(name, imageUrl, description) {
    return Accessory.create({name, imageUrl, description});
}

const accessoryService = {
    create
}

module.exports = accessoryService;