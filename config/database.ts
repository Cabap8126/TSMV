const mongoose = require('mongoose')
export const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGOOSEURL);
        console.log("Connect Success")
    }
    catch(error){
        console.log("Connect Error")
    }
}