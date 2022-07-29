const express = require('express');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');

const router = express.Router();

const getCreateCubePage = (req, res) => {
    res.render('cube/create')
};

const getCubeDetails = async(req, res) => {
    let cube = await cubeService.getOneCube(req.params.id);

    res.render('cube/details', cube);
}

const createCube = async(req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    try{
        await cubeService.create(name, description, imageUrl, difficulty);

        res.redirect('/');
    } catch(err) {
        res.status(400).send(err.message).end();
    }


};

router.get('/create', getCreateCubePage);
router.post('/create', createCube);
router.get('/:id', getCubeDetails);
router.use('/:id/accessory', cubeAccessoryController);

module.exports = router;