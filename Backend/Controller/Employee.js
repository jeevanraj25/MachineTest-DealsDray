import Employees from "../Models/EmployeeModel.js";
import { CheckEmployee, UpdateEmployee } from "../utils/CheckType.js";

export const addEmployee = async (req,res) =>{
    try {
       
        if (!req.file) {
          return res.status(400).json({ message: 'Please upload an image file.' });
        }
       
       const { name, email, phoneno, designation, gender, course } = req.body;
         
        console.log(req.body);
       
        const check = CheckEmployee.safeParse({
          name,  
          email,
          phoneno,
          designation,
          gender,
          course,
        });

        
    if (!check.success) {
      console.log("Validation Errors:", check.error.errors);
      return res.status(400).json({ message: check.error.errors[0].message });
  }

   
      
     
        const exists = await Employees.findOne({ email });
        if (exists) {
          return res.status(400).json({ message: 'user already exists' });
        }

        const newEmployee = new Employees({
            name: name, 
            email: email,
            phoneno: phoneno,
            designation: designation,
            gender: gender,
            course: course, 
            image: {
              imagename: req.file.Originalname,
         imageData:{
             data:req.file.buffer,
           contentType:req.file.mimetype
        }
            }, 
        });
        
    
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
      } catch (error) {
        res.status(500).json({ message: 'Error adding employee', error: error.message });
      }
}

export const deleteEmployee = async (req,res) =>{
    
    try {
        const { id } = req.params;
       
        await Employees.findByIdAndDelete(id);

        return res.status(200).json({  message: 'Employee deleted successfully'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const updateEmployee = async (req, res) => {
  try {
   
    const { name, email, phoneno, designation, gender, course } = req.body;
   
    const id = req.params.id;

   
    const check = UpdateEmployee.safeParse({ name, email, phoneno, designation, gender, course });
      
    
    if (!check.success) {
      return res.status(400).json({ message: check.error.message });
    }

   
    const Employee = await Employees.findById(id);
    if (!Employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    
    if (name) Employee.name = name;
    if (email) Employee.email = email;
    if (phoneno) Employee.phoneno = phoneno;
    if (designation) Employee.designation = designation;
    if (gender) Employee.gender = gender;
    if (course) Employee.course = course;
    if (req.file){
      Employee.image =  {
        imagename: req.file.Originalname,
   imageData:{
       data:req.file.buffer,
     contentType:req.file.mimetype
  }
      };
    }
 
    
    
    const updatedEmployee = await Employee.save();

    return res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });

  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const getEmployee = async (req,res) =>{
    
    try {
        
        const employees =await Employees.find({});


        return res.status(200).json({ employees });
     } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const getEmployeebyId = async (req,res) =>{

   try {
    const { id } = req.params;
     
     const employee =await Employees.findById(id);
  
     return res.status(200).json({ employee });

   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
}