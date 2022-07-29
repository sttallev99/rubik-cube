const router = require('express').Router({ mergeParams: true });

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/add', async(req, res) => {

    const cube = await cubeService.getOneCube(req.params.id);
    const accessories = await accessoryService.getAccessories();
    console.log(accessories)
    res.render('cube/accessory/add', {cube, accessories});
});

module.exports = router;