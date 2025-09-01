const { signup, login, getProfile, updateProfile } = require('../Controllers/AuthController'); 
const { signupValidation, loginValidation, updateProfileValidation } = require('../Middlewares/authValidation');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

router.get('/profile', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfileValidation, updateProfile);

module.exports = router;