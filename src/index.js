const express = require('express')
const path = require('path')
const exhandlebars = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const session = require('express-session')
const passport = require('passport');
const flash = require('connect-flash');

const route = require('./routes')
const db = require('./config/db')

//Authentication
require('./config/passport');
app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 180 * 60 * 1000 }
  }))
  app.use(flash());
  app.use(passport.initialize())
  app.use(passport.session());

//Connect Db
db.connect();

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded());
app.use(express.json())

//Template Engine
app.engine('handlebars', exhandlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'))
app.engine('handlebars', exhandlebars({
  helpers: {
    sum: (a, b) => a + b,
    multi:  (a, b) => a * b,
    eq: (v1, v2) => v1 == v2,
    ueq: (v1, v2) => v1 != v2,
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

//Route init
route(app)


app.listen(process.env.PORT || 5000)