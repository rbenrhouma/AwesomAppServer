const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

const TokenGenerator = require('uuid-token-generator');

router.post('/sign_up', async (req, res) => {
	try {
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;
		const biography = req.body.biography;

		const tokgen = new TokenGenerator(); // Default Òis a 128-bit token encoded in base58

		if (username && email && password && biography) {
			const user = new User({
				account: { username: username, biography: biography },
				email: email,
				password: password,
				tokenConnexion: tokgen.generate(),
				tokenNotification: 'tokenNotification', // Arenplacer par le token généré par expo
				hash: '',
				salt: ''
			});
			await user.save();
			res.json(user);
		} else {
			res.status(400).json({ error: 'Wrong parameters' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get('/sign_in', async (req, res) => {
	const userName = req.body.username;
	const eMail = req.body.email;

	const user = await User.find({
		$or: [ { 'account.username': userName }, { email: eMail } ]
	});

	if (user) {
		res.json(user);
	} else res.status(400).json({ error: 'User not found' });
});

function hideProperty(key, value) {
	var props = [ 'salt', 'hash', 'tokenConnexion' ];
	if (props.includes(key)) return undefined;
	else return value;
}

router.get('/:id', async (req, res) => {
	let token = req.headers.authorization;
	const id = req.params.id;
	token = token.slice(7, token.length).trimLeft();
	if (token) {
		// const user = await User.find({ : token });
		const user = await User.findById(id);

		if (user) {
			if (user.tokenConnexion == token) {
				// res.json(user, replacer);
				res.send(JSON.stringify(user, hideProperty));
			} else
				res.status(400).json({
					error: 'Invalid token'
				});
		} else res.status(400).json({ error: 'User not found' });
	}
});

module.exports = router;
