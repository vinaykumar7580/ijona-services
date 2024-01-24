const express=require("express")
const jwt=require("jsonwebtoken");
const { DataModel } = require("../model/data.model");
const dataRouter=express.Router()

dataRouter.post("/add", async(req, res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "masai");
    const {name, email}=req.body;

    try{
        if(decoded){
            let data=new DataModel({name, email, userId:decoded.userId})
            await data.save()
            res.status(200).send({msg:"Data Added Successfully"})

        }else{
            res.status(500).send({msg:"Please Login First"})
        }


    }catch(err){
        res.status(500).send({error:err})

    }
})

dataRouter.get("/get/:page", async(req, res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "masai");
    let userId=decoded.userId
    const {page}=req.params;
    let skip = (page - 1) * 5;

    try{
        if(decoded){
            let data=await DataModel.find({userId}).skip(skip).limit(5)
            res.status(200).send(data)
        }else{
            res.status(500).send({msg:"Please Login First"})
        }

    }catch(err){
        res.status(500).send({error:err})
    }
})

dataRouter.patch("/update/:id", async(req, res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "masai");
    const {id}=req.params;
    const payload=req.body
    try{
        if(decoded){
            await DataModel.findByIdAndUpdate({_id:id}, payload)
            res.status(200).send({msg:"Data Updated Successfully"})

        }else{
            res.status(500).send({msg:"Please Login First"})
        }

    }catch(err){
        res.status(500).send({error:err})
        
    }
})

dataRouter.delete("/delete/:id", async(req, res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "masai");
    const {id}=req.params;
    try{
        if(decoded){
            await DataModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:"Data Deleted Successfully"})

        }else{
            res.status(500).send({msg:"Please Login First"})
        }

    }catch(err){
        res.status(500).send({error:err})
    }
})

module.exports={dataRouter}