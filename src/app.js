import Express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = Express();

app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true}))
app.use(Express.json({limit:"16kb"}))
app.use(Express.urlencoded({extended:true, limit:"16kb"}))
app.use(Express.static("public"))
app.use(cookieParser())

//Import Routes

import userRouter from "./routes/user.routes.js"

//Routes deleration

app.use("/api/v1/users", userRouter)



export { app }