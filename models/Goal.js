const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['weightLoss', 'muscleGain', 'endurance', 'strength'],
    required: true 
  },
  targetValue: Number,
  currentValue: Number,
  deadline: Date,
  status: { 
    type: String, 
    enum: ['active', 'achieved', 'failed'], 
    default: 'active' 
  }
});

module.exports = mongoose.model('Goal', goalSchema);