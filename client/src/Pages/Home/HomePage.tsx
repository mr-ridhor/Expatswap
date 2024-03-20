import { useForm } from "react-hook-form";
// import {
//   PrimaryButton,
//   PrimaryButtonOutline,
// // } from "../../../Components/Button";
// import Checkbox from "../../../Components/Checkbox";
// import Card from "../../../Components/Card";
// import { AuthTypes } from "../../../Types/AuthenticationTypes";
import { z, ZodType } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiInformationFill } from "react-icons/ri";
import { useEffect, useState } from "react";
// import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { RegTypes } from "../../Types/RegTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../Components/Card";
import { TextInput } from "../../Components/TextInput";
import { PrimaryButton, PrimaryButtonOutline } from "../../Components/Button";
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
// import { TextInput } from "../../../Components/TextInput";

const HomePage = () => {
  const locationState = useLocation();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const schema: ZodType<RegTypes> = z.object({
    first_name: z.string().min(2).max(30),
    last_name: z.string().min(2).max(30),
    email: z.string().email(),
    phone: z.string().min(2).max(15),
    dob: z.string().datetime(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegTypes>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegTypes) => {
    setProcessing(true);
    // axiosClient
    //   .post("/auth/register", {
    //     ...data,
    //     type: locationState.state.type.toUpperCase(),
    //   })
    //   .then(({ data }) => {
    //     localStorage.setItem("ACCESS_TOKEN", data.token);
    //     reset();
    //     setProcessing(false);
    //     navigate("/auth/verification");
    //   })
    //   .catch((error) => {
    //     setProcessing(false);
    //     if (error.response.status === 409)
    //       return toast.error(error.response.data.message);

    //     return error.response.data.errors.forEach((error: any) => {
    //       toast.error(error.msg);
    //     });
    //   });
  };

  //   useEffect(() => {
  //     if (!locationState || !locationState.state || !locationState.state.type) {
  //       navigate("/auth/get-started");
  //     }
  //   }, [locationState, navigate]);

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
                  name="first_name"
                  label="First Name"
                  register={register}
                  error={errors.first_name}
                />

                <TextInput
                  type="text"
                  name="last_name"
                  label="Last Name"
                  register={register}
                  error={errors.last_name}
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
                  name="phone"
                  label="Enter Phone number"
                  register={register}
                  error={errors.phone}
                />

                <TextInput
                  type="date"
                  name="date"
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
