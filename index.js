const express = require('express');
const port = 5007;
//bodyparser
const bodyParser = require('body-parser'); //midleware body-parser  //console.log(req.body)
var userRoute = require('./routes/user.route');
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json 												//alternate		//express.json()
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded		//alternate		//express.urlencoded({ extended: true })

app.use(express.static('public'));

app.get('/', function (req, res){
	res.render('index',{
		name: 'NhatNH9'
	});
});

app.use('/users', userRoute);


app.listen(port, function(){
	console.log('Server is listening on port '+ port);
});
