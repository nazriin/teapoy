import {configDotenv} from "dotenv";
import mongoose from "mongoose";


configDotenv()

export const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
    } catch (error){
        console.log(error)
    }
}

// MONGO_URI=mongodb+srv://babazadenazrin22:DEj31zJANURH1zwf@cluster0.8owspnh.mongodb.net/