import express from 'express';
import multer from 'multer';
import { addEmployee, deleteEmployee, updateEmployee, getEmployee, getEmployeebyId } from '../Controller/Employee.js'
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import isAuth from '../middlewere/isAuth.js';

const router = express.Router();

router.post('/addemployees',upload.single('image'),isAuth,addEmployee);
router.delete('/deleteemployees/:id',isAuth, deleteEmployee);
router.put('/updateemployees/:id',isAuth, updateEmployee);
router.get('/getemployees',isAuth,getEmployee);
router.get('/getemployees/:id',upload.single('image'),isAuth,getEmployeebyId);

export default router;
