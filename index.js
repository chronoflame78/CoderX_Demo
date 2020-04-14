require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const express = require('express');
const port = 5007;
//bodyparser
const bodyParser = require('body-parser'); //midleware body-parser  //console.log(req.body)
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var cookieParser = require('cookie-parser');

var authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json 												//alternate		//express.json()
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded		//alternate		//express.urlencoded({ extended: true })
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.get('/', function (req, res){
	res.render('index',{
		name: 'NhatNH9'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);


app.listen(port, function(){
	console.log('Server is listening on port '+ port);
});
