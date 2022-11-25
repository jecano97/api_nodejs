const router = require('express').Router();

const {login, register} = require('../controllers/auth.controller')

router.post('/Login',login);
router.post('/Register',register);

module.exports = router;