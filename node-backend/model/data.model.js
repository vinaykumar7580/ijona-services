const mongoose=require("mongoose")

const dataSchema=mongoose.Schema({
    name:String,
    email:String,
    userId:String
},{
    versionKey:false
})

const DataModel=mongoose.model("data", dataSchema)

module.exports={DataModel}