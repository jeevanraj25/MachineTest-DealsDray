import dotenv from "dotenv";
import express from "express"
import { connectDB } from "./utils/db.js";
import AdminRouter from "./router/adminroute.js"
import EmployeeRouter from "./router/employee.js"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import cors from "cors";
const app =express();
const PORT =3000 || process.env.PORT;

dotenv.config({});

app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',  
        methods: ['GET', 'POST','PUT','DELETE'],
        credentials: true,  
      })
);


//api end point
app.use("/api/user",AdminRouter);
app.use("/api/employee",EmployeeRouter);



app.listen(PORT ,() =>{
    connectDB();
    console.log(`server is running at ${PORT}`);
})