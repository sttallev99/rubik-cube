const express = require('express');


const cubeController = require('./controllers/cubeControllers.js');
const homeController = require('./controllers/homeController.js');
const accesoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use('/accessory', accesoryController);
router.use(authController);
router.use('*', (req, res) => {
    res.status(404).render('404');
})

module.exports = router;