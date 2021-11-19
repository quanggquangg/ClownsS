const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')

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