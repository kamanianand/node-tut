const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit'); 

const {login,signup} = require('../controllers/LoginController');
const {userlist,updateUser,searchUser} = require('../controllers/UserController');
const userAuth = require('../middelwares/authMiddleware.js');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

router.post('/login', login);
router.post('/signup', signup);


router.get('/userlist', userAuth, userlist);
router.put('/update-user', userAuth, updateUser);
router.post('/search-user', userAuth, searchUser);

module.exports = router;
