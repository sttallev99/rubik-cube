const router = require('express').Router();


const authService = require('../services/authService');
const { TOKEN_COOKIE_NAME } = require('../constants');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', async(req, res) => {
    res.render('auth/register')
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.redirect('/');
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await authService.login(username, password);

    if(!user) {
        return res.redirect('/404');
    }

    console.log(user)

    const token =  await authService.createToken(user);

    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true
    })

    res.redirect('/')

});

router.post('/register', async(req, res, next) => {
    try {
        let {username, password, repeatPassword} = req.body;
        await authService.register(username, password, repeatPassword);

        res.redirect('/login')
    } catch(err) {
        res.status(400).render('auth/register', { error: err.message })
        //next(err.message);
    }

});
module.exports = router;