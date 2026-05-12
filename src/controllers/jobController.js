const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ deleted: false });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener jobs', error: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, deleted: false });
    if (!job) return res.status(404).json({ message: 'Job no encontrado' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error al crear job', error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: 'Job no encontrado' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job no encontrado' });
    res.status(200).json({ message: 'Job eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob };
