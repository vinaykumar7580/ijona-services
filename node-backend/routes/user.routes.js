const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { UserModel } = require("../model/user.model");


const userRouter=express.Router()


userRouter.post("/register", async(req,res)=>{
    const {username, password}=req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
                let user=new UserModel({username, password:hash})
                await user.save();
                res.status(200).send({msg:"User Registration Success"})
            }else{
                res.status(500).send({msg:"User Registration Failed"})
            }
         
        });

    }catch(err){
        res.status(500).send({error:err})

    }
})


userRouter.post("/login", async(req,res)=>{
    const {username, password}=req.body;
    const user=await UserModel.findOne({username})
    try{
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                if(result){
                    const token = jwt.sign({ userId: user._id }, 'masai');
                    res.status(200).send({msg:"User Login Success", token})
                }else{
                    res.status(500).send({msg:"User Login Failed"})
                }
            });
        }


    }catch(err){
        res.status(500).send({error:err})
    }
})


userRouter.get("/userdata", async(req,res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'masai');
    let userID=decoded.userId

    
    try{
        if(decoded){
            let user=await UserModel.findOne({_id:userID})
            res.status(200).send(user)
        }else{
            res.status(500).send({msg:"Please Login First"})
        }

    }catch(err){
        res.status(500).send({error:err})
    }
})

module.exports={userRouter}