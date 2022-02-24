import loginController from '../controllers/auth.controller';

const express = require('express');
const router = express.Router;

router.post('/login', (req, res) => {
  loginController(req, res);
});

module.exports = router;
