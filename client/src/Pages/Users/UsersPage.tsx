// import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { PrimaryButton } from "../../Components/Button";
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import Table, { ColumnType } from "../../Components/Table";
import { useState } from "react";

// Define your data structure
interface UserData {
  id: number;
  name: string;
  age?: number;
  date_of_birth: string;
}

// Define your columns
const columns: ColumnType<UserData>[] = [
  { label: "ID", selector: "id", sortable: true },
  { label: "Name", selector: "name", sortable: true },
  { label: "Age", selector: "date_of_birth", sortable: true },
];
const UsersPage = () => {
  const data: UserData[] = [
    { id: 1, name: "John", date_of_birth: "1994-03-1" },
    { id: 2, name: "Jane", date_of_birth: "1999-03-20" },
    { id: 3, name: "Doe", date_of_birth: "1984-05-30" },
    { id: 4, name: "John", date_of_birth: "1994-03-10" },
    { id: 5, name: "Jane", date_of_birth: "1999-7-6" },
    { id: 6, name: "Doe", date_of_birth: "1984-1-19" },
    { id: 7, name: "John", date_of_birth: "1994-12-2" },
    { id: 8, name: "Jane", date_of_birth: "1999-10-29" },
    { id: 9, name: "Doe", date_of_birth: "1984-4-25" },
    { id: 10, name: "John", date_of_birth: "1994-6-27" },
    { id: 11, name: "Jane", date_of_birth: "1999-11-30" },
    { id: 12, name: "Doe", date_of_birth: "1984-1-9" },
    { id: 13, name: "John", date_of_birth: "1994-5-20" },
    { id: 14, name: "Jane", date_of_birth: "1999-7-8" },
    { id: 15, name: "Doe", date_of_birth: "1984-5-20" },
    { id: 16, name: "John", date_of_birth: "1994-6-2" },
    { id: 17, name: "Jane", date_of_birth: "1999-12-19" },
    { id: 18, name: "Doe", date_of_birth: "1984-4-11" },
    { id: 19, name: "John", date_of_birth: "1994-4-2" },
    { id: 20, name: "Jane", date_of_birth: "1999-3-7" },
    { id: 21, name: "Doe", date_of_birth: "1984-2-6" },
    { id: 22, name: "John", date_of_birth: "1994-2-22" },
    { id: 23, name: "Jane", date_of_birth: "1999-5-19" },
    { id: 24, name: "Doe", date_of_birth: "1984-9-2" },
  ];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState<UserData[]>(data);
  const handleFilter = () => {
    const filtered = data.filter((user) => {
      const dob = new Date(user.date_of_birth);
      return dob >= new Date(startDate) && dob <= new Date(endDate);
    });
    setFilteredData(filtered);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  return (
    <div>
      {/* UsersPage */}
      <div className="w-full p-4 flex flex-row items-center justify-between">
        <div className="">
          <PrimaryButton className="bg-[#3E1260] font-bold">
            <NavLink to={"/"} className={"flex item-center gap-x-1 "}>
              <IoMdHome className="h-4 w-4 " /> Home{" "}
            </NavLink>
          </PrimaryButton>
        </div>
        <div className="">
          <PrimaryButton className="bg-[#3E1260] font-bold">
            <NavLink to={"users"} className={"flex item-center gap-x-1 "}>
              <FaUsers className="h-4 w-4 " /> List of users
            </NavLink>
          </PrimaryButton>
        </div>
      </div>
      <div className="w-full p-4 flex flex-row items-center justify-center">
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="border p-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border p-2"
          />
          <button
            onClick={handleFilter}
            className="bg-[#1E293B] rounded-md text-white px-2 py-1"
          >
            Filter
          </button>
        </div>
      </div>
      <Table data={filteredData} columns={columns} />
    </div>
  );
};

export default UsersPage;
