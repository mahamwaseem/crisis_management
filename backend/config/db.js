const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;

const connectDB = async()=>{
  try{
    await mongoose.connect(mongo_url);
    console.log(" MongoDB Connected..");
  }catch(err) {
    console.log(" MongoDB Connection Error: ", err.message);
    process.exit(1);
  }
};

module.exports=connectDB;

  
