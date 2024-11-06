import express from 'express';
import multer from 'multer';
import { addEmployee, deleteEmployee, updateEmployee, getEmployee, getEmployeebyId } from '../Controller/Employee.js'
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
}).single('image');
import isAuth from '../middlewere/isAuth.js';

const router = express.Router();

router.post('/addemployees',upload,isAuth,addEmployee);
router.delete('/deleteemployees/:id',isAuth, deleteEmployee);
router.put('/updateemployees/:id',upload,isAuth, updateEmployee);
router.get('/getemployees',isAuth,getEmployee);
router.get('/getemployees/:id',isAuth,getEmployeebyId);

export default router;
