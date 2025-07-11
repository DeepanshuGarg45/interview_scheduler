const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const { validateInterview } = require('../middleware/validation');

router.get('/', interviewController.getAllInterviews);
router.get('/:id', interviewController.getInterviewById);
router.post('/', validateInterview, interviewController.createInterview);
router.put('/:id', validateInterview, interviewController.updateInterview);
router.delete('/:id', interviewController.deleteInterview);

module.exports = router;
