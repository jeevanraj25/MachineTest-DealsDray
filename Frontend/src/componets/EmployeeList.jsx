import React, { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const EmployeeList = () => {
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="items-center justify-center">
        <div className="flex items-center justify-center  my-7">
          <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              onChange={submitHandler}
              placeholder="Search your the user"
              className="outline-none border-none w-full "
            />
            <Button className="rounded-r-full">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <EmployeeTable query={query} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
