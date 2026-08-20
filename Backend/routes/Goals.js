let express=require("express");
let router=express.Router();
const auth=require("../middleware/auth");
const goals=require("../Database/Models/Goals");

router.get("/goals",auth,async(req,res)=>{
   try{
    const userid=req.user.id;
    let goal=await goals.find({userId:userid});

    res.status(200).json({
        message:"Goals",
        data:goal
    })
   }

   catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching goals",
      error: err.message
    });
  }
})

router.post("/addgoals",auth,async(req,res)=>{
     try{

        let userId=req.user.id;

        let { goalName, targetAmount, currentAmount } = req.body;

const goal = {
    userId,
    goalName,
    targetAmount,
    currentAmount
};

        let g=new goals(goal)
        await g.save();

        res.status(201).json({
            message:"Goal Saved"
        })

     }catch(err){
 
        console.log(err)
        
        res.status(500).json({
            message:err.message
        })
         
     }
})

router.put("/update/goal/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

       const { goalName, targetAmount, currentAmount } = req.body;

const updatedGoal = await goals.findOneAndUpdate(
    {
        _id: id,
        userId: userId
    },
    {
        goalName,
        targetAmount,
        currentAmount
    },
    {
        new: true,
        runValidators: true
    }
);

        if (!updatedGoal) {
            return res.status(404).json({
                message: "Goal not found or unauthorized"
            });
        }

        res.status(200).json({
            message: "Goal Updated",
            data: updatedGoal
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Error updating goal",
            error: err.message
        });
    }
});

router.delete("/delete/goal/:id",auth,async(req,res)=>{
      let userId=req.user.id;
      let {id}=req.params;
      try{

        let deleted=await goals.findOneAndDelete({_id:id,userId:userId});

         if (!deleted) {
            return res.status(404).json({
                message: "Goal not found or unauthorized"
            });
        }

         res.status(200).json({
            message: "Goal Updated",
            data: deleted
        });

      }catch(err){
             res.status(500).json({
            message: "Error updating goal",
            error: err.message
        });
      }
})



module.exports=router;