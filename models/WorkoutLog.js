const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  exercises: [{
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    setsCompleted: Number,
    repsPerSet: [Number],
    weightsUsed: [Number],
    notes: String
  }],
  duration: Number // en minutos
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);