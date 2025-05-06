"use client";
import "@/Styles/forms.css";

import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { productService } from "@/services/api/productService";
import { useNotification } from "@/Contexts/NotificationContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { departements } from "@/utils/Data";

import {
  FaCloudUploadAlt,
  FaHashtag,
  FaLink,
  FaLaptopCode,
  FaBasketballBall,
  FaHeart,
  FaCar,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GoMention } from "react-icons/go";
import { IoMdImages } from "react-icons/io";
import {
  MdOutlineAddReaction,
  MdOutlineKeyboardArrowDown,
  MdLocalGroceryStore,
  MdOutlinePets,
} from "react-icons/md";
import { VscMention } from "react-icons/vsc";
import { CircleAlert } from "lucide-react";
import {
  IoHome,
  IoPhonePortrait,
  IoHardwareChip,
  IoGameController,
} from "react-icons/io5";
import { TbTools, TbDeviceGamepad3Filled } from "react-icons/tb";
import { GiRolledCloth } from "react-icons/gi";
import { CgGirl } from "react-icons/cg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function ProductForm() {
  const { locale, translations } = useLanguage();
  const { addNotification } = useNotification();
  const { userData, userPage } = useContext(ScreenContext);

  const {
    selectedUsers,
    setSelectedUsers,
    selectedUsersNames,
    setSelectedUsersNames,
    setSelectionMenuTitle,
    openProductForm,
    setOpenProductForm,
    usersSelectionRef,
    setSomeThingHappen,
  } = useContext(MenusContext);

  const { handleMenus, selectedDev } = useContext(DynamicMenusContext);
  const { messageText, setMessageText, InputRef, emojiHolderRef } =
    useContext(InputActionsContext);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  // Departments data

  // Images
  const [images, setImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  const formMenuRef = useRef(null);
  const inputFileRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);

  const [about, setAbout] = useState([]);
  const [aboutInput, setAboutInput] = useState({ key: "", value: "" });
  const [departement, setDepartement] = useState("");
  const [category, setCategory] = useState("");

  const [curentOpendSelectHolder, setCurentOpendSelectHolder] = useState();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const removed = prevImages[index];
      const updatedImages = prevImages.filter((_, i) => i !== index);
      if (removed?.publicid && openProductForm.type === "edit") {
        setRemovedImages((prev) => [...prev, removed.publicid]);
      }
      return updatedImages;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Skip if clicked inside form or emoji menu
      if (
        (formMenuRef.current && formMenuRef.current.contains(event.target)) ||
        (emojiHolderRef.current &&
          emojiHolderRef.current.contains(event.target))
      ) {
        return;
      }

      // Skip if clicked inside any MUI popper
      if (
        event.target.closest(".MuiPopover-root") ||
        event.target.closest(".MuiSelect-root") ||
        event.target.closest(".MuiMenu-paper") // covers MUI menu open dropdown
      ) {
        return;
      }

      setOpenProductForm(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openProductForm.type === "edit") {
      setLoadingContent(false);
      const fetchProduct = async () => {
        try {
          const response = await productService.getProduct(
            openProductForm.productId
          );
          const product = response?.data?.data;

          if (product) {
            setMessageText(product.details || "");
            setAbout(product?.about || []);
            setDepartement(product.departement || "");
            setCategory(product.category || "");

            // Set form values
            setValue("name", product.name);
            setValue("price", product.Price);
            setValue("sale", product.sale);
            setValue("stock", product.stock);

            const formattedImages = (product.img || []).map((imgObj) => ({
              url: imgObj.newpath.url,
              publicid: imgObj.newpath.publicid,
              originalname: imgObj.originalname,
            }));

            setImages(formattedImages);
            setLoadingContent(true);
          }
        } catch (err) {
          console.error("Error fetching product:", err);
          addNotification({
            type: "error",
            message: "Failed to load product data",
          });
        }
      };

      fetchProduct();
    } else {
      setMessageText("");
      setAbout([]);
      setDepartement("");
      setCategory("");
      setImages([]);
      setRemovedImages([]);
      reset();
    }
  }, [openProductForm]);

  const onSubmit = async (data) => {
    setLoading(true);

    const productData = {
      departement: departement,
      category: category,
      name: data.name,
      Price: Number(data.price),
      sale: Number(data.sale),
      stock: Number(data.stock),
      details: messageText,
      about: about,
    };

    try {
      let response;
      if (openProductForm.type === "edit") {
        response = await productService.editProduct(
          openProductForm.productId,
          productData
        );
      } else {
        response = await productService.createProduct(
          userPage?._id,
          productData
        );
      }

      // Handle image upload for new images
      const newImages = images.filter((img) => !img.url);
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((img) => formData.append("imgs", img));
        await productService.uploudProductImg(
          openProductForm.type === "edit"
            ? openProductForm.productId
            : response.data.productid,
          userPage?._id,
          formData
        );
      }

      // Delete removed images (only when editing)
      if (openProductForm.type === "edit" && removedImages.length > 0) {
        for (const publicid of removedImages) {
          try {
            await productService.updateProductImg(
              openProductForm.type === "edit"
                ? openProductForm.productId
                : response.data.productid,
              userPage?._id,
              publicid
            );
          } catch (err) {
            console.warn(`Failed to delete image ${publicid}:`, err);
          }
        }
      }

      // Notify success
      addNotification({
        type: "success",
        message:
          openProductForm.type === "edit"
            ? "Product updated successfully"
            : "Product created successfully",
      });

      const finalProductData = {
        ...productData,
        _id: response.data.productid,
        img: images,
        pageid: userPage?._id,
        pageDetails: [userPage],
      };

      // Reset form and close
      setOpenProductForm(false);
      setSomeThingHappen({
        event: openProductForm.type === "edit" ? "edit" : "create",
        type: "product",
        data: finalProductData,
      });
    } catch (err) {
      console.error("Error submitting product:", err);
      addNotification({
        type: "error",
        message: err.response?.data?.message || "Failed to submit product",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAboutItem = () => {
    if (aboutInput.key.trim() && aboutInput.value.trim()) {
      setAbout([
        ...about,
        { key: aboutInput.key.trim(), value: aboutInput.value.trim() },
      ]);
      setAboutInput({ key: "", value: "" });
    }
  };

  const removeAboutItem = (index) => {
    setAbout(about.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`focusedMsg FormMenu ${openProductForm ? "active" : ""} `}
    >
      <div
        className={`body postForm ${
          loadingContent || openProductForm.type !== "edit"
            ? "contentLoaded"
            : ""
        }`}
        ref={formMenuRef}
      >
        {!loadingContent && openProductForm.type === "edit" && (
          <div className="lds-dual-ring big-loader"></div>
        )}

        <div className="top">
          <h4>
            {openProductForm.type === "edit"
              ? translations?.market_place?.edit_product
              : translations?.market_place?.create_product}
          </h4>
          <IoClose
            className="close"
            onClick={() => setOpenProductForm(false)}
          />
        </div>
        <div
          style={{
            overflow:
              !loadingContent && openProductForm.type === "edit"
                ? "hidden"
                : "auto",
          }}
        >
          <div className="inputHolder">
            <div className="holder">
              <h6
                className="placeHolder"
                onClick={() => document.getElementById("nameInput")?.focus()}
              >
                product name
              </h6>
              <input
                id="nameInput"
                type="text"
                {...register("name", {
                  required:
                    translations?.auth?.name_is_required || "name is required",
                  minLength: {
                    value: 3,
                    message:
                      translations?.auth
                        ?.firstname_must_be_at_least_3_characters,
                  },
                })}
                placeholder={``}
                style={{
                  borderColor: errors.name ? "red" : "black",
                }}
              />
            </div>
            {errors.name && (
              <span className="error">
                <CircleAlert />
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="rowHolder">
            <div className="inputHolder">
              <div className="holder">
                <h6
                  className="placeHolder"
                  onClick={() => document.getElementById("priceInput")?.focus()}
                >
                  price
                </h6>
                <input
                  id="priceInput"
                  type="number"
                  {...register("price", {
                    required:
                      translations?.auth?.price_is_required ||
                      "price is required",
                  })}
                  placeholder={``}
                  style={{
                    borderColor: errors.price ? "red" : "black",
                  }}
                />
              </div>
              {errors.price && (
                <span className="error">
                  <CircleAlert />
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="inputHolder">
              <div className="holder">
                <h6
                  className="placeHolder"
                  onClick={() => document.getElementById("saleInput")?.focus()}
                >
                  sale
                </h6>
                <input
                  id="saleInput"
                  type="number"
                  {...register("sale", {
                    min: { value: 0, message: "Sale must be positive" },
                    max: { value: 100, message: "Sale cannot exceed 100%" },
                  })}
                  placeholder={``}
                  style={{
                    borderColor: errors.sale ? "red" : "black",
                  }}
                />
              </div>
              {errors.sale && (
                <span className="error">
                  <CircleAlert />
                  {errors.sale.message}
                </span>
              )}
            </div>

            <div className="inputHolder">
              <div className="holder">
                <h6
                  className="placeHolder"
                  onClick={() => document.getElementById("stockInput")?.focus()}
                >
                  stock
                </h6>
                <input
                  id="stockInput"
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    min: { value: 0, message: "Stock must be positive" },
                  })}
                  placeholder={``}
                  style={{
                    borderColor: errors.stock ? "red" : "black",
                  }}
                />
              </div>
              {errors.stock && (
                <span className="error">
                  <CircleAlert />
                  {errors.stock.message}
                </span>
              )}
            </div>
          </div>

          <div className="rowHolder">
            <FormControl fullWidth>
              <InputLabel
                id="departement-label"
                sx={{
                  // Default styles
                  color: "#858585",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 14,
                  top: `-3px`,
                  "&.MuiInputLabel-shrink": {
                    top: "20px",
                  },
                  "&.MuiInputLabel-shrink": {
                    top: "2px",
                    fontSize: 15,
                    color: "#858585",
                  },
                }}
              >
                Department
              </InputLabel>
              <Select
                labelId="departement-label"
                value={departement}
                label="Department"
                onChange={(e) => setDepartement(e.target.value)}
                required
                sx={{
                  padding: "0px",
                  borderRadius: "8px",
                  borderColor: "gray",
                  backgroundColor: "#f1f1f1",
                  "& .MuiSelect-select": {
                    padding: "11.5px 14px",
                    fontSize: "14px", // change as needed
                    fontWeight: 500, // boldness
                    fontFamily: "Rubik", // optional: your custom font
                    color: "#333", // text color
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #e8e8e8",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff8e31",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #ff8e31",
                  },
                }}
              >
                <MenuItem value="">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#858585",
                      fontWeight: `600`,
                      fontSize: "14px",
                    }}
                  >
                    Clear Selection
                  </div>
                </MenuItem>
                {departements.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <MenuItem
                      key={index}
                      value={dept.name}
                      sx={{ py: 1.15, px: 2 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#858585",
                          fontSize: "14px",
                        }}
                      >
                        <Icon
                          style={{
                            color: "#858585",
                            fontSize: 18,
                            marginRight: 4,
                          }}
                        />
                        {
                          translations?.market_place?.[
                            dept.name.replace(/\s+/g, "_")
                          ]
                        }
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                id="category-label"
                sx={{
                  // Default styles
                  color: "#858585",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 14,
                  top: `-3px`,
                  "&.MuiInputLabel-shrink": {
                    top: "20px",
                  },
                  "&.MuiInputLabel-shrink": {
                    top: "2px",
                    fontSize: 15,
                    color: "#858585",
                  },
                }}
              >
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                value={category}
                label="Department"
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  padding: "0px",
                  borderRadius: "8px",
                  borderColor: "gray",
                  backgroundColor: "#f1f1f1",
                  "& .MuiSelect-select": {
                    padding: "11.5px 14px",
                    fontSize: "14px", // change as needed
                    fontWeight: 500, // boldness
                    fontFamily: "Rubik", // optional: your custom font
                    color: "#333", // text color
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #e8e8e8",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff8e31",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #ff8e31",
                  },
                }}
              >
                <MenuItem value="">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#858585",
                      fontWeight: `600`,
                      fontSize: "14px",
                    }}
                  >
                    Clear Selection
                  </div>
                </MenuItem>
                {userPage?.category?.map((cat, index) => {
                  return (
                    <MenuItem key={index} value={cat} sx={{ py: 1.15, px: 2 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#858585",
                          fontSize: "14px",
                        }}
                      >
                        {cat}
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className={`inputHolder`}>
            <div className="holder">
              <MdOutlineAddReaction
                className="reactBtn"
                onClick={(e) => handleMenus(e, "emojiHolder")}
              />

              <textarea
                ref={InputRef}
                placeholder={`Product details`}
                value={messageText}
                onInput={(e) => setMessageText(e.target.value)}
              />
            </div>
          </div>

          <div className="about-group">
            <div className="top">
              <h5>add more details</h5>

              <button
                type="button"
                className="main-button"
                onClick={addAboutItem}
              >
                Add
              </button>
            </div>
            <div className="about-input rowHolder">
              <input
                type="text"
                placeholder="Key (e.g. Color)"
                value={aboutInput.key}
                onChange={(e) =>
                  setAboutInput({ ...aboutInput, key: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Value (e.g. Red)"
                value={aboutInput.value}
                onChange={(e) =>
                  setAboutInput({ ...aboutInput, value: e.target.value })
                }
              />
            </div>

            {about?.length ? (
              <div className="about-items">
                {about.map((item, index) => (
                  <div key={index} className="about-item">
                    <span>
                      <strong>{item.key}:</strong> {item.value}
                    </span>
                    <IoClose
                      className="close"
                      onClick={() => removeAboutItem(index)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="productImages">
            <div
              className={`uploadlabel ${isDrag ? "active" : null}`}
              style={{
                height: images.length ? "140px" : "225px",
                border: `3px dashed ${
                  images.length === 0 && isSubmited ? "#f43521" : "#ff8e31"
                }`,
              }}
              onClick={() => inputFileRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDrag(true);
              }}
            >
              <FaCloudUploadAlt
                style={{
                  color:
                    images.length === 0 && isSubmited ? "#F43621E6" : "#ff8e31",
                }}
              />
              <p
                style={{
                  color:
                    images.length === 0 && isSubmited ? "#df3a3a" : "#ff8e31",
                }}
              >
                {translations?.forms?.click_or_drop_images_her}
              </p>
              <h1
                style={{
                  color:
                    images.length === 0 && isSubmited ? "#df3a3a" : "#ff8e31",
                }}
              >
                {isDrag
                  ? translations?.forms?.drop_her
                  : translations?.forms?.click_her}
              </h1>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              ref={inputFileRef}
              onChange={handleInputChange}
            />
            <div className="imgHolder">
              {images.map((image, index) => (
                <div className="uploaded" key={index}>
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : image?.url
                        ? image.url
                        : URL.createObjectURL(image)
                    }
                    alt={image.originalname || image.name || `Image-${index}`}
                    width="150"
                  />
                  <p>{index + 1}</p>
                  <IoClose onClick={() => handleRemoveImage(index)} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`main-button ${loading ? "loading" : ""}`}
            onClick={() => setisSubmited(true)}
            disabled={loading || (images?.length < 1 && isSubmited)}
          >
            <span>
              {openProductForm.type === "edit"
                ? translations?.market_place?.edit_product
                : translations?.market_place?.create_product}
            </span>
            <div className="lds-dual-ring"></div>
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
