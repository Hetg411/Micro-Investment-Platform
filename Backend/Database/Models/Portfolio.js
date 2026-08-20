const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stockSymbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalInvested:{
    type:Number,
    required:true
  },
  avgBuyPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;