const express = require('express');
const initHandlebars = require('./config/handlebars.js');
const path = require('path');
const routes = require('./routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = require('./config/database.js');

const app = express();

app.use(express.urlencoded({extended: true}));

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
