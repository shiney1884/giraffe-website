const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')
const session = require('express-session');
const authController = require('../controllers/auth');

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

router.use(bodyparser.urlencoded({extended : true}));
router.use(bodyparser.json());

router.post('/login', authController.logIn);

module.exports = router;