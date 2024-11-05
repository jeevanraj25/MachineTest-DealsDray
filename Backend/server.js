import dotenv from "dotenv";
import express from "express"

const app =express();
const PORT =3000;

dotenv.config({});

app.use(express.json());




app.listen(PORT ,() =>{
    console.log(`server is running at ${PORT}`);
})