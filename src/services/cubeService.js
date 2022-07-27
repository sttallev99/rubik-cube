const { text } = require('express');
const Cube = require('../models/Cube');

const getAll = async() => await Cube.find({}).lean();
const getOneCube = async(id) => await Cube.findById(id).lean();

const search = (text, from, to) => {
    let result = getAll();
    console.log(result)

    if(text) {
        result = result.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
    }

    if(from) {
        result = result.filter(x => x.difficulty >= from)
    }

    if(to) {
        result = result.filter(x => x.difficulty <= to);
    }
    
    return result;
    
}

const create = async(name, description, imageUrl, difficulty) => {
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    });
    
    return await cube.save();
}

const cubeService = {
    create,
    getAll,
    getOneCube,
    search
}

module.exports = cubeService;