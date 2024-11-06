import React, { useState } from "react";
import { Menu, X, Users, LogOut, Home, Building2, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout", {
        withCredentials: true,
      });

      if (res.data) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed z-50 w-full top-0 ">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                CompanyHub
              </span>
            </div>
            <div className="hidden md:flex items-center gap-10 ml-4">
              <Link
                to={"/home"}
                className="flex items-center text-gray-600 hover:text-indigo-600 "
              >
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              <Link
                to="/employee"
                className="flex items-center text-gray-600 hover:text-indigo-600"
              >
                <Users className="h-5 w-5 mr-1" />
                <span>Employee List</span>
              </Link>

              <Link
                to={"/add-employee"}
                className="flex items-center text-gray-600 hover:text-indigo-600 "
              >
                <User2 className="h-5 w-5 mr-1" />
                <span>Add Employee </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              onClick={submitHandler}
              variant="destructive"
              className="hidden md:flex items-center px-4 py-2  "
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
