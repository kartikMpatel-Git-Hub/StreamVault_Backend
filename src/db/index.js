import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB =  async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\nDatabase Connected !!`)
    } catch (error) {
        console.log(`Some Connection Error !! ${error}`)
        process.exit(1)
    }
}

export default connectDB