const express = require('express');
const router = express.Router();
const Good = require('../models/Good');

router.post('/publish', async (req, res) => {
	try {
		const title = req.body.title;
		const description = req.body.description;
		const photos = req.body.photos;
		const price = req.body.price;
		const address = req.body.address;
		const loc = req.body.loc;
		if (title && description && photos && price  && loc) {
			const good = new Good({
				title: title,
				description: description,
				photos: photos,
				price: price,
				address: address,
				loc: loc,
				ratingValue: ratingValue,
				review: review
			});
			await good.save();
			res.json(good);
		} else {
			res.status(400).json({ error: 'Wrong parameters' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	const id = req.query.id;
	try {
		const good = await Good.find();
		res.json(good);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const createFilters = (req) => {
	const filters = {};
	// if (req.query.city) {
	// 	filters.city = req.query.city;
	// }
	return filters;
};

router.get('/', async (req, res) => {
	try {
		console.log(req);
		const filters = createFilters(req);
		const search = Good.find(filters);
		if (req.query.page) {
			const page = req.query.page;
			const limit = 2;
			search.limit(limit).skip(limit * page);
		}
		const goods = await search;
		res.json(goods);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
