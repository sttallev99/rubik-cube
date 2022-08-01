const express = require('express');
const jwt = require('jsonwebtoken');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');


const router = express.Router();

const getCreateCubePage = (req, res) => {
    res.render('cube/create')
};

const getCubeDetails = async(req, res) => {
    let cube = await cubeService.getOneCube(req.params.id);

    res.render('cube/details', cube);
}

const getEditCubePage = async(req, res) => {
    let cube = await cubeService.getOne(req.params.id);
    res.render('cube/edit', cube);
}

const postEditCubePage = async (req, res) => {
    let cube = await cubeService.getOne(req.params.id);
    
    const uptedetBody = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: req.body.difficulty
    }

    await cubeService.updateCube(req.params.id, uptedetBody);
    res.redirect(`/cube/${req.params.id}`)
}


const getDeleteCubePage = async(req, res) => {
    let cube = await cubeService.getOne(req.params.id);
    res.render('cube/delete', cube);
}

const postDeleteCubePage = async(req, res) => {
    try{
        await cubeService.deleteCube(req.params.id);

        res.redirect('/');
    }catch(err) {
        res.status(400).send(err.message).end();
    }
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

router.get('/create', isAuth, getCreateCubePage);
router.post('/create',isAuth, createCube);
router.get('/:id', getCubeDetails);
router.get('/:id/edit', isAuth, getEditCubePage);
router.get('/:id/delete',isAuth, getDeleteCubePage);
router.post('/:id/delete',isAuth, postDeleteCubePage);
router.post('/:id/edit', isAuth, postEditCubePage)

router.use('/:id/accessory', cubeAccessoryController);

module.exports = router;