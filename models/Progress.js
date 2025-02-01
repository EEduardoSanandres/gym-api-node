const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  date: { type: Date, default: Date.now },
  sets: Number,
  reps: Number,
  weight: Number,
  unit: { type: String, enum: ['kg', 'lbs'] }
});

module.exports = mongoose.model('Progress', progressSchema);
