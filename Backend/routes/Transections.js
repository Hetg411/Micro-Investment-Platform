require("dotenv").config();
const Secret_Key=process.env.SecretKey;
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Transaction = require("../Database/Models/Transections.js");
const auth=require("../middleware/auth.js")
const Wallet=require("../Database/Models/Wallet.js")

router.get("/", auth, async (req, res) => {
  try {
    const { category, startDate, endDate, page = 1, limit = 10 } = req.query;

    const filter = {
      userId: req.user.id
    };

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      transactions,
      totalRecords: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

router.post("/addTransaction", auth, async (req, res) => {
    try {
        const { amount, category, date, roundUp, remarks } = req.body;

        const tr = {
            userId: req.user.id,
            amount,
            category,
            date,
            roundUp,
            remarks
        };

        const newTransaction = new Transaction(tr);

        await newTransaction.save();

        await Wallet.updateOne(
            { userId: req.user.id },
            { $inc: { balance: roundUp } },
            { upsert: true }
        );

        res.status(201).json({
            message: "Transaction saved",
            data: newTransaction
        });

    } catch (err) {
        res.status(500).json({
            message: "Error saving transaction",
            error: err.message
        });
    }
});


router.put("/updateTransaction/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, date, roundUp, remarks } = req.body;

        // First find the old transaction
        const oldTransaction = await Transaction.findOne({
            _id: id,
            userId: req.user.id
        });

        if (!oldTransaction) {
            return res.status(404).json({
                message: "Transaction not found or unauthorized"
            });
        }

        // Calculate difference in roundUp
        const roundUpDifference = roundUp - oldTransaction.roundUp;

        // Update transaction
        const updatedTransaction = await Transaction.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id
            },
            {
                amount,
                category,
                date,
                roundUp,
                remarks
            },
            {
                new: true,
                runValidators: true
            }
        );

        // Update wallet by only the difference
        await Wallet.updateOne(
            { userId: req.user.id },
            { $inc: { balance: roundUpDifference } },
            { upsert: true }
        );

        res.status(200).json({
            message: "Transaction updated",
            data: updatedTransaction
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating transaction",
            error: err.message
        });
    }
});


router.delete("/delete/transaction/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Transaction.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!response) {
            return res.status(404).json({
                message: "Transaction not found or unauthorized"
            });
        }

        // Remove the deleted transaction's roundUp from wallet
        await Wallet.updateOne(
            { userId: req.user.id },
            { $inc: { balance: -response.roundUp } }
        );

        res.status(200).json({
            message: "Transaction deleted successfully",
            data: response
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting transaction",
            error: err.message
        });
    }
});

router.get("/total", auth, async (req, res) => {
  try {

    const result = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: null,
          totalSaved: {
            $sum: "$roundUp"
          }
        }
      }
    ]);

    const totalSaved =
      result.length > 0 ? result[0].totalSaved : 0;

    res.status(200).json({
      message: "Total saved calculated",
      data: {
        totalSaved
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

router.get("/transaction/recent", auth, async (req, res) => {
  try {

    const trans = await Transaction.find({
      userId: req.user.id
    })
      .sort({ date: -1 })
      .limit(10);

    if (trans.length === 0) {
      return res.status(404).json({
        message: "No transactions found"
      });
    }

    res.status(200).json({
      message: "Transactions received",
      data: trans
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const tr = await Transaction.findOne({
      _id: id,
      userId: req.user.id
    });

    if (!tr) {
      return res.status(404).json({
        message: "Transaction not found or unauthorized"
      });
    }

    res.status(200).json({
      message: "Transaction found",
      data: tr
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});
module.exports = router;