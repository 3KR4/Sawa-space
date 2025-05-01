"use client";
import "@/Styles/forms.css";
import "@/Styles/forms.css";
import React, { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/Contexts/LanguageContext";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter } from "next/navigation";
import { MdModeEditOutline } from "react-icons/md";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { userService } from "@/services/api/userService";
import { pageService } from "@/services/api/pageService";
import { useNotification } from "@/Contexts/NotificationContext";

import { Phone } from "lucide-react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoEarthOutline, IoClose } from "react-icons/io5";

import { PiShareFat } from "react-icons/pi";
import { FaPause, FaPlus, FaRotate } from "react-icons/fa6";
import {
  FaRegUser,
  FaAngleRight,
  FaAngleLeft,
  FaTrashAlt,
  FaShoppingCart,
} from "react-icons/fa";

import { BsFillPostcardFill, BsThreeDots } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { CircleAlert } from "lucide-react";

export default function EditProfileForm({ editType, setEditType }) {
  const { addNotification } = useNotification();
  const { setUserData, userData, userPage, setUserPage, getUser } =
    useContext(ScreenContext);

  const { translations, locale } = useLanguage();

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [formData, setFormData] = useState({});
  const [pageInfoError, setPageInfoError] = useState(false);
  const editProfileRef = useRef(null);
  const pickerRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [birthDate, setBirthDate] = useState(null);
  const [infoFields, setInfoFields] = useState([]);
  const [passEye, setPassEye] = useState({ password: false, confirm: false });
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editProfileRef.current &&
        editProfileRef.current.contains(event.target)
      ) {
        return;
      }
      if (event.target.closest(".MuiPickersPopper-root")) {
        return;
      }
      setEditType(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (editType === "user" && userData) {
      reset({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        phone: userData.phone || "",
      });
      setBirthDate(
        userData?.info?.birthdate ? new Date(userData?.info?.birthdate) : null
      );
    } else if (editType === "page" && userPage) {
      reset({
        pagename: userPage.pagename || "",
      });
    }
  }, [editType, userData, userPage, reset]);

  useEffect(() => {
    const initialInfo =
      editType === "user" ? userData?.info || {} : userPage?.info || {};

    const filteredInfo = Object.entries(initialInfo).filter(
      ([key]) => key.toLowerCase() !== "birthdate"
    );

    setInfoFields(
      filteredInfo.map(([key, value]) => ({
        key,
        value,
      }))
    );
  }, [editType, userData, userPage]);

  const addInfoField = () => {
    const hasEmpty = infoFields.some((f) => !f.key.trim() || !f.value.trim());
    if (hasEmpty) return setPageInfoError(true);
    setPageInfoError(false);
    setInfoFields([...infoFields, { key: "", value: "" }]);
  };

  const removeInfoField = (index) => {
    const updated = [...infoFields];
    updated.splice(index, 1);
    setInfoFields(updated);
  };

  const handleInfoChange = (index, field, value) => {
    const updated = [...infoFields];
    updated[index][field] = value;
    setInfoFields(updated);
  };

  const onSubmit = async (data) => {
    setLoadingSpinner(true);

    const infoObject = Object.fromEntries(
      infoFields.map(({ key, value }) => [key, value])
    );

    const payload =
      editType === "user"
        ? {
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            info: { ...infoObject, birthdate: birthDate },
          }
        : {
            pagename: data.pagename,
            info: infoObject,
          };

    try {
      editType === "user"
        ? await userService.editUserData(userData._id, payload)
        : await pageService.editPageData(payload);
      await getUser(editType);
      setEditType(null);
      addNotification({
        type: "success",
        message: "Your profile has been updated.",
      });
    } catch (err) {
      console.error(err);
      addNotification({
        type: "warning",
        message: "Something went wrong.",
      });
    } finally {
      setLoadingSpinner(false);
    }
  };

  const maxDate = new Date();
  const minDate = new Date(1950, 0, 1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`focusedMsg FormMenu ${editType ? "active" : ""}`}
    >
      <div
        className="body imgForm editProfile register-page contentLoaded"
        ref={editProfileRef}
      >
        <div className="top" style={{ margin: "0" }}>
          <h4>
            {editType === "page"
              ? translations?.forms?.edit_your_page
              : translations?.forms?.edit_your_profile}
          </h4>
          <IoClose className="close" onClick={() => setEditType(null)} />
        </div>

        {editType === "user" ? (
          <>
            <div className="rowHolder">
              <div className="inputHolder">
                <div className="holder">
                  <FaRegUser />
                  <input
                    type="text"
                    {...register("firstname", {
                      required: translations?.auth?.firstname_is_required,
                      minLength: {
                        value: 3,
                        message:
                          translations?.auth
                            ?.firstname_must_be_at_least_3_characters,
                      },
                    })}
                    placeholder={translations?.auth?.enter_your_firstname}
                    style={{ borderColor: errors.firstname ? "red" : "black" }}
                  />
                </div>
                {errors.firstname && (
                  <span>
                    <CircleAlert /> {errors.firstname.message}
                  </span>
                )}
              </div>

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
                    <CircleAlert /> {errors.lastname.message}
                  </span>
                )}
              </div>
            </div>

            <div className="rowHolder">
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
                    <CircleAlert /> {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="Date-Picker" ref={pickerRef}>
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
                          "& input": {
                            height: "49px",
                            padding: "0 16px",
                            fontWeight: "400",
                            color: "#858585",
                            fontFamily: "Rubik",
                          },
                          "& label": {
                            fontSize: "15px",
                            fontWeight: "400",
                            fontFamily: "Rubik",
                            color: "#858585",
                          },
                          "& label.Mui-focused": {
                            color: "#ff8e31",
                          },
                          "& svg": {
                            color: "#858585",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </>
        ) : (
          <div className="inputHolder">
            <div className="holder">
              <FaRegUser />
              <input
                type="text"
                {...register("pagename", {
                  required: translations?.auth?.pagename_is_required,
                  minLength: {
                    value: 3,
                    message:
                      translations?.auth
                        ?.pagename_must_be_at_least_3_characters,
                  },
                })}
                placeholder={translations?.auth?.enter_your_pagename}
                style={{ borderColor: errors.pagename ? "red" : "black" }}
              />
            </div>
            {errors.pagename && (
              <span>
                <CircleAlert /> {errors.pagename.message}
              </span>
            )}
          </div>
        )}
        <hr style={{ margin: "10px 0 5px" }} />
        <div className="top" style={{ margin: "10px 0 0" }}>
          <h5>{translations?.forms?.additional_info}</h5>
          <button
            type="button"
            className="main-button add-btn"
            onClick={addInfoField}
          >
            <FaPlus /> {translations?.actions?.add}
          </button>
        </div>
        <div className="hold adding-info">
          {infoFields.map((item, index) => (
            <div className="row" key={index}>
              <div className="holder top">
                <input
                  type="text"
                  value={item.key}
                  placeholder="Field Name"
                  onChange={(e) =>
                    handleInfoChange(index, "key", e.target.value)
                  }
                />
                <FaTrashAlt onClick={() => removeInfoField(index)} />
              </div>
              <div className="holder">
                <input
                  type="text"
                  value={item.value}
                  placeholder="Value"
                  onChange={(e) =>
                    handleInfoChange(index, "value", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {pageInfoError && (
          <span className="error">
            Please fill all fields before adding more.
          </span>
        )}
        <hr style={{ margin: "10px 0 5px" }} />
        <div className="btns rowHolder actions">
          <button
            type="button"
            className="main-button secondary"
            onClick={() => setEditType(null)}
          >
            {translations?.actions?.cancel}
          </button>

          <button className={`main-button ${loadingSpinner ? "loading" : ""}`}>
            <div className="lds-dual-ring"></div>
            <span>{translations?.actions?.save_changes}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
