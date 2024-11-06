import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import EditEmployee from "./EditEmployee";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Buffer } from "buffer";
import { toast } from "react-toastify";

const EmployeeTable = ({ query }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [id, setId] = useState(null);
  window.Buffer = Buffer;
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/employee/getemployees",
          {
            withCredentials: true,
          }
        );
        if (res.data) {
          setAllEmployees(res.data.employees);
          setEmployees(res.data.employees);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    getEmployees();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setEmployees(allEmployees);
    } else {
      const filteredData = allEmployees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(query.toLowerCase()) ||
          employee.email.toLowerCase().includes(query.toLowerCase()) ||
          employee.createdAt.toLowerCase().includes(query.toLowerCase()) ||
          employee.phoneno.toLowerCase().includes(query.toLowerCase())
      );
      setEmployees(filteredData);
    }
  }, [query, allEmployees]);

  const EditEmployee = (id) => {
    setId(id);

    navigate(`/edit-employee/${id}`);
  };

  const deleteHandler = () => {
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    console.log(id);
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/employee/deleteemployees/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data) {
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setOpen(false);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  return (
    <div>
      <Table className="w-[1000px] border-x-2 my-10 shadow-rounded ">
        <TableCaption>A list of employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile No</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees &&
            employees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={`data:${
                      employee.image.imageData.contentType
                    };base64,${Buffer.from(
                      employee.image.imageData.data.data
                    ).toString("base64")}`}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </TableCell>

                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneno}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.course}</TableCell>
                <TableCell>{employee.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    onClick={() => EditEmployee(employee._id)}
                    className=""
                  >
                    Edit
                  </Button>
                  <Button
                    className=""
                    onClick={() => handleDeleteClick(employee._id)}
                  >
                    Delete
                  </Button>

                  {open && (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this employee?
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <Button
                            onClick={handleCancelDelete}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleConfirmDelete()}
                            className="bg-red-600 text-white"
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
