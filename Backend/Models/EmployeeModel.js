
import mongoose from "mongoose";

const EmployeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    designation: { 
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: { 
        type: String,
        required: true
    },
    image: {
        imagename: String,
        imageData:{
            data:Buffer,
          contentType:String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Employees = mongoose.models.Employees || mongoose.model("Employees", EmployeesSchema);


export default Employees;