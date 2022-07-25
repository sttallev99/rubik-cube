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

const search = (text, from, to) => Cube.cubes.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));

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