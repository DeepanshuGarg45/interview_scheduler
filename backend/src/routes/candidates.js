const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { validateCandidate } = require('../middleware/validation');

router.get('/', candidateController.getAllCandidates);
router.get('/:id', candidateController.getCandidateById);
router.post('/', validateCandidate, candidateController.createCandidate);
router.put('/:id', validateCandidate, candidateController.updateCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
