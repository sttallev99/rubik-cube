const Accessory = require('../models/Accessory');

async function getAccessories() {
    return await Accessory.find({}).lean();
}

async function create(name, imageUrl, description) {
    return await Accessory.create({name, imageUrl, description});
}

async function getAllWithout(accessoryIds) {
    //return await Accessory.find({_id: {$nin: accessoryIds }}).lean();
    return await Accessory.find().where('_id').nin(accessoryIds).lean();
}

const accessoryService = {
    create,
    getAccessories,
    getAllWithout
}

module.exports = accessoryService;