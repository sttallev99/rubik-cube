const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.all('/', (req, res) => {
    res.render('index');
});

app.listen(5000, () => console.log('Application is running on http://localhost:5000'))