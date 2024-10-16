import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import "./YupFormValidation.css";
import SucessfullyLogin from "./SucessfullyLogin";

const phoneRegex = /^\d{12}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = yup
  .object({
    username: yup.string().required().min(3),
    email: yup
      .string()
      .required()
      .matches(emailRegex, "Enter email in valid form"),
    phone: yup
      .string()
      .required()
      .max(12)
      .matches(phoneRegex, "Enter you number in format (923066343712)"),
    password: yup.string().required().min(3),
    confirmPassword: yup
      .string()
      .required()
      .min(3)
      .oneOf([yup.ref("password")], "Password must match"), //used to match password
  })
  .required();

const YupFormValidation = () => {
  const [login, setLogin] = useState(false);
  const [username, setUserName] = useState({});
  //1st
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setUserName(data.username);
    setLogin(true);

    //alert after form submission
    {
      Swal.fire({
        title: data.username,
        text: "You Have Been Sucessfully Login.",
        icon: "success",
        customClass: "swal-wide",
      });
    }
  };

  //getLoginValue is used to logout from SucessfullyLogin Screen and making value of login === false
  const getLoginValue = (loginValueFromChild) => {
    setLogin(loginValueFromChild);
  };

  return (
    <>
      {!login ? (
        <div className="Form-Container">
          <h2 className="formContent1">SignUp Form ( Yup Library )</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input
              type="text"
              placeholder="Enter Username"
              autoComplete="off"
              {...register("username")}
            />
            {errors.username && <span>{errors.username?.message}</span>}

            <input
              type="text"
              placeholder="Enter Your Email"
              autoComplete="off"
              {...register("email")}
            />
            {errors.email && <span>{errors.email?.message}</span>}

            <input
              type="text"
              placeholder="Enter Your Number"
              autoComplete="off"
              {...register("phone")}
            />
            {errors.phone && <span>{errors.phone?.message}</span>}

            <input
              type="password"
              placeholder="Enter Your Password"
              autoComplete="off"
              {...register("password")}
            />
            {errors.password && <span>{errors.password?.message}</span>}

            <input
              type="password"
              placeholder="Confirm Your Password"
              autoComplete="off"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword?.message}</span>
            )}

            <button className="formBtn">Submit</button>
          </form>
        </div>
      ) : (
        <SucessfullyLogin username={username} login={getLoginValue} />
      )}
    </>
  );
};

export default YupFormValidation;
