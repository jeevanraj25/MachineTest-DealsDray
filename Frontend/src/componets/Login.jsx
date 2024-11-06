import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
   
   const [data, setData] = useState({
     username: "",
     password: "",
   })
   const navigate = useNavigate()
   
   const submitHandler = async(e) => {
     e.preventDefault()
     console.log(data)
     try {
        const res = await axios.post("http://localhost:3000/api/user/login", data,
          {
            withCredentials: true,  
          }
        )
         
        console.log(res.data.message)
        if(res.data){
           toast.success(res.data.message)
           navigate("/home")
        }
     } catch (error) {
        toast.error(error.response.data.message)
     }
 
   }
  

  return (
    <div className='flex items-center justify-center  my-7 '>
        <Card className="w-[350px] ">
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
    <form onSubmit={submitHandler}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">User Name</Label>
            <Input value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} id="name" placeholder="Enter the User Name" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Passowrd</Label>
            <Input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} id="name" placeholder="Enter the password" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between ">
      <div >
      <Button onClick={submitHandler} className='flex w-[400%]'>Login</Button>
      </div>
    </CardFooter>
  </Card>
    </div>

    
  )
}

export default Login
