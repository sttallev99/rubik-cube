const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/login', (req, res) => {
    console.log(req.body);

    res.redirect('/login');
});

router.post('/register', (req, res) => {
    console.log(req.body);

    res.redirect('/register');
});
module.exports = router;