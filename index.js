// imports
const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const auth = require('./routes/auth')(router);
const blog = require('./routes/blog')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


// connection
mongoose.connect(config.uri, (err) => {
	if (err) {
		console.log('Could not connect');
	}
	else {
		console.log('You have successfully connected to ' + config.db);
		console.log(config.secret);
	}
});

// middleware
app.use(cors({
	origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/blog/dist/'));
app.use('/auth', auth);
app.use('/blog', blog);


// final
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/blog/dist/index.html'));
});

app.listen(8080, () => {
	console.log('Listening on port 8080');
});
