let express = require('express')
let app = express()

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


 
app.get('/', function(req, res) {
  res.send('Hola este es el API')
})

app.get('/planes/', function(req, res) {
	res.json(
		[
			{ id:'1', name:'Boeign'},
            { id:'2', name:'Airbus'},
            { id:'3', name:'Airbus2'},
            { id:'4', name:'Airbus3'}
		]
	)
})

app.post('/planes/user/', function(req, res) {
	
	console.log('Solicitud del Cliente', req.body)
	
	res.json(
		{
			error: false,
			msg:'OK',
			data: req.body
		}
	)
})

let port = 8000
app.listen(port)

console.log(`API iniciado en el puerto: ${port}`)