const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
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
  }))
  app.use(flash());
  app.use(passport.initialize())
  app.use(passport.session());

//Connect Db
db.connect();

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded());
app.use(express.json())

//HTTP logger
app.use(morgan('combined'))

//Template Engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'))
app.engine('handlebars', handlebars({
  helpers: {
    sum: (a, b) => a + b,
  }
}))

//Route init
route(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})