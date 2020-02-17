const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/awesomeApp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Charger le fichier index.js dans le repertoire routes
const routes = require('./routes/');

// on utilise les routes
app.use(routes);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname, +"index.html");
// });

// app.all("*", (req, res) => {
//   res.status(404).send("Page introuvable dans AwesomeApp");
// });

app.listen(process.env.PORT || 3000, () => {
	console.log('Serveur démarré');
});
