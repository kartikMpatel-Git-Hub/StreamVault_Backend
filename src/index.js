// require ('dotenv').config({path : "./env"})
import {app} from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js";

// const app = express()
dotenv.config(
    {
        path : "./env"
    }
)

connectDB()
    .then((response)=>{
        app.on("error",(error)=>{
            console.log(`App Error : ${error}`)
            throw error
        })
        app.listen(process.env.PORT||6000 ,()=>{
            if(process.env.NODE_ENV === 'localhost')
                console.log(`Server Is On click Here : http://localhost:4000/`)
            else
            console.log(`Server Is On`)
        })
    })
    .catch((error)=>{
        console.log(`Connection Error : ${error}`)
    })    


/*


;(async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("error",(error)=>{
            console.log("App is Unable To Work ")
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App Is Runnig On ${process.env.PORT}`)
        })
    } catch (error) {
        console.error(error)
        throw error
    }
})()*/