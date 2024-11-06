import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const [data,setData] = useState({
     name:"",
     email:"",
     phoneno:"",
     designation:"",
     gender:"",
     course:"",
     image:""
  })
 
  
    const FileHandler = (e) => {
  
      setData({ ...data, image: e.target.files?.[0] });
    };
    
    const submitHandler = async (e) => {
      e.preventDefault();
    

      if (!data.image) {
        toast.error("Please upload an image.");
        return;
      }
    
    
      const formData = new FormData();
    
    
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneno", data.phoneno);
      formData.append("designation", data.designation);
      formData.append("gender", data.gender);
      formData.append("course", data.course);
    
     
      formData.append("image", data.image);
    
      try {
        const res = await axios.post("http://localhost:3000/api/employee/addemployees", formData, {
          withCredentials: true,
        });
    
        if (res.data) {
          toast.success(res.data.message);
          navigate("/employee");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error submitting data.");
      }
    };
   
  console.log(data);
  return (
    <div className="flex items-center justify-center my-5">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="name" className="w-[150px]">
                  Name
                </Label>
                <Input value={data.name} onChange={(e) => setData({...data,name:e.target.value})} id="name" className="flex-1" placeholder="Enter Name" />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="email" className="w-[150px]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                   onChange={(e) => setData({...data,email:e.target.value})}
                  className="flex-1"
                  placeholder="Enter Email"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="mobileNo" className="w-[150px]">
                  Mobile No
                </Label>
                <Input
                  id="mobileNo"
                  type="tel"
                  value={data.phoneno}
                  onChange={(e) => setData({...data,phoneno:e.target.value})}
                  className="flex-1"
                  placeholder="Enter Mobile No"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="designation" className="w-[150px]">
                  Designation
                </Label>
                <div className="flex-1" >
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {position ? position : "Select Designation"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuRadioGroup
                       
                        value={data.designation}
                        onValueChange={(value) => setData({ ...data, designation: value })}
                      >
                        <DropdownMenuRadioItem value="HR">
                          HR
                        </DropdownMenuRadioItem>
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
  <RadioGroup defaultValue="option-one" className="flex items-center space-x-4" value={data.gender} onValueChange={(value) => setData({ ...data, gender: value })}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="male" id="option-one" />
    <Label htmlFor="option-one">Male</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="female" id="option-two" />
    <Label htmlFor="option-two">Female</Label>
  </div>
</RadioGroup>
</div>

              <div className="flex items-center space-x-2">
  <Label htmlFor="course" className="w-[150px]">
    Course
  </Label>
  <div className="flex items-center space-x-2">
    <Checkbox
      id="mca"
      value="MCA"
     onClick={(e) => setData({...data,course:e.target.value})}
    />
    <label
      htmlFor="mca"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      MCA
    </label>
    <Checkbox
      id="bca"
      value="BCA"
     onClick={(e) => setData({...data,course:e.target.value})}
    />
    <label
      htmlFor="bca"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      BCA
    </label>

  
    <Checkbox
      id="bsc"
      value="BSC"
      onClick={(e) => setData({...data,course:e.target.value})}
    />
    <label
      htmlFor="bsc"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      BSC
    </label>
  </div>
</div>


              <div className="flex items-center space-x-2">
                <Label htmlFor="filr" className="w-[150px]">
                  Upload Profile
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="flex-1"
                  onChange={FileHandler}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={submitHandler}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateEmployee;
