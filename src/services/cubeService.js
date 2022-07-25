const { text } = require('express');
const Cube = require('../models/Cube');

const cubeDb = [
    {
        name: 'Budy',
        description: 'Budy Description',
        imageUrl: 'dfsd',
        difficulty: '6'
    }
];

const getAll = () => Cube.cubes

const getOneCube = (id) => Cube.cubes.find(x => x.id === id);

const search = (text, from, to) => {
    let result = Cube.cubes;
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

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);
    Cube.add(cube);
}

const cubeService = {
    create,
    getAll,
    getOneCube,
    search
}

module.exports = cubeService;