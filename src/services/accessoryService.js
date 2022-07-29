const Accessory = require('../models/Accessory');

async function getAccessories() {
    return await Accessory.find({}).lean();
}

async function create(name, imageUrl, description) {
    return await Accessory.create({name, imageUrl, description});
}

const accessoryService = {
    create,
    getAccessories
}

module.exports = accessoryService;