const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Título obligatorio'], minlength: 3, trim: true },
  company: { type: String, required: [true, 'Empresa obligatoria'], trim: true },
  description: { type: String, required: [true, 'Descripción obligatoria'], minlength: 10 },
  salary: { type: Number, min: 0 },
  status: {
    type: String,
    enum: { values: ['Open','Closed','Paused'], message: 'Status inválido' },
    default: 'Open',
  },
  skills: { type: [String], default: [] },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
