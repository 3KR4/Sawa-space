"use client";
import React, { useState, useEffect, useContext } from "react";
import "../Css/register-login.css";

import { useForm } from "react-hook-form";
import Link from "next/link";
// import AllApi from "@/app/_Utils/AllApi";
// import { AuthContext } from "../../AuthProvider";
// import { AllContext } from "../../Context";

// Icons
import { FaDiscord, FaGoogle, FaRegUser } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import {
  LockKeyhole,
  Mail,
  Phone,
  Eye,
  EyeOff,
  CircleAlert,
} from "lucide-react";
let lang = "en";

export default function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const password = watch("password", "");

  const [passEye, setPassEye] = useState({ password: false, confirm: false });
  const [errorMessage, setErrorMessage] = useState("");

  function iconChanging(input) {
    setPassEye((prevState) => ({ ...prevState, [input]: !prevState[input] }));
  }

  const onSubmit = (data) => {
    if (isLoginPage) {
      AllApi.login(data.userName, data.password)
        .then((response) => {
          console.log("Login successful:", response.data);
          login(response.data.jwt, response.data.user);
          // Handle login success (e.g., store JWT, redirect)
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error.message);
        });
    } else {
      AllApi.registration(data.userName, data.email, data.phone, data.password)
        .then((response) => {
          console.log("Registration successful:", response.data);
          login(response.data.jwt, response.data.user);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error.message);
        });
    }
  };

  return (
    <>
      <span className="register-chape1 chape"></span>
      <div className="register-page container">
        <div className="top">
          <h1>
            {isLoginPage
              ? lang === "en"
                ? "Login"
                : "تسجيل الدخول"
              : lang === "en"
              ? "Register"
              : "إنشاء حساب جديد"}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rowHolder">
            {/* Name */}
            <div className="inputHolder">
              <div className="holder">
                <FaRegUser />
                <input
                  type="text"
                  {...register("userName", {
                    required:
                      lang === "en"
                        ? "Please enter your username"
                        : "اسم المستخدم",
                    minLength: {
                      value: 3,
                      message:
                        lang === "en"
                          ? "Username must be at least 3 characters"
                          : "يجب أن يكون اسم المستخدم 3 أحرف على الأقل",
                    },
                  })}
                  placeholder={
                    isLoginPage
                      ? lang === "en"
                        ? "Enter Your Username or Email"
                        : "أدخل اسم المستخدم أو البريد الإلكتروني"
                      : lang === "en"
                      ? "Please enter your username"
                      : "اسم المستخدم"
                  }
                  style={{ borderColor: errors.userName ? "red" : "black" }}
                />
              </div>
              {errors.userName && (
                <span>
                  <CircleAlert />
                  {errors.userName.message}
                </span>
              )}
            </div>

            {/* Phone */}
            {!isLoginPage && (
              <div className="inputHolder">
                <div className="holder">
                  <Phone />
                  <input
                    type="tel"
                    {...register("phone", {
                      required:
                        lang === "en"
                          ? "Please enter a phone number"
                          : "يرجى إدخال رقم الهاتف",
                      pattern: {
                        value: /^\d+$/,
                        message:
                          lang === "en"
                            ? "Phone number must contain only digits"
                            : "يجب أن يحتوي رقم الهاتف على أرقام فقط",
                      },
                      minLength: {
                        value: 10,
                        message:
                          lang === "en"
                            ? "Phone number must be at least 10 digits long"
                            : "يجب أن يكون رقم الهاتف 10 أرقام على الأقل",
                      },
                      maxLength: {
                        value: 15,
                        message:
                          lang === "en"
                            ? "Phone number must be at most 15 digits long"
                            : "يجب ألا يزيد رقم الهاتف عن 15 رقمًا",
                      },
                    })}
                    placeholder={
                      lang === "en" ? "Your Phone Number" : "رقم الهاتف"
                    }
                    style={{ borderColor: errors.phone ? "red" : "black" }}
                  />
                </div>
                {errors.phone && (
                  <span>
                    <CircleAlert />
                    {errors.phone.message}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Email */}
          {!isLoginPage && (
            <div className="inputHolder">
              <div className="holder">
                <Mail />
                <input
                  type="email"
                  {...register("email", {
                    required:
                      lang === "en"
                        ? "Please enter your email address"
                        : "يرجى إدخال البريد الإلكتروني",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:
                        lang === "en"
                          ? "Please enter a valid email address"
                          : "يرجى إدخال بريد إلكتروني صحيح",
                    },
                  })}
                  placeholder={
                    lang === "en" ? "Your Email" : "البريد الإلكتروني"
                  }
                  style={{ borderColor: errors.email ? "red" : "black" }}
                />
              </div>
              {errors.email && (
                <span>
                  <CircleAlert />
                  {errors.email.message}
                </span>
              )}
            </div>
          )}

          {/* Password */}
          <div className="inputHolder password">
            <div className="holder">
              <LockKeyhole />
              {passEye.password === true ? (
                <Eye className="eye" onClick={() => iconChanging("password")} />
              ) : (
                <EyeOff
                  className="eye"
                  onClick={() => iconChanging("password")}
                />
              )}
              <input
                type={passEye.password === true ? "text" : "password"}
                {...register("password", {
                  required:
                    lang === "en"
                      ? "Please enter a password"
                      : "يرجى إدخال كلمة مرور",
                  minLength: {
                    value: 8,
                    message:
                      lang === "en"
                        ? "Password must be at least 8 characters long"
                        : "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
                  },
                })}
                placeholder={
                  lang === "en" ? "Enter password" : "أدخل كلمة المرور"
                }
                style={{ borderColor: errors.password ? "red" : "black" }}
              />
            </div>
            {errors.password && (
              <span>
                <CircleAlert />
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          {!isLoginPage && (
            <div className="inputHolder password">
              <div className="holder">
                <LockKeyhole />
                {passEye.confirm === true ? (
                  <Eye
                    className="eye"
                    onClick={() => iconChanging("confirm")}
                  />
                ) : (
                  <EyeOff
                    className="eye"
                    onClick={() => iconChanging("confirm")}
                  />
                )}
                <input
                  type={passEye.confirm === true ? "text" : "password"}
                  {...register("passwordConfirmation", {
                    required:
                      lang === "en"
                        ? "Please confirm your password"
                        : "يرجى تأكيد كلمة المرور",
                    validate: (value) =>
                      value === password ||
                      (lang === "en"
                        ? "Passwords don't match"
                        : "كلمات المرور غير متطابقة"),
                  })}
                  placeholder={
                    lang === "en" ? "Confirm password" : "تأكيد كلمة المرور"
                  }
                  style={{
                    borderColor: errors.passwordConfirmation ? "red" : "black",
                  }}
                />
              </div>
              {errors.passwordConfirmation && (
                <span>
                  <CircleAlert />
                  {errors.passwordConfirmation.message}
                </span>
              )}
            </div>
          )}

          <Link href="/forget-pass" className="main-button forget">
            {lang === "en"
              ? "Did You Forget Your Password?"
              : "هل نسيت كلمة المرور؟"}
          </Link>

          <div className="btns">
            <button className="main-button" type="submit">
              {isLoginPage
                ? lang === "en"
                  ? "Login"
                  : "تسجيل الدخول"
                : lang === "en"
                ? "Register"
                : "إنشاء حساب جديد"}
            </button>
            <div
              onClick={() => {
                setIsLoginPage((prev) => !prev);
                reset();
              }}
              className="main-button"
            >
              {isLoginPage
                ? lang === "en"
                  ? "Register"
                  : "إنشاء حساب جديد"
                : lang === "en"
                ? "Login"
                : "تسجيل الدخول"}
            </div>
          </div>

          {errorMessage !== "" && (
            <span>
              <CircleAlert />
              {errorMessage}
            </span>
          )}
        </form>
      </div>
    </>
  );
}
