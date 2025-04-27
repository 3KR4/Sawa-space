"use client";
import "@/Styles/forms.css";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { userService } from "@/services/api/userService";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ScreenContext } from "@/Contexts/ScreenContext";
import Slider from "@mui/material/Slider";

import { PiResizeBold } from "react-icons/pi";
import { FaRotate } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";

function ImgForm() {
  const { locale, translations } = useLanguage();
  const { addNotification } = useNotification();
  const { openImgForm, setOpenImgForm, setDangerEvent, dangerEventRef } =
    useContext(MenusContext);
  const { handleMenus } = useContext(DynamicMenusContext);
  const { getUser } = useContext(ScreenContext);

  const imgFormMenuRef = useRef(null);
  const inputFileRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        imgFormMenuRef.current &&
        imgFormMenuRef.current.contains(event.target)
      ) {
        return;
      }
      if (
        dangerEventRef?.current &&
        dangerEventRef.current.contains(event.target)
      ) {
        return;
      }
      if (
        dangerEventRef?.current?.parentElement &&
        dangerEventRef?.current?.parentElement.contains(event.target)
      ) {
        return;
      }
      setOpenImgForm(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (openImgForm?.event === "edit") {
      setImageURL(openImgForm.image);
    } else {
      setImageURL(null);
    }
  }, [openImgForm]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
    setHasEdited(true);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("image")) {
      setImageFile(file);
      setImageURL(URL.createObjectURL(file));
      setZoom(1);
      setRotation(0);
      setCrop({ x: 0, y: 0 });
      setHasEdited(true);
    }
  };

  const handleSubmit = async () => {
    if (!imageURL || !croppedAreaPixels) return;

    setLoading(true);
    try {
      if (openImgForm.event === "edit" && hasEdited) {
        const res1 = await userService.delete_img_cover(
          openImgForm.userId,
          openImgForm.type
        );
        console.log("delete_img_cover", res1);
      }

      const croppedImageBlob = await getCroppedImg(
        imageURL,
        croppedAreaPixels,
        rotation
      );

      const formData = new FormData();
      formData.append("img", croppedImageBlob);

      const res3 = await userService.upload_img_cover(
        openImgForm.userId,
        openImgForm.type,
        formData
      );

      console.log("upload_img_cover", res3);

      addNotification({
        type: "success",
        message:
          openImgForm.event === "edit"
            ? "You updated your image successfully."
            : "You added your image successfully.",
      });
      await getUser();
      setOpenImgForm(false);
    } catch (err) {
      console.log(err);
      addNotification({ type: "error", message: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`focusedMsg FormMenu  ${openImgForm ? "active" : ""}`}>
      <div
        className={`body imgForm contentLoaded ${openImgForm.type}`}
        ref={imgFormMenuRef}
      >
        <div className="top">
          <h4>
            {openImgForm.type === "img"
              ? openImgForm.event === "edit"
                ? translations?.forms?.edit_profile_img
                : translations?.forms?.add_profile_img
              : openImgForm.event === "edit"
              ? translations?.forms?.edit_profile_cover
              : translations?.forms?.add_profile_cover}
          </h4>
          <IoClose className="close" onClick={() => setOpenImgForm(false)} />
        </div>

        <div className="cropperContainer">
          {imageURL ? (
            <>
              <div className="cropperBox">
                <Cropper
                  image={imageURL}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={openImgForm.type === "img" ? 1 : 16 / 6}
                  onCropChange={setCrop}
                  onZoomChange={(val) => {
                    setZoom(val);
                    setHasEdited(true);
                  }}
                  onRotationChange={(val) => {
                    setRotation(val);
                    setHasEdited(true);
                  }}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="controls">
                <div className="hold">
                  <label>{translations?.forms?.zoom}</label>
                  <Slider
                    className="slider"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, value) => setZoom(value)}
                    sx={{
                      "& .MuiSlider-thumb": {
                        width: 15,
                        height: 15,
                      },
                      "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible":
                        {
                          boxShadow: "0px 0px 0px 7px rgb(94 94 94 / 16%)",
                        },
                    }}
                  />
                  <IoMdResize />
                </div>
                <div className="hold">
                  <label>{translations?.forms?.rotate}</label>
                  <Slider
                    className="slider"
                    min={0}
                    max={360}
                    step={1}
                    value={rotation}
                    onChange={(e, value) => setRotation(value)}
                    sx={{
                      "& .MuiSlider-thumb": {
                        width: 15,
                        height: 15,
                      },
                      "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible":
                        {
                          boxShadow: "0px 0px 0px 7px rgb(94 94 94 / 16%)",
                        },
                    }}
                  />
                  <FaRotate />
                </div>
              </div>
            </>
          ) : (
            <div className="productImages">
              <div
                className="uploadlabel"
                style={{
                  height: "225px",
                  border: `3px dashed #ff8e31`,
                }}
                onClick={() => inputFileRef.current.click()}
              >
                <FaCloudUploadAlt size={48} />
                <p>{translations?.forms?.click_to_uploud_image_her}</p>
              </div>
            </div>
          )}
          <input
            type="file"
            hidden
            ref={inputFileRef}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {imageURL && <hr style={{ marginBottom: "3px" }} />}

        <div className="actions">
          {openImgForm.event === "edit" && (
            <button
              type="button"
              className={`main-button danger `}
              onClick={() => {
                setDangerEvent({
                  type: "delete_img",
                  message: `are you sure you want to delete your profile ${openImgForm.type}`,
                });
              }}
            >
              <span>{translations?.forms?.delete_image}</span>
            </button>
          )}

          <div className="row">
            {imageURL && (
              <button
                type="button"
                className={`main-button`}
                onClick={() => inputFileRef.current.click()}
              >
                <span>{translations?.forms?.change_image}</span>
              </button>
            )}
            {imageURL && (
              <button
                type="button"
                className={`main-button  ${loading ? "loading" : ""}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                <div className="lds-dual-ring"></div>
                <span>Update Image</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default ImgForm;
