const router = require('express').Router({ mergeParams: true });

const cubeService = require('../services/cubeService');

router.get('/add', async(req, res) => {

    const cube = await cubeService.getOneCube(req.params.id);
    res.render('cube/accessory/add', cube);
});

module.exports = router;