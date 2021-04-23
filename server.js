// Require Libraries
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

// Set db
require('./data/reddit-db');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


require('./controllers/posts.js')(app);

// Routes
app.get('/', (req, res) => {
    res.render('posts-index');
  });

app.get('/posts/new', (req, res) => {
res.render('posts-new');
});


// Start Server
app.listen(3000, () => {
  console.log('listening on port localhost:3000!');
});