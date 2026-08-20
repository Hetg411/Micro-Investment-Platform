const express = require("express");
const router = express.Router();
const Transection = require("../Database/Models/Transections");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    let user_id = req.user.id;
    let month = req.query.month;
    let year = req.query.year;
    console.log(month)

    
    let startDate = new Date(year, month - 1, 1);
    let endDate = new Date(year, month, 1);
    let lastDate=new Date(year,month,0);
    let totalDays=lastDate.getDate();
    let data = await Transection.find({ userId: user_id, date: {$gte:startDate,$lt:endDate} });

    let dateWiseSaving={};
    data.map((element)=>{
          let curr=element.date.getDate();
          let value=element.roundUp;

          if(!dateWiseSaving[curr]){
            dateWiseSaving[curr]=value;
          }else{
            let val=dateWiseSaving[curr];
            val=val+value;
            dateWiseSaving[curr]=val
          }

    })
    res.status(200).json({
    message: "Growth data fetched successfully",
    data: dateWiseSaving
});

  } catch (err) {
  console.error(err);

  res.status(500).json({
    message: "Error fetching growth data",
    error: err.message
  });
}
});

module.exports = router;
