// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   text: { type: String, required: true },
//   sender: { type: String, enum: ['user', 'ai'], required: true },
//   timestamp: { type: String, required: true },
//   isTyping: { type: Boolean, default: false },
//   isError: { type: Boolean, default: false },
// });

// const chatSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   timestamp: { type: Number, required: true },
//   messages: [messageSchema],
// });

// module.exports = mongoose.model('Chat', chatSchema);