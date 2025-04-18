"use client";
import React, { useState, useContext, useRef } from "react";
import "@/Styles/forms.css";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation"; // ✅ App Router
import Image from "next/image";
import { MdModeEditOutline } from "react-icons/md";
import { ScreenContext } from "@/Contexts/ScreenContext";

import { userService } from "@/services/api/userService";
import { useNotification } from "@/Contexts/NotificationContext";

import {
  LockKeyhole,
  Mail,
  Phone,
  Eye,
  EyeOff,
  CircleAlert,
  GraduationCap,
  MapPin,
  Languages,
  BriefcaseBusiness,
} from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoEarthOutline } from "react-icons/io5";

export default function Auth() {
  const { addNotification } = useNotification();
  const { setUserData } = useContext(ScreenContext);

  const { translations, locale } = useLanguage();
  const router = useRouter();

  const [isLoginPage, setIsLoginPage] = useState(false);
  const [addingDetails, setAddingDetails] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const password = watch("password", "");

  const [passEye, setPassEye] = useState({ password: false, confirm: false });
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [birthDate, setBirthDate] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  function iconChanging(input) {
    setPassEye((prevState) => ({ ...prevState, [input]: !prevState[input] }));
  }

  const onSubmit = async (data) => {
    if (isLoginPage) {
      setLoadingSpinner(true);
      try {
        const userResponse = await userService.loginUser(data);

        const userData = userResponse.data.test;
        localStorage.setItem("authToken", userResponse.data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUserData(userData);
        router.push("/");
        addNotification({
          type: "success",
          message: "Welcome back! 🎉 You’ve successfully logged in.",
        });
      } catch (err) {
        setLoadingSpinner(false);
        addNotification({
          type: "warning",
          message: err.response.data.message,
        });
      }
    } else {
      setFormData(data);
      setAddingDetails(true);
    }
  };

  const handleAdditionalDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoadingSpinner(true);

    const completeData = {
      ...formData,
      info: {
        birthDate,
        region: e.target.region.value,
        current_location: e.target.current_location.value,
        college: e.target.college.value,
        work: e.target.work.value,
        languages: e.target.languages.value,
      },
    };

    try {
      const userResponse = await userService.createUser(completeData);
      const userId = userResponse.data.userId;
      localStorage.setItem("authToken", userResponse.data.token);

      if (selectedFile) {
        const formDataImage = new FormData();
        formDataImage.append("img", selectedFile);

        const imgUploadResponse = await userService.uploadUserImage(
          userId,
          formDataImage
        );

        // Instead of relying on the backend to return the image URL
        const imageUrl = URL.createObjectURL(selectedFile);

        setUserData({
          ...formData,
          img: {
            url: imageUrl,
          },
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...formData,
            img: {
              url: imageUrl,
            },
          })
        );
      } else {
        setUserData(formData);
        localStorage.setItem("user", JSON.stringify(formData));
      }
      router.push("/");
      addNotification({
        type: "success",
        message: "Account created 🎉 You're ready to go!",
      });
    } catch (err) {
      console.log(err);
      addNotification({
        type: "warning",
        message: err.response.data.message,
      });
    } finally {
      console.log("aaa");
    }
  };

  const maxDate = new Date(); // Today
  const minDate = new Date(1900, 0, 1); // January 1, 1900

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      addNotification({
        type: "warnign",
        message: "Please select an image file (JPEG, PNG, etc.)",
      });
      return;
    }

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      addNotification({
        type: "warnign",
        message: "File size too large (max 5MB)",
      });
      return;
    }
    setSelectedFile(file);
  };

  return (
    <>
      <span className="register-chape1 chape"></span>
      <div className="register-page container">
        <div className="top">
          <h1>
            {addingDetails
              ? translations?.auth?.complete_profile
              : isLoginPage
              ? translations?.auth?.login_into_your_account
              : translations?.auth?.create_your_account}
          </h1>
          {addingDetails && (
            <p>{translations?.auth?.tell_us_more_about_yourself}</p>
          )}
        </div>
        {addingDetails ? (
          <>
            <form
              onSubmit={handleAdditionalDetailsSubmit}
              className={addingDetails ? "addingDetails" : ""}
            >
              <div className="userImg rounded">
                <Image
                  className="rounded"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : "/users/default.png"
                  }
                  alt="User Cover"
                  fill
                />
                <div
                  className="editICo rounded"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <MdModeEditOutline />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload-input"
                />
              </div>

              {/* Birth Date */}
              <div className="Date-Picker">
                <div
                  className=""
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={birthDate}
                      onChange={(newDate) => setBirthDate(newDate)}
                      maxDate={maxDate}
                      minDate={minDate}
                      views={["year", "month", "day"]}
                      format="yyyy-MM-dd"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          label: translations?.auth?.birth_date,
                          sx: {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "unset",
                            },
                            "& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                height: "49px",
                                padding: "0 16px",
                                fontWeight: "400",
                                color: "#858585",
                                fontFamily: "Rubik",
                              },
                            "& .css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                fontSize: "15px",
                                fontWeight: "400",
                                fontFamily: "Rubik",
                                color: "#858585",
                              },
                            "& .css-113d811-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                              {
                                color: "#ff8e31",
                              },
                            "& .css-1umw9bq-MuiSvgIcon-root": {
                              color: "#858585",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className="rowHolder">
                {/* Region */}
                <div className="inputHolder">
                  <div className="holder">
                    <IoEarthOutline />
                    <input
                      id="region"
                      type="text"
                      name="region"
                      placeholder={translations?.auth?.region}
                    />
                  </div>
                </div>

                {/* Current Location */}
                <div className="inputHolder">
                  <div className="holder">
                    <MapPin />

                    <input
                      id="current_location"
                      type="text"
                      name="currentLocation"
                      placeholder={translations?.auth?.current_location}
                    />
                  </div>
                </div>
              </div>
              <div className="rowHolder">
                {/* College */}
                <div className="inputHolder">
                  <div className="holder">
                    <GraduationCap />

                    <input
                      id="college"
                      type="text"
                      name="college"
                      placeholder={translations?.auth?.college}
                    />
                  </div>
                </div>
                {/* Work */}
                <div className="inputHolder">
                  <div className="holder">
                    <BriefcaseBusiness />
                    <input
                      id="work"
                      type="text"
                      name="work"
                      placeholder={translations?.auth?.work}
                    />
                  </div>
                </div>
              </div>

              {/* Speaking Languages */}
              <div className="inputHolder">
                <div className="holder">
                  <Languages />
                  <input
                    id="languages"
                    type="text"
                    name="languages"
                    placeholder={translations?.auth?.languages}
                  />
                </div>
              </div>

              <div className="btns">
                <button
                  type="button"
                  className="main-button secondary"
                  onClick={() => setAddingDetails(false)}
                >
                  {translations?.auth?.go_back}
                </button>

                <button type="submit" className="main-button">
                  {loadingSpinner ? (
                    <div className="lds-dual-ring"></div>
                  ) : (
                    translations?.auth?.finish
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLoginPage && (
              <div className="rowHolder">
                {/* Name */}
                <div className="inputHolder">
                  <div className="holder">
                    <FaRegUser />
                    <input
                      type="text"
                      {...register("fristname", {
                        required: translations?.auth?.firstname_is_required,
                        minLength: {
                          value: 3,
                          message:
                            translations?.auth
                              ?.firstname_must_be_at_least_3_characters,
                        },
                      })}
                      placeholder={translations?.auth?.enter_your_firstname}
                      style={{
                        borderColor: errors.fristname ? "red" : "black",
                      }}
                    />
                  </div>
                  {errors.fristname && (
                    <span>
                      <CircleAlert />
                      {errors.fristname.message}
                    </span>
                  )}
                </div>
                {/* Name */}
                <div className="inputHolder">
                  <div className="holder">
                    <FaRegUser />
                    <input
                      type="text"
                      {...register("lastname", {
                        required: translations?.auth?.lastname_is_required,
                        minLength: {
                          value: 3,
                          message:
                            translations?.auth
                              ?.lastname_must_be_at_least_3_characters,
                        },
                      })}
                      placeholder={translations?.auth?.enter_your_lastname}
                      style={{ borderColor: errors.lastname ? "red" : "black" }}
                    />
                  </div>
                  {errors.lastname && (
                    <span>
                      <CircleAlert />
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Phone */}
            {!isLoginPage && (
              <div className="inputHolder">
                <div className="holder">
                  <Phone />
                  <input
                    type="tel"
                    {...register("phone", {
                      pattern: {
                        value: /^\d+$/,
                        message:
                          translations?.auth
                            ?.phone_number_must_contain_only_digits,
                      },
                      minLength: {
                        value: 10,
                        message:
                          translations?.auth
                            ?.phone_number_must_be_at_least_10_digits_long,
                      },
                      maxLength: {
                        value: 15,
                        message:
                          translations?.auth
                            ?.phone_number_must_be_at_most_15_digits_long,
                      },
                    })}
                    placeholder={translations?.auth?.enter_your_phone_number}
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
            {/* Email */}
            <div className="inputHolder">
              <div className="holder">
                <Mail />
                <input
                  type="email"
                  {...register("email", {
                    required:
                      translations?.auth?.your_email_address_is_required,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: translations?.auth?.enter_a_valid_email_address,
                    },
                  })}
                  placeholder={translations?.auth?.enter_your_email_address}
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

            {/* Password */}
            <div className="inputHolder password">
              <div className="holder">
                <LockKeyhole />
                {passEye.password === true ? (
                  <Eye
                    className="eye"
                    onClick={() => iconChanging("password")}
                  />
                ) : (
                  <EyeOff
                    className="eye"
                    onClick={() => iconChanging("password")}
                  />
                )}
                <input
                  type={passEye.password === true ? "text" : "password"}
                  {...register("password", {
                    required: translations?.auth?.make_password_is_required,
                    minLength: {
                      value: 8,
                      message:
                        translations?.auth
                          ?.password_must_be_at_least_8_characters_long,
                    },
                  })}
                  placeholder={translations?.auth?.enter_your_password}
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
                        translations?.auth
                          ?.confirmation_your_password_is_required,
                      validate: (value) =>
                        value === password ||
                        translations?.auth?.passwords_dont_match,
                    })}
                    placeholder={translations?.auth?.confirm_password}
                    style={{
                      borderColor: errors.passwordConfirmation
                        ? "red"
                        : "black",
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

            {isLoginPage && (
              <Link href="/forget-pass" className="main-button forget">
                {translations?.auth?.did_you_forget_your_password}
              </Link>
            )}

            <div className="btns">
              <button className="main-button" type="submit">
                {loadingSpinner ? (
                  <div className="lds-dual-ring"></div>
                ) : isLoginPage ? (
                  translations?.auth?.login
                ) : (
                  translations?.auth?.register
                )}
              </button>

              <div
                onClick={() => {
                  setIsLoginPage((prev) => !prev);
                  reset();
                }}
                className="main-button"
              >
                {isLoginPage
                  ? translations?.auth?.register
                  : translations?.auth?.login}
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
