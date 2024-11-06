import dotenv from "dotenv";
import express from "express"
import { connectDB } from "./utils/db.js";
import AdminRouter from "./router/adminroute.js"
import EmployeeRouter from "./router/employee.js"
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { upload } from './utils/multerConfig.js'; 
import cors from "cors";
const app =express();
const PORT =3000 || process.env.PORT;

dotenv.config({});

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',  
        methods: ['GET', 'POST','PUT','DELETE'],
        credentials: true,  
      })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
  });

//api

app.use("/api/user",AdminRouter);
app.use("/api/employee",EmployeeRouter);



app.listen(PORT ,() =>{
    connectDB();
    console.log(`server is running at ${PORT}`);
})