const express = require("express");
const router = express.Router();

const User = require("../Database/Models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt=require("jsonwebtoken")
require("dotenv").config()
const Secret_Key=process.env.SecretKey;

router.post("/signin", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email, username and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User Does Not Exist",
      });
    } else {

        const isMatch=bcrypt.compare(password,user.password);
        if(!isMatch){
          res.status(400).json({
        message: "Invalid Password",
      });
        }else{
          
          const payload={
            id:user._id,
            email:user.email
          }

          const options={
            expiresIn: "7d"
          }

         const token= jwt.sign(payload,Secret_Key,options);
         //console.log(token)

            
            res.status(200).json({
                token:token
            })
        }

    }
  } catch (err) {
    res.status(505).json({
      message: "Something went wrong.",
    });
  }
});

router.get("/all",async (req,res)=>{
  let users= await User.find();
  res.send(users)
})

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    //Check Email already Exist or ot
    let alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      console.log(alreadyExist);
      res.status(409).json({
        message: "Email Already Exist",
      });
    }

    // Validate input
    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Email, username and password are required.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save user
    await user.save();

    return res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.get("/", (req, res) => {
  res.send("Its Working");
});

module.exports = router;
