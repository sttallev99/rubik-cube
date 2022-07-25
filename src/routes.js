const express = require('express');


const cubeController = require('./controllers/cubeControllers.js');
const homeController = require('./controllers/homeController.js');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use('*', (req, res) => {
    res.render('404');
})

module.exports = router;