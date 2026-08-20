const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Groceries', 'Health', 'Other'],
    required: true
  },
  date: {
    type: Date
  },
  roundUp: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    required: false
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;