const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['INFO', 'WARN', 'ERROR', 'DEBUG'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: 'unknown',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

logSchema.index({ message: 'text', source: 'text' });

module.exports = mongoose.model('Log', logSchema);