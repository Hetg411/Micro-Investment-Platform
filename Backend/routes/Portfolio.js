const express = require("express");

const router = express.Router();
const auth=require("../middleware/auth")
const wallet=require("../Database/Models/Wallet")
const Investment = require("../Database/Models/Investment");
const Portfolio = require("../Database/Models/Portfolio");

const nifty50Top20 = [
    "RELIANCE.NS",
    "TCS.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "INFY.NS",
    "BHARTIARTL.NS",
    "ITC.NS",
    "SBIN.NS",
    "LT.NS",
    "KOTAKBANK.NS",
    "HINDUNILVR.NS",
    "AXISBANK.NS",
    "BAJFINANCE.NS",
    "MARUTI.NS",
    "SUNPHARMA.NS",
    "TITAN.NS",
    "ULTRACEMCO.NS",
    "ASIANPAINT.NS",
    "WIPRO.NS",
    "NESTLEIND.NS"
];

async function getLivePrices() {

    const { default: YahooFinance } = await import("yahoo-finance2");

    const yahooFinance = new YahooFinance();

    const result = await Promise.all(
        nifty50Top20.map(symbol => yahooFinance.quote(symbol))
    );

    return result.map(r => ({
        symbol: r.symbol,
        price: r.regularMarketPrice,
        change: r.regularMarketChangePercent
    }));
}

router.post("/investment", auth, async (req, res) => {
    try {
        const { stockSymbol, amount } = req.body;

        const userId = req.user.id;

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Investment amount must be greater than 0"
            });
        }

        // Get current stock price
        const { default: YahooFinance } = await import("yahoo-finance2");
        const yahooFinance = new YahooFinance();

        const stock = await yahooFinance.quote(stockSymbol);

        if (!stock || !stock.regularMarketPrice) {
            return res.status(404).json({
                message: "Stock data not found"
            });
        }

        const currentPrice = stock.regularMarketPrice;

        // Calculate quantity
        const quantity = amount / currentPrice;

        // Deduct money from wallet only if sufficient balance exists
        const walle = await wallet.findOneAndUpdate(
            {
                userId: userId,
                balance: { $gte: amount }
            },
            {
                $inc: { balance: -amount }
            },
            {
                new: true
            }
        );

        if (!walle) {
            return res.status(400).json({
                message: "Insufficient wallet balance"
            });
        }

        // Create investment history
        const investment = new Investment({
            userId: userId,
            stockSymbol: stockSymbol,
            amount: amount,
            quantity: quantity,
            priceAtPurchase: currentPrice,
            type: "BUY"
        });

        await investment.save();

        // Check whether user already owns this stock
        const existingPortfolio = await Portfolio.findOne({
            userId: userId,
            stockSymbol: stockSymbol
        });

        let portfolio;

        if (existingPortfolio) {

            const oldQuantity = existingPortfolio.quantity;
            const oldTotalInvested = existingPortfolio.totalInvested;

            const newQuantity = oldQuantity + quantity;
            const newTotalInvested = oldTotalInvested + amount;

            const newAvgBuyPrice =
                newTotalInvested / newQuantity;

            portfolio = await Portfolio.findOneAndUpdate(
                {
                    userId: userId,
                    stockSymbol: stockSymbol
                },
                {
                    quantity: newQuantity,
                    totalInvested: newTotalInvested,
                    avgBuyPrice: newAvgBuyPrice
                },
                {
                    new: true
                }
            );

        } else {

            portfolio = new Portfolio({
                userId: userId,
                stockSymbol: stockSymbol,
                quantity: quantity,
                totalInvested: amount,
                avgBuyPrice: currentPrice
            });

            await portfolio.save();
        }

        res.status(201).json({
            message: "Investment successful",
            data: {
                investment: investment,
                portfolio: portfolio,
                remainingBalance: walle.balance
            }
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error making investment",
            error: err.message
        });
    }
});

router.get("/investment", auth, async (req, res) => {
    try {
        const userId = req.user.id;

        const investments = await Investment.find({
            userId: userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Investment history fetched successfully",
            data: investments
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Error fetching investment history",
            error: err.message
        });
    }
});

router.get("/portfolio", auth, async (req, res) => {
    try {
        const userId = req.user.id;

        const portfolios = await Portfolio.find({
            userId: userId
        });

        const { default: YahooFinance } = await import("yahoo-finance2");
        const yahooFinance = new YahooFinance();

        const portfolioData = await Promise.all(
            portfolios.map(async (item) => {

                const stock = await yahooFinance.quote(
                    item.stockSymbol
                );

                const currentPrice = stock.regularMarketPrice;

                const currentValue =
                    item.quantity * currentPrice;

                const profitLoss =
                    currentValue - item.totalInvested;

                const profitLossPercentage =
                    (profitLoss / item.totalInvested) * 100;

                return {
                    stockSymbol: item.stockSymbol,
                    quantity: item.quantity,
                    totalInvested: item.totalInvested,
                    avgBuyPrice: item.avgBuyPrice,
                    currentPrice: currentPrice,
                    currentValue: currentValue,
                    profitLoss: profitLoss,
                    profitLossPercentage: profitLossPercentage
                };
            })
        );

        res.status(200).json({
            message: "Portfolio fetched successfully",
            data: portfolioData
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Error fetching portfolio",
            error: err.message
        });
    }
});

router.get("/stocks/data",auth, async (req, res) => {

    try {

        const stocksData = await getLivePrices();

        res.status(200).json({
            message: "Successfully got the data",
            data: stocksData
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message || "Something went wrong"
        });

    }

});

router.get("/awailableBalance",auth, async(req,res)=>{
   try{
     const userId=req.user.id;
    let balance=await wallet.findOne({userId:userId});
    res.status(200).json({
        message:"Balance Successfully fetched",
        data:balance
    })
   
   }
    catch(err){
          res.status(500).json({
        message:err
    })
    }
})



module.exports = router;