require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const express = require('express');
const port = 5007;
//bodyparser
const bodyParser = require('body-parser'); //midleware body-parser  //console.log(req.body)
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var cookieParser = require('cookie-parser');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');
var csurf = require('csurf');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json 												//alternate		//express.json()
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded		//alternate		//express.urlencoded({ extended: true })
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));
app.use(sessionMiddleware);
app.use(csurf({cookie: true}));


app.get('/', function (req, res){
	res.render('index',{
		name: 'NhatNH9'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);



app.listen(port, function(){
	console.log('Server is listening on port '+ port);
});
