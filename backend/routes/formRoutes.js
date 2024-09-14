// routes/formRoutes.js
const express = require('express');
const { processFormData } = require('../controllers/formController');

const router = express.Router();

router.post('/submit', processFormData);

module.exports = router;
