const jwt=require("jsonwebtoken")
require("dotenv").config()
const Secret_Key=process.env.SecretKey;

function Authentication_Middleware(req,res,next){
    //console.log(req.header.authorization)
    let header=req.headers.authorization;

    if(!header){
         return res.status(401).json({
            message: "No token provided"
        });
    }

    const token=header.split(" ")[1];

    try{
        const decode=jwt.verify(token,Secret_Key);
        req.user=decode;
        next();

    }catch(err){
  
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }


}

module.exports=Authentication_Middleware;