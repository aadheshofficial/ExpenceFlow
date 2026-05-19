const express = require('express');
const router = express.Router();
const { googleLogin, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/google', googleLogin);
router.get('/profile', protect, getProfile);

module.exports = router;
