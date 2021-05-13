// Require Libraries
require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// App Setup
const app = express();
app.use(cookieParser()); // Add this after you initialize express.
app.use(express.static('public'));

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

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
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);




// Start Server
app.listen(3000, () => {
  console.log('listening on port localhost:3000!');
});

module.exports = app;
