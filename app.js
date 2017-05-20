const express = require('express')
const path =  require('path')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session');
const expressValidator = require('express-validator');
const app = express();


app.use(express.static(path.join(__dirname,'client'),{maxAge: 0}))//315360000 }))


app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html',require('ejs').renderFile)

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(cookieParser());

//Set router
require('./routes/routes')(app)

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), function(){console.log(`app is running on port ${app.get('port')}`)})


