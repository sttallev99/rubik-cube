const express = require('express');
const validator = require('validator');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnCube } = require('../middlewares/cubeAuthMiddleware');


const router = express.Router();

const getCreateCubePage = (req, res) => {
    res.render('cube/create')
};

const getCubeDetails = async(req, res) => {
    let cube = await cubeService.getOneCube(req.params.id);
    let isOwn = cube.creator !== undefined ? cube.creator.valueOf() : undefined;
    res.render('cube/details', {...cube, isOwn});
}

const getEditCubePage = async(req, res) => {
    //let cube = await cubeService.getOne(req.params.id);
    res.render('cube/edit', req.cube);
}

const postEditCubePage = async (req, res) => {
    const { name, description, imageUrl, difficulty } = req.body;

    await cubeService.updateCube(req.params.id, { name, description, imageUrl, difficulty });
    res.redirect(`/cube/${req.params.id}`)
}


const getDeleteCubePage = async(req, res) => {
    //let cube = await cubeService.getOne(req.params.id);
    res.render('cube/delete', req.cube);
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

    // if(!validator.isURL(imageUrl)) {
    //     return res.status(400).send('Invalid Email!');
    // }

    try{
        await cubeService.create(name, description, imageUrl, difficulty, req.user._id);

        res.redirect('/');
    } catch(err) {
        //res.status(400).send(err.message).end();
        res.locals.error = err.errors.name.message
        res.render('cube/create');
    }


};

router.get('/create', isAuth, getCreateCubePage);
router.post('/create',isAuth, createCube);
router.get('/:id', getCubeDetails);
router.get('/:id/edit', isAuth, isOwnCube, getEditCubePage);
router.get('/:id/delete',isAuth, isOwnCube, getDeleteCubePage);
router.post('/:id/delete',isAuth, isOwnCube, postDeleteCubePage);
router.post('/:id/edit', isAuth, isOwnCube, postEditCubePage)

router.use('/:id/accessory', cubeAccessoryController);

module.exports = router;