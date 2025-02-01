const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['streak', 'weightLoss', 'firstWorkout', 'personalRecord'],
    required: true 
  },
  dateEarned: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);