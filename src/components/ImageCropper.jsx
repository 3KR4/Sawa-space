import { useState, useEffect, useContext, useRef, useCallback } from "react";

import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { getCroppedImg } from "@/utils/cropImage";

import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";

export default function ImageCropper({
  type,
  imageURL,
  setImageURL,
  aspect = 1,
  inputRef,
  setState,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);

      // 🛠️ Reset crop settings
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCroppedAreaPixels(null);
      inputRef.current.value = null;
    }
  };

  const updateCroppedImage = useCallback(async () => {
    if (!imageURL || !croppedAreaPixels) {
      setState(null); // خلي الـstate null لما مافي بيانات
      return;
    }
    const blob = await getCroppedImg(imageURL, croppedAreaPixels, rotation);
    setState(blob);
  }, [imageURL, croppedAreaPixels, rotation, setState]);

  useEffect(() => {
    updateCroppedImage();
  }, [updateCroppedImage]);

  const handleDelete = () => {
    setImageURL(null);
    setState(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    inputRef.current.value = null;
  };

  return (
    <div className={`cropperContainer ${type}`}>
      {imageURL ? (
        <>
          <div className="cropperBox">
            <Cropper
              image={imageURL}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="controls">
            <div className="hold">
              <label>Zoom</label>
              <Slider
                className="slider"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, value) => setZoom(value)}
                sx={{
                  "& .MuiSlider-thumb": {
                    width: 13,
                    height: 13,
                  },
                }}
              />
              <IoMdResize />
            </div>
            <div className="hold">
              <label>Rotate</label>
              <Slider
                className="slider"
                min={0}
                max={360}
                step={1}
                value={rotation}
                onChange={(e, value) => setRotation(value)}
                sx={{
                  "& .MuiSlider-thumb": {
                    width: 13,
                    height: 13,
                  },
                }}
              />
              <FaRotate />
            </div>
          </div>

          <div className="actions row">
            <button className="main-button danger" onClick={handleDelete}>
              remove
            </button>
            <button
              className="main-button"
              onClick={() => inputRef.current.click()}
            >
              change
            </button>
          </div>
        </>
      ) : (
        <div className="productImages">
          <div
            className="uploadlabel"
            style={{
              height: "225px",
              border: "3px dashed #ff8e31",
            }}
            onClick={() => inputRef.current.click()}
          >
            <FaCloudUploadAlt size={48} />
            <p>Click to upload {type}</p>
          </div>
        </div>
      )}
      <input
        type="file"
        hidden
        ref={inputRef}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
}
