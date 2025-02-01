const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'] 
  },
  durationWeeks: Number,
  focus: { 
    type: String, 
    enum: ['strength', 'hiit', 'mobility'] 
  },
  exercises: [{ 
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    sets: Number,
    reps: Number 
  }]
});

module.exports = mongoose.model('Routine', routineSchema);