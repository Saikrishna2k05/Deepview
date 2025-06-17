import mongoose from "mongoose";
const connectDB=async()=>{
    try
    {
        console.log("MongoDB connected");
        
    await mongoose.connect(process.env.MONGO_URL)
    }
    catch(err)
    {
        console.log("MongoDB connection error", err);
    }
}
export default connectDB;