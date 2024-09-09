const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const briefController = require('../controllers/briefController');

router.get('/', (_, res) => {
  res.send('Home Page');
});

router.post('/sendemail', emailController.sendEmail);
router.post('/brief', briefController.sendBrief);

module.exports = router;
