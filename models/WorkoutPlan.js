const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  weeks: [{
    days: [{
      exercises: [{
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
        sets: Number,
        reps: Number,
        weight: Number,
        unit: { type: String, enum: ['kg', 'lbs'] }
      }]
    }]
  }]
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);