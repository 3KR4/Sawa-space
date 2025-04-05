"use client";
import React, { useState, useEffect, useContext } from "react";
import "@/Styles/forms.css";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

// Icons
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
  const { translations, locale } = useLanguage();
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
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [birthDate, setBirthDate] = useState(null);

  function iconChanging(input) {
    setPassEye((prevState) => ({ ...prevState, [input]: !prevState[input] }));
  }

  const onSubmit = (data) => {
    if (isLoginPage) {
      // Handle login logic
      setLoadingSpinner(true);
    } else {
      // For registration, save form data and show additional details
      setFormData(data);
      setAddingDetails(true);
    }
  };

  const handleAdditionalDetailsSubmit = (e) => {
    e.preventDefault();
    // Combine initial form data with additional details
    const completeData = {
      ...formData,
      info: {
        birthDate,
        region: e.target.region.value,
        currentLocation: e.target.currentLocation.value,
        work: e.target.work.value,
        college: e.target.college.value,
        languages: e.target.languages.value,
      },
    };

    setLoadingSpinner(true);
    // Submit complete data to your API
    console.log("Complete registration data:", completeData);
  };

  console.log("formdata", formData);

  const maxDate = new Date(); // Today
  const minDate = new Date(1900, 0, 1); // January 1, 1900
  return (
    <>
      <span className="register-chape1 chape"></span>
      <div className="register-page container">
        <div className="top">
          <h1>
            {addingDetails
              ? translations?.auth?.complete_profile
              : isLoginPage
              ? translations?.auth?.login
              : translations?.auth?.register}
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
                    type="text"
                    name="languages"
                    placeholder={translations?.auth?.speaking_languages}
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
            <div className="rowHolder">
              {/* Name */}
              <div className="inputHolder">
                <div className="holder">
                  <FaRegUser />
                  <input
                    type="text"
                    {...register("userName", {
                      required: translations?.auth?.please_enter_your_username,
                      minLength: {
                        value: 3,
                        message:
                          translations?.auth
                            ?.username_must_be_at_least_3_characters,
                      },
                    })}
                    placeholder={
                      isLoginPage
                        ? translations?.auth?.enter_your_username_or_email
                        : translations?.auth?.please_enter_your_username
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
                          translations?.auth?.please_enter_a_phone_number,
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
                      placeholder={
                        translations?.auth?.please_enter_a_phone_number
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
                        translations?.auth?.please_enter_your_email_address,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:
                          translations?.auth
                            ?.please_enter_a_valid_email_address,
                      },
                    })}
                    placeholder={translations?.auth?.your_email}
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
                    required: translations?.auth?.please_enter_a_password,
                    minLength: {
                      value: 8,
                      message:
                        translations?.auth
                          ?.password_must_be_at_least_8_characters_long,
                    },
                  })}
                  placeholder={translations?.auth?.please_enter_a_password}
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
                        translations?.auth?.please_confirm_your_password,
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
                  <div class="lds-dual-ring"></div>
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

            {errorMessage !== "" && (
              <span>
                <CircleAlert />
                {errorMessage}
              </span>
            )}
          </form>
        )}
      </div>
    </>
  );
}
