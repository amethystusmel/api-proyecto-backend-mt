const Candidate = require('../models/Candidate');

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({ deleted: false });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener candidatos', error: error.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ _id: req.params.id, deleted: false });
    if (!candidate) return res.status(404).json({ message: 'Candidato no encontrado' });
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

const createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error al crear candidato', error: error.message });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      req.body,
      { new: true, runValidators: true }
    );
    if (!candidate) return res.status(404).json({ message: 'Candidato no encontrado' });
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true },
      { new: true }
    );
    if (!candidate) return res.status(404).json({ message: 'Candidato no encontrado' });
    res.status(200).json({ message: 'Candidato eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};

module.exports = { getCandidates, getCandidateById, createCandidate, updateCandidate, deleteCandidate };
