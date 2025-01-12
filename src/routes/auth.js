const express = require('express');
const { register, login, logout, verify, deleteUser } =  require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verify);
router.delete('/user', deleteUser);

module.exports = router;