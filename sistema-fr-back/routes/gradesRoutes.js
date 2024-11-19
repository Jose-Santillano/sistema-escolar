// routes/gradesRoutes.js
const express = require('express');
const router = express.Router();
const { getGrades, createGrade } = require('../controllers/gradesControllers');

router.get('/', getGrades);
router.post('/', createGrade);

module.exports = router;
