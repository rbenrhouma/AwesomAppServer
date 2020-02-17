const express = require('express');
const router = express.Router();

router.use('/api/user', require('./user'));
router.use('/api/good', require('./good'));
router.use('/api/service', require('./service'));

module.exports = router;
