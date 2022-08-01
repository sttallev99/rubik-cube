const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const initHandlebars = require('./config/handlebars.js');
const routes = require('./routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = require('./config/database.js');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(auth)

initHandlebars(app);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(routes);

initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, () => console.log(`Application is running on http://localhost:${config.PORT}`))
    })
        .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('Application init failed:' + err);
    });
