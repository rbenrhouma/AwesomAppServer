const mongoose = require('mongoose');

const User = mongoose.model('User', {
	account: {
		username: String,
		biography: String
	},
	email: String,
	tokenConnexion: String,
	tokenNotification: String,
	hash: String,
	salt: String,
	goods: [],
	services: []
});

module.exports = User;
