import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditEmployee = () => {
  const [position, setPosition] = useState(""); 
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: "",
    designation: "",
    gender: "",
    course: "",
    image: "",
  });

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/employee/getemployees/${id}`,
          { withCredentials: true }
        );
        if (res.data) {
          setData(res.data.employee);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmployee();
  }, [id]);



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    
   
  
    try {
      const res = await axios.put(
        `http://localhost:3000/api/employee/updateemployees/${id}`,
        data,
        {
          withCredentials: true
        }
      );
  
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center my-5">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Edit Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid w-full gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="name" className="w-[150px]">
                  Name
                </Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="email" className="w-[150px]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="flex-1"
                  placeholder="Enter Email"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="phoneno" className="w-[150px]">
                  Mobile No
                </Label>
                <Input
                  id="phoneno"
                  type="tel"
                  value={data.phoneno}
                  onChange={(e) => setData({ ...data, phoneno: e.target.value.toString() })}
                  className="flex-1"
                  placeholder="Enter Mobile No"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="designation" className="w-[150px]">
                  Designation
                </Label>
                <div className="flex-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{data.designation}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={(value) => {
                          setPosition(value);
                          setData({ ...data, designation: value });
                        }}
                      >
                        <DropdownMenuRadioItem value="HR">HR</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Sales">
                          Sales
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Manager">
                          Manager
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="gender" className="w-[150px]">
                  Gender
                </Label>
                <RadioGroup
                  value={data.gender}
                  onValueChange={(value) =>
                    setData({ ...data, gender: value })
                  }
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="course" className="w-[150px]">
                  Course
                </Label>
                <RadioGroup
                  value={data.course}
                  onValueChange={(value) =>
                    setData({ ...data, course: value })
                  }
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MCA" id="mca" />
                    <Label htmlFor="mca">MCA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="BCA" id="bca" />
                    <Label htmlFor="bca">BCA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="BSC" id="bsc" />
                    <Label htmlFor="bsc">BSC</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="file" className="w-[150px]">
                  Upload Profile
                </Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png"
                  className="flex-1"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={submitHandler} type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
 
  );
}

export default EditEmployee;