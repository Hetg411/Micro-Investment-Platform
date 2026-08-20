const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    stockSymbol: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    priceAtPurchase: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        enum: ["BUY", "SELL"],
        default: "BUY"
    }

}, { timestamps: true });


const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;