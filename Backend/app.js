require("dotenv").config();
const Secret_Key=process.env.SecretKey;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TransactionRoutes = require("./routes/Transections");
const Round_UpRoutes = require("./routes/Round_Up");
const AutheticationRoutes=require("./routes/Autentication")
const auth=require("./middleware/auth")
const growthRoutes=require("./routes/Round_Up")
const goalRoutes=require("./routes/Goals");
const PortfolioRoute=require("./routes/Portfolio")

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/api/transactions", TransactionRoutes);
//app.use("/api/growth", Round_UpRoutes);
app.use("/api/authentication",AutheticationRoutes);
app.use("/api/growth",growthRoutes);
app.use("/api/goals",goalRoutes);
app.use("/api/portfolio",PortfolioRoute)

mongoose.connect(process.env.MongoDB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

let port = 8080;

app.get("/profile", auth, (req, res) => {
    res.json({
        message: "Welcome",
        user: req.user
    });
});

app.listen(port, () => {
  console.log("Server is listening");
});