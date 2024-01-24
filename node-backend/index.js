const express=require("express")
const cors=require("cors")

const { userRouter } = require("./routes/user.routes")
const { dataRouter } = require("./routes/data.routes")
const { connection } = require("./db")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/data", dataRouter)

app.listen(8080, async()=>{
    try{
        await connection
        console.log("mongodb connected")

    }catch(err){
        console.log(err)
        console.log("mongodb not connected")
    }

})