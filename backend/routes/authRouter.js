const { signup, login, getProfile, updateProfile, logout} = require('../Controllers/AuthController'); 
const { signupValidation, loginValidation, updateProfileValidation } = require('../Middlewares/authValidation');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/logout' , authMiddleware, logout)
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfileValidation, updateProfile);

module.exports = router;