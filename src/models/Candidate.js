const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Nombre obligatorio'], minlength: 2, trim: true },
  age: { type: Number, required: [true, 'Edad obligatoria'], min: 18 },
  status: {
    type: String,
    required: true,
    enum: { values: ['Pending','Active','Rejected'], message: 'Status inválido' },
    default: 'Pending',
  },
  skills: { type: [String], default: [] },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
