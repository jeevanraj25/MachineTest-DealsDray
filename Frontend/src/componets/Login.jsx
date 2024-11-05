import { Button } from '@/components/ui/button'
import React from 'react'
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

const Login = () => {
  return (
    <div className='flex items-center justify-center  my-7 '>
        <Card className="w-[350px] ">
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">User Name</Label>
            <Input id="name" placeholder="Enter the User Name" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Passowrd</Label>
            <Input id="name" placeholder="Enter the password" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between ">
      <div >
      <Button className='flex w-[400%]'>Login</Button>
      </div>
    </CardFooter>
  </Card>
    </div>

    
  )
}

export default Login
