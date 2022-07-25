const uniqid = require('uniqid');

class Cube {
    static #cubes = [
        {
            id: 'asdofmadskdls',
            name: 'Mirror Cube',
            description: 'Strange Cube',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mirror_Cube_solved.png/220px-Mirror_Cube_solved.png',
            difficulty: '4'
        },
        {
            id: '1lvc0id4l60im26i',
            name: 'Ice cube',
            description: 'Ice Cube description',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ice-Cube_2014-01-09-Chicago-photoby-Adam-Bielawski.jpg/250px-Ice-Cube_2014-01-09-Chicago-photoby-Adam-Bielawski.jpg',
            difficulty: '1'
          }
    ];

    constructor(name, description, imageUrl, difficulty) {
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    }

    static get cubes() {
        return Cube.#cubes.slice();
    }

    static add(cube) {
        Cube.#cubes.push(cube);
    }
}

module.exports = Cube;