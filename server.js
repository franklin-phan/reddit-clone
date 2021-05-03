// Require Libraries
require('dotenv').config();

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// App Setup
const app = express();

//reference public folder
app.use(express.static('public'));

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Middleware
const exphbs  = require('express-handlebars');



app.use(cookieParser()); // Add this after you initialize express.
// Set db
require('./data/reddit-db');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

// Routes
app.get('/', (req, res) => {
    res.render('posts-index');
  });

// LOGIN FORM
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/new-post', (req, res) => {
res.render('posts-new');
});


// Start Server
app.listen(3000, () => {
  console.log('listening on port localhost:3000!');
});

module.exports = app;
