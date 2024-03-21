// import React from 'react'
import { NavLink } from "react-router-dom";
import { PrimaryButton } from "../../Components/Button";
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import Table, { ColumnType } from "../../Components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

// Define your data structure
interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age?: number;
  email: string;
  dob: string;
}

// Define your columns
const columns: ColumnType<UserData>[] = [
  // { label: "ID", selector: "id", sortable: true },
  { label: "First Name", selector: "firstName", sortable: true },
  { label: "Last Name", selector: "lastName", sortable: true },
  { label: "Email", selector: "email", sortable: true },
  { label: "Phone Number", selector: "phoneNumber", sortable: true },
  { label: "Age", selector: "dob", sortable: true },
];
const UsersPage = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState<UserData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backendboilerplate.onrender.com/api/users"
      );
      const formattedData = response.data.map((user: UserData) => {
        // Parse the date of birth using Moment.js and format it
        const formattedDob = moment(user.dob).format("MMM, DD YYYY");

        // Return the user object with the formatted date of birth
        return { ...user, dob: formattedDob };
      });

      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("data", data);
  console.log("fil", filteredData);
  const handleFilter = () => {
    const filtered = data.filter((user) => {
      const dob = new Date(user.dob);
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
            className="border py-2 md:px-2 px-0.5 text-xs"
          />

          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border py-2 md:px-2 px-0.5 text-xs"
          />
          <button
            onClick={handleFilter}
            className="bg-[#1E293B] rounded-md text-white px-2 py-1"
          >
            Filter
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <>
          <Table data={filteredData} columns={columns} />
        </>
      )}
      {/* <Table data={filteredData} columns={columns} /> */}
    </div>
  );
};

export default UsersPage;
