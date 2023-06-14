import express from 'express';
import blogRoutes from "./routes/BlogRoute.js"
import ImageRoutes from "./routes/ImageRoute.js"
import cors from 'cors'
import dotenv from "dotenv";
import connectDb from "./config/db.js";


//configure env
dotenv.config();


// rest object
const app = express();


//database config
connectDb();


//middleware
app.use(cors());
app.use(express.json())

//routes
app.use("/api/v1/blogs",blogRoutes);
app.use("/api/v1/images",ImageRoutes)

//rest api
app.get("/",async(req,res)=>{
    res.send({
        message:"Welocome app MERN stack project",
    });
});

//PORT
const port  = process.env.PORT || 8080;

//run listen
app.listen(port,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${port}`);
})