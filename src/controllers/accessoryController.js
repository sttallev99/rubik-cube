const router = require('express').Router();
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('accessory/create')
});

router.post('/create', async(req, res) => {
    let { name, imageUrl, description } = req.body;

    await accessoryService.create(name, imageUrl, description);

    res.redirect('/');
});

module.exports = router;