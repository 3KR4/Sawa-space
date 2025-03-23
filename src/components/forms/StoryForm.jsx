"use client";
import "@/Styles/forms.css";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import ConvertTime from "@/utils/ConvertTime";
import { DndContext, useDraggable } from "@dnd-kit/core";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Default styles

import { FaCloudUploadAlt, FaLink, FaAngleDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { VscMention } from "react-icons/vsc";
import { CircleAlert } from "lucide-react";
import { MdOutlineAddReaction, MdBlock } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiText } from "react-icons/bi";
import { FaPaintbrush } from "react-icons/fa6";

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
];

const backgroundColors = [
  {
    id: 1,
    type: "gradient",
    first: "#FF9A9E",
    second: "#FAD0C4",
    deg: "180",
    first_Acquisition: 15,
    second_Acquisition: 50,
  },
  {
    id: 2,
    type: "static",
    color: "#A1C4FD",
  },
  {
    id: 3,
    type: "gradient",
    first: "#84FAB0",
    second: "#8FD3F4",
    deg: "135",
    first_Acquisition: 20,
    second_Acquisition: 60,
  },
  {
    id: 4,
    type: "static",
    color: "#FFD1FF",
  },
  {
    id: 5,
    type: "gradient",
    first: "#FFECD2",
    second: "#FCB69F",
    deg: "90",
    first_Acquisition: 10,
    second_Acquisition: 70,
  },
  {
    id: 6,
    type: "static",
    color: "#D4FC79",
  },
  {
    id: 7,
    type: "gradient",
    first: "#A18CD1",
    second: "#FBC2EB",
    deg: "45",
    first_Acquisition: 25,
    second_Acquisition: 75,
  },
  {
    id: 8,
    type: "static",
    color: "#96E6A1",
  },
  {
    id: 9,
    type: "gradient",
    first: "#F6D365",
    second: "#FDA085",
    deg: "270",
    first_Acquisition: 30,
    second_Acquisition: 80,
  },
  {
    id: 10,
    type: "static",
    color: "#FBC2EB",
  },
  {
    id: 11,
    type: "gradient",
    first: "#E0C3FC",
    second: "#8EC5FC",
    deg: "120",
    first_Acquisition: 35,
    second_Acquisition: 85,
  },
  {
    id: 12,
    type: "static",
    color: "#FEE140",
  },
  {
    id: 13,
    type: "gradient",
    first: "#FF9A9E",
    second: "#FECFEF",
    deg: "200",
    first_Acquisition: 40,
    second_Acquisition: 90,
  },
  {
    id: 14,
    type: "static",
    color: "#6A11CB",
  },
  {
    id: 15,
    type: "gradient",
    first: "#F6D365",
    second: "#FF9A9E",
    deg: "300",
    first_Acquisition: 50,
    second_Acquisition: 100,
  },
];

