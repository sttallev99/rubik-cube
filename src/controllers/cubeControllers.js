const express = require('express');

const cubeService = require('../services/cubeService');

const router = express.Router();

const getCreateCubePage = (req, res) => {
    let cubes = cubeService.getAll();
    console.log(cubes)
    res.render('create')
};

const getCubeDetails = (req, res) => {
    let cube = cubeService.getOneCube(req.params.id);
    res.render('details', cube);
}

const createCube = (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    cubeService.create(name, description, imageUrl, difficulty);

    res.redirect('/');
};

router.get('/create', getCreateCubePage);
router.post('/create', createCube);
router.get('/:id', getCubeDetails)

module.exports = router;