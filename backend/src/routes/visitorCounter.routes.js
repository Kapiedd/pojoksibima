const express = require('express');
const router = express.Router();
const { getVisitorCounter, incrementVisitorCounter } = require('../controllers/visitorCounter.controller');

router.get('/visitor-counter', getVisitorCounter);
router.post('/visitor-counter/increment', incrementVisitorCounter);

module.exports = router;
