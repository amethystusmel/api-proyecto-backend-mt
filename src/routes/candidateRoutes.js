const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getCandidates, getCandidateById, createCandidate, updateCandidate, deleteCandidate } = require('../controllers/candidateController');

router.get('/', auth, getCandidates);
router.get('/:id', auth, getCandidateById);
router.post('/', auth, createCandidate);
router.put('/:id', auth, updateCandidate);
router.delete('/:id', auth, deleteCandidate);

module.exports = router;
