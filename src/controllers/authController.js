const router = require('express').Router();

const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', async(req, res) => {
    res.render('auth/register')
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await authService.login(username, password);

    if(!user) {
        return res.redirect('/404');
    }

    console.log(user)

    const token =  await authService.createToken(user);

    res.cookie('jwt_token', token, {
        httpOnly: true
    })

    res.redirect('/')

});

router.post('/register', async(req, res) => {
    try {
        let {username, password, repeatPassword} = req.body;
        await authService.register(username, password, repeatPassword);

        res.redirect('/login')
    } catch(err) {
        res.status(400).send(err);
    }

});
module.exports = router;