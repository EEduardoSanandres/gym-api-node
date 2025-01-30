const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  equipment: { type: String },
  steps: [{ type: String, required: true }], // List of steps instead of a single description
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  videoUrl: { type: String, default: null }, // Optional field
  imageUrl: { type: String, default: null }, // Optional field
  gifUrl: { type: String, default: null }, // Optional GIF field
});

module.exports = mongoose.model('Exercise', exerciseSchema);
