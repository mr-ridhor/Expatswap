import { useForm } from "react-hook-form";

import { z, ZodType } from "zod";

import { NavLink } from "react-router-dom";

import { useState } from "react";

import { RegTypes } from "../../Types/RegTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../Components/Card";
import { TextInput } from "../../Components/TextInput";
import { PrimaryButton } from "../../Components/Button";
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import axios from "axios";


const HomePage = () => {

  const [processing, setProcessing] = useState(false);
 

  const schema: ZodType<RegTypes> = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    phoneNumber: z.string().min(2).max(15),
    dob: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegTypes>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegTypes) => {
    setProcessing(true);
    console.log(data)
    try {
      const response = await axios.post("https://backendboilerplate.onrender.com/api/users/register", {
        ...data,
      });
      console.log("Response data:", response.data);
      reset();
      setProcessing(false);

      // Handle successful response here
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };



  return (
    <div className="">
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
      <div className="w-full h-full flex items-center justify-center bg-white">
        {/* maxWidth="xl" */}
        <Card className="lg:w-[40%] sm:w-[90%] w-[90%]  h-[80%] rounded-md  px-3 bg-[#3E1260]">
          <div className=" ">
            <div className="order-2 sm:order-1   pr-3">
              <h2 className="font-bold mb-2 text-white">Input Your Details</h2>
              <form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextInput
                  type="text"
                  name="firstName"
                  label="First Name"
                  register={register}
                  error={errors.firstName}
                />

                <TextInput
                  type="text"
                  name="lastName"
                  label="Last Name"
                  register={register}
                  error={errors.lastName}
                />

                <TextInput
                  type="text"
                  name="email"
                  label="Email"
                  register={register}
                  error={errors.email}
                />
                <TextInput
                  type="text"
                  name="phoneNumber"
                  label="Enter Phone number"
                  register={register}
                  error={errors.phoneNumber}
                />

                <TextInput
                  type="date"
                  name="dob"
                  label="Date of Birth"
                  register={register}
                  error={errors.dob}
                />

                <div className="flex flex-col space-y-3">
                  <PrimaryButton
                    loading={processing}
                    className="w-full uppercase bg-[#DF6C9E]"
                  >
                    Register
                  </PrimaryButton>
                  {/* <PrimaryButtonOutline
                  type="button"
                  onClick={() => navigate("/auth/login")}
                  className="w-full uppercase"
                >
                  Back to login
                </PrimaryButtonOutline> */}
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
