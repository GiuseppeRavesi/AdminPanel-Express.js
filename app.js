const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const checkAuthentication = require('./controllers/middlewares/checkAuthentication');
const getAdminProfile = require('./controllers/middlewares/getAdminProfile');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({
    secret: '39dk3ld93fkls02m',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } 
  }));

app.use(flash());

app.use((req, res, next) => {
  res.locals.message = req.flash('message');
  next();
});

app.use(getAdminProfile);
app.use(checkAuthentication);

//route
app.use('/', require('./routes/web'));

app.listen(3000);