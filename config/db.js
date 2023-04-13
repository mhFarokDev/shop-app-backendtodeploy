import mongoose from "mongoose";

const connectMongoDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_STRING)
        console.log(`MongoBD Is connected successfully.`.bgGreen);
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;