function StoryForm() {
  const { locale, translations } = useLanguage();

  const {
    setSelectedUsers,
    selectedUsersNames,
    setSelectedUsersNames,
    setSelectionMenuTitle,
    openStoryForm,
    setOpenStoryForm,
    usersSelectionRef,
  } = useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { messageText, setMessageText, InputRef, emojiHolderRef } =
    useContext(InputActionsContext);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  // States
  const [addText, setAddText] = useState(true);
  const [images, setImages] = useState([]);
  const [addLink, setAddLink] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [isSubmited, setisSubmited] = useState(false);
  const [selectOption, setSelectOption] = useState(false);

  const [selectedBackground, setSelectedBackground] = useState(
    backgroundColors[0]
  );
  const [showCustomBackgroundForm, setShowCustomBackgroundForm] =
    useState(false);

  console.log(selectedBackground);

  const [postData, setPostData] = useState({
    id: 1,
    body: "",
    images: [],
    link: "",
    mentions: [],
    settings: {
      body: {
        x: 0,
        y: 0,
        size: 16,
        family: `Rubik`,
        color: "454545",
        background: "ffffff",
      },
      link: {
        x: 0,
        y: 0,
        size: 16,
      },
      images: [], // Image settings
      backGround: "",
    },
  });

  const formMenuRef = useRef(null);

  const inputFileRef = useRef(null);
  console.log(postData);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPostData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index), // Correctly update the images array
      settings: {
        ...prev.settings,
        images: prev.settings.images.filter((_, i) => i !== index), // Correctly update the image settings
      },
    }));
  };
  const onSubmit = (data) => {
    console.log(postData);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formMenuRef.current && formMenuRef.current.contains(event.target)) {
        return;
      }
      if (
        usersSelectionRef.current &&
        usersSelectionRef.current.contains(event.target)
      ) {
        return;
      }
      if (
        emojiHolderRef.current &&
        emojiHolderRef.current.contains(event.target)
      ) {
        return;
      }
      setOpenStoryForm(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removeMentions = (indexToRemove, type) => {
    if (type == "mentions") {
      setSelectedUsers((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
      setSelectedUsersNames((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const newImages = imageFiles.slice(0, 3); // Limit to 3 images

    setPostData((prev) => {
      const updatedImages = [...prev.images, ...newImages].slice(0, 3);
      const existingImagesCount = prev.settings.images.length;

      const newImageSettings = newImages.map(() => ({
        x: 0,
        y: 0,
        width: 100,
      }));

      return {
        ...prev,
        images: updatedImages,
        settings: {
          ...prev.settings,
          images: [...prev.settings.images, ...newImageSettings].slice(0, 3),
        },
      };
    });
  };
  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const type = active.id.split("-")[0]; // e.g., "body", "link", "image"
    const index = Number(active.id.split("-")[1]); // Convert to number (only for images)

    setPostData((prev) => {
      if (type === "image") {
        // Handle image drag
        const updatedImages = [...prev.settings.images];

        if (!updatedImages[index]) return prev; // Ensure the index exists

        updatedImages[index] = {
          ...updatedImages[index],
          x: updatedImages[index].x + delta.x, // Update {translations?.story?.x_position}
          y: updatedImages[index].y + delta.y, // Update {translations?.story?.y_position}
        };

        return {
          ...prev,
          settings: {
            ...prev.settings,
            images: updatedImages,
          },
        };
      } else if (type === "body" || type === "link") {
        // Handle body or link drag
        return {
          ...prev,
          settings: {
            ...prev.settings,
            [type]: {
              ...prev.settings[type], // Preserve existing properties
              x: prev.settings[type].x + delta.x, // Update {translations?.story?.x_position}
              y: prev.settings[type].y + delta.y, // Update {translations?.story?.y_position}
            },
          },
        };
      }
      return prev; // Fallback for unknown types
    });
  };
  // Handle Settings Input Change
  const handleSettingsChange = (type, key, value, index) => {
    setPostData((prev) => {
      if (type === "images") {
        // Handle image settings
        const updatedImages = [...prev.settings.images];
        updatedImages[index] = {
          ...updatedImages[index],
          [key]: Number(value), // Convert to number for image settings
        };

        return {
          ...prev,
          settings: {
            ...prev.settings,
            images: updatedImages,
          },
        };
      } else {
        // Handle body or link settings
        return {
          ...prev,
          settings: {
            ...prev.settings,
            [type]: {
              ...prev.settings[type], // Preserve existing properties
              [key]:
                key === "color" || key === "background" ? value : Number(value), // Handle color values as strings
            },
          },
        };
      }
    });
  };

  // Draggable Component
  const DraggableElement = ({ id, settings, children }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({ id });

    console.log(settings);

    return (
      <div
        className={`drager ${id === "body" ? "storyBody" : ""}${
          id === "link" ? "storyBody link" : ""
        } ${isDragging ? "dragging" : ""}`}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          position: "absolute",
          fontSize: `${settings.size}px`,
          fontFamily: settings.family,
          color: `#${settings.color}`,
          textDecoration: id === "link" ? "underline" : "",
          background: `#${settings.background}`,
          left: `50%`,
          top: `50%`,
          transform: `translate(calc(-50% + ${settings.x}px), calc(-50% + ${
            settings.y
          }px)) ${
            transform ? `translate(${transform.x}px, ${transform.y}px)` : ""
          }`,
          width: `${settings.width}%`,
          cursor: "grab",
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`focusedMsg FormMenu ${openStoryForm ? "active" : ""}`}
      >
        <div className="body storyForm" ref={formMenuRef}>
          <div className="formCenter">
            <div className="top">
              <h4>{translations?.story?.create_story}</h4>
              <IoClose
                className="close"
                onClick={() => setOpenStoryForm(false)}
              />
            </div>
            <div className="bottom">
              <h4>{translations?.story?.add_to_your_story}</h4>
              <div className="right">
                <BiText
                  onClick={() => setAddText((prev) => !prev)}
                  className={`${addText ? "active" : ""}`}
                />
                <IoMdImages
                  onClick={() => inputFileRef.current.click()}
                  className={`${images.length > 0 ? "active" : ""}`}
                />
                <FaLink
                  onClick={() => setAddLink((prev) => !prev)}
                  className={`${addLink ? "active" : ""} link`}
                />
                <VscMention
                  onClick={(e) => {
                    handleMenus(e, "usersSelection");
                    setSelectionMenuTitle("Tag People...");
                  }}
                  className={`${selectedUsersNames.length ? "active" : ""}`}
                />
              </div>
            </div>
            <div>
              <div className="setting-holder background-colors">
                <h5 className="main-title">
                  {translations?.story?.choose_a_background}
                </h5>
                <div className="holder">
                  {/* Clear Background Option */}
                  <div
                    key={0}
                    className={`color-circle ${
                      selectedBackground === null ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedBackground(null);
                      setShowCustomBackgroundForm(false);
                    }}
                  >
                    <MdBlock />
                  </div>

                  {/* Background Color Options */}
                  {backgroundColors.map((bg) => (
                    <div
                      key={bg.id}
                      className={`color-circle ${
                        selectedBackground?.id === bg.id ? "active" : ""
                      }`}
                      style={{
                        background:
                          bg.type === "gradient"
                            ? `linear-gradient(${bg.deg}deg, ${bg.first} ${bg.first_Acquisition}%, ${bg.second} ${bg.second_Acquisition}%)`
                            : bg.color,
                      }}
                      onClick={() => {
                        setSelectedBackground(bg);
                        setShowCustomBackgroundForm(false);
                      }}
                    ></div>
                  ))}

                  <div
                    key={1}
                    className={`color-circle ${
                      selectedBackground === null ? "active" : ""
                    }`}
                    onClick={() => {
                      setShowCustomBackgroundForm(true);
                      setSelectedBackground({
                        type: "static", // "static" or "gradient"
                        color: "#ffb8b8", // For static
                        first: "#f6d365", // For gradient
                        second: "#fda085", // For gradient
                        deg: "270", // For gradient
                        first_Acquisition: "30",
                        second_Acquisition: "80",
                      });
                    }}
                  >
                    <FaPaintbrush />
                  </div>
                </div>
                {showCustomBackgroundForm && (
                  <div className="custom-background-form">
                    <h5>Add Custom Background</h5>
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        value={selectedBackground.type}
                        onChange={(e) =>
                          setSelectedBackground((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                      >
                        <option value="static">Static</option>
                        <option value="gradient">Gradient</option>
                      </select>
                    </div>

                    {selectedBackground.type === "static" ? (
                      <div className="form-group">
                        <label>Color</label>
                        <input
                          type="color"
                          value={selectedBackground.color}
                          onChange={(e) =>
                            setSelectedBackground((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <>
                        <div className="grids one">
                          <div className="form-group">
                            <label>First Color</label>
                            <input
                              type="color"
                              value={selectedBackground.first}
                              onChange={(e) =>
                                setSelectedBackground((prev) => ({
                                  ...prev,
                                  first: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Second Color</label>
                            <input
                              type="color"
                              value={selectedBackground.second}
                              onChange={(e) =>
                                setSelectedBackground((prev) => ({
                                  ...prev,
                                  second: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Gradient Angle</label>
                          <Slider
                            min={0}
                            max={360}
                            value={selectedBackground.deg}
                            onChange={(value) =>
                              setSelectedBackground((prev) => ({
                                ...prev,
                                deg: value,
                              }))
                            }
                          />
                        </div>
                        <div className="grids two">
                          <div className="form-group">
                            <label>first Acquisition</label>
                            <Slider
                              min={-100}
                              max={200}
                              value={selectedBackground.first_Acquisition}
                              onChange={(value) =>
                                setSelectedBackground((prev) => ({
                                  ...prev,
                                  first_Acquisition: value,
                                }))
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>second Acquisition</label>
                            <Slider
                              min={-100}
                              max={200}
                              value={selectedBackground.second_Acquisition}
                              onChange={(value) =>
                                setSelectedBackground((prev) => ({
                                  ...prev,
                                  second_Acquisition: value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <hr />
              {addText && (
                <div className="setting-holder">
                  <h5 className="main-title">
                    {translations?.story?.story_body}
                  </h5>
                  <div className={`inputHolder`}>
                    <div className="holder">
                      <MdOutlineAddReaction
                        className="reactBtn"
                        onClick={(e) => handleMenus(e, "emojiHolder")}
                      />
                      <textarea
                        ref={InputRef}
                        placeholder={`${translations?.placeHolders?.whats_on_your_mind}`}
                        value={messageText}
                        onInput={(e) => setMessageText(e.target.value)}
                      />
                    </div>
                  </div>
                  {messageText && (
                    <div className="settings forBody">
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.x_position}
                        </label>

                        <Slider
                          min={-300} // Minimum value // Maximum value (adjust as needed)'
                          max={600}
                          value={postData.settings.body.x} // Current value
                          onChange={(value) =>
                            handleSettingsChange("body", "x", value)
                          }
                          trackStyle={{ backgroundColor: "#007bff" }} // Customize track color
                          handleStyle={{
                            borderColor: "#007bff",
                            backgroundColor: "#007bff",
                          }} // Customize handle color
                          railStyle={{ backgroundColor: "#e9ecef" }} // Customize rail color
                        />
                      </div>
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.y_position}
                        </label>

                        <Slider
                          min={-100} // Minimum value // Maximum value (adjust as needed)'
                          max={600}
                          value={postData.settings.body.y} // Current value
                          onChange={(value) =>
                            handleSettingsChange("body", "y", value)
                          }
                          trackStyle={{ backgroundColor: "#007bff" }}
                          handleStyle={{
                            borderColor: "#007bff",
                            backgroundColor: "#007bff",
                          }}
                          railStyle={{ backgroundColor: "#e9ecef" }}
                        />
                      </div>
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.font_size}
                        </label>
                        <Slider
                          min={10}
                          max={100}
                          value={postData.settings.body.size}
                          onChange={(value) =>
                            handleSettingsChange("body", "size", value)
                          }
                          trackStyle={{ backgroundColor: "#007bff" }}
                          handleStyle={{
                            borderColor: "#007bff",
                            backgroundColor: "#007bff",
                          }} // Customize handle color
                          railStyle={{ backgroundColor: "#e9ecef" }}
                        />
                      </div>
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.font_family}
                        </label>

                        <div className="selectOptions Holder">
                          <button className="selectedValue">
                            <h5>{postData.settings.body.family}</h5>
                            <FaAngleDown />
                          </button>
                          <ul className={`options`}>
                            {fontFamilies.map((x, index) => (
                              <li
                                className={`${
                                  postData.settings.body.family == x
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSettingsChange("body", "family", x)
                                }
                              >
                                {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.font_color}
                        </label>
                        <input
                          type="color"
                          id="bodyColor"
                          value={`#${postData.settings.body.color}`}
                          onChange={(e) =>
                            handleSettingsChange(
                              "body",
                              "color",
                              e.target.value.replace("#", "")
                            )
                          }
                        />
                      </div>
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.background_color}
                        </label>
                        <input
                          type="color"
                          id="bodyBackgroundColor"
                          value={`#${postData.settings.body.background}`}
                          onChange={(e) =>
                            handleSettingsChange(
                              "body",
                              "background",
                              e.target.value.replace("#", "")
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {addLink && <hr />}
              {addLink && (
                <div className="setting-holder">
                  <h5 className="main-title">
                    {translations?.story?.story_link}
                  </h5>
                  <div className={`inputHolder`}>
                    <div className="holder">
                      <input
                        placeholder="type a link"
                        value={linkValue}
                        onInput={(e) => setLinkValue(e.target.value)}
                      />
                    </div>
                  </div>

                  {linkValue && (
                    <div className="settings forLink">
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.x_position}
                        </label>

                        <Slider
                          min={-300} // Minimum value // Maximum value (adjust as needed)'
                          max={600}
                          value={postData.settings.link.x} // Current value
                          onChange={(value) =>
                            handleSettingsChange("link", "x", value)
                          }
                          trackStyle={{ backgroundColor: "#007bff" }} // Customize track color
                          handleStyle={{
                            borderColor: "#007bff",
                            backgroundColor: "#007bff",
                          }} // Customize handle color
                          railStyle={{ backgroundColor: "#e9ecef" }} // Customize rail color
                        />
                      </div>
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.y_position}
                        </label>
                        <Slider
                          min={-100} // Minimum value // Maximum value (adjust as needed)'
                          max={600}
                          value={postData.settings.link.y} // Current value
                          onChange={(value) =>
                            handleSettingsChange("link", "y", value)
                          }
                          trackStyle={{ backgroundColor: "#007bff" }}
                          handleStyle={{
                            borderColor: "#007bff",
                            backgroundColor: "#007bff",
                          }}
                          railStyle={{ backgroundColor: "#e9ecef" }}
                        />
                      </div>
                      <div className="hold">
                        <label htmlFor="">
                          {translations?.story?.font_size}
                        </label>
                        <Slider
                          min={10}
                          max={100}
                          value={postData.settings.link.size}
                          onChange={(value) =>
                            handleSettingsChange("link", "size", value)
                          }
                          trackStyle={{ backgroundColor: "#007bff" }}
                          handleStyle={{
                            borderColor: "#007bff",
                            backgroundColor: "#007bff",
                          }} // Customize handle color
                          railStyle={{ backgroundColor: "#e9ecef" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {selectedUsersNames.length > 0 && <hr />}
              {selectedUsersNames.length > 0 && (
                <div className="setting-holder">
                  <h5 className="main-title">
                    {translations?.forms?.Mentiond_People}
                  </h5>
                  <div className="inputHolder mentionsHolder">
                    <div className="tagsHolder">
                      {selectedUsersNames.map((name, index) => (
                        <div key={index} className="tag">
                          <span>@{name}</span>
                          <button
                            type="button"
                            className="remove"
                            onClick={() => removeMentions(index, "mentions")}
                          >
                            <IoClose />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {images.length > 0 && <hr className="beforeImages" />}
              {postData.images.map((image, index) => (
                <div className="setting-holder" key={index}>
                  <h5 className="main-title">
                    {locale === "ar"
                      ? `صورة رقم ${index + 1}`
                      : `Image ${index + 1} Settings`}
                  </h5>
                  <div className="productImages">
                    <h5>{image.name}</h5>
                    <IoClose onClick={() => handleRemoveImage(index)} />
                  </div>
                  <div className="settings forImage">
                    <div className="hold">
                      <label>{translations?.story?.x_position}</label>
                      <Slider
                        min={-500}
                        max={500}
                        value={postData.settings.images[index]?.x || 0}
                        onChange={(value) =>
                          handleSettingsChange("images", "x", value, index)
                        }
                        trackStyle={{ backgroundColor: "#007bff" }}
                        handleStyle={{
                          borderColor: "#007bff",
                          backgroundColor: "#007bff",
                        }}
                        railStyle={{ backgroundColor: "#e9ecef" }}
                      />
                    </div>
                    <div className="hold">
                      <label>{translations?.story?.y_position}</label>
                      <Slider
                        min={-500}
                        max={800}
                        value={postData.settings.images[index]?.y || 0}
                        onChange={(value) =>
                          handleSettingsChange("images", "y", value, index)
                        }
                        trackStyle={{ backgroundColor: "#007bff" }}
                        handleStyle={{
                          borderColor: "#007bff",
                          backgroundColor: "#007bff",
                        }}
                        railStyle={{ backgroundColor: "#e9ecef" }}
                      />
                    </div>
                    <div className="hold">
                      <label>Width</label>
                      <Slider
                        min={0}
                        max={260}
                        value={postData.settings.images[index]?.width}
                        onChange={(value) =>
                          handleSettingsChange("images", "width", value, index)
                        }
                        trackStyle={{ backgroundColor: "#007bff" }}
                        handleStyle={{
                          borderColor: "#007bff",
                          backgroundColor: "#007bff",
                        }}
                        railStyle={{ backgroundColor: "#e9ecef" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                ref={inputFileRef}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="preview forStory">
            <h4>{translations?.story?.Preview_the_final_look}</h4>

            <div
              style={{
                border: "3px dashed #e8e8e8",
                borderRadius: "15px",
                padding: "3px",
              }}
            >
              <div
                className="story"
                style={{
                  background:
                    selectedBackground === null
                      ? "transparent"
                      : selectedBackground.type === "gradient"
                      ? `linear-gradient(${selectedBackground.deg}deg, ${selectedBackground.first} ${selectedBackground.first_Acquisition}%, ${selectedBackground.second} ${selectedBackground.second_Acquisition}%)`
                      : selectedBackground.color,
                }}
              >
                {messageText && (
                  <DraggableElement id="body" settings={postData.settings.body}>
                    {messageText}
                  </DraggableElement>
                )}

                {linkValue && (
                  <DraggableElement id="link" settings={postData.settings.link}>
                    {linkValue}
                  </DraggableElement>
                )}

                {postData.images.map((image, index) => (
                  <DraggableElement
                    key={index}
                    id={`image-${index}`}
                    settings={
                      postData.settings.images[index] || {
                        x: 0,
                        y: 0,
                        width: 100,
                      }
                    }
                  >
                    <img src={URL.createObjectURL(image)} width={`100%`} />
                  </DraggableElement>
                ))}

                <div className="top forUser">
                  <div className="left">
                    <Image
                      className="rounded"
                      src={"/users/default.png"}
                      alt={"/users/default.png"}
                      width={40}
                      height={40}
                      onClick={(e) => handleMenus(e, "userInfo", data.user.id)}
                    />
                    <div className="info">
                      <h5>Mahmoud Elshazly</h5>
                      <span>
                        {ConvertTime(
                          "2025-03-03T09:40:00Z",
                          locale,
                          "singleChat"
                        )}
                      </span>
                    </div>
                  </div>
                  <HiDotsVertical
                    onClick={(e) => {
                      handleMenus(e, "postSettings", 1);
                    }}
                  />
                </div>

                {selectedUsersNames.length > 0 && (
                  <div className="mentions view">
                    <h5>Mahmould Elshazly {translations?.post?.mention}</h5>
                    {selectedUsersNames?.map((x, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleMenus(e, "userInfo", x.userId)}
                      >
                        @{x}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="main-button"
              onClick={() => {
                setisSubmited(true);
              }}
            >
              {translations?.story?.create_story}
            </button>
          </div>
        </div>
      </form>
    </DndContext>
  );
}

export default StoryForm;
