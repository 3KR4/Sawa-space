import { Cropper } from "react-easy-crop";
import { Slider } from "@mui/material";
import { FaCloudUploadAlt, FaRotate } from "react-icons/fa";
import { IoMdResize } from "react-icons/io";

export default function ImageCropper({
  imageURL,
  setImageURL,
  aspect = 1,
  inputRef,
  onCropDone,
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
    }
  };

  const handleCrop = async () => {
    const blob = await getCroppedImg(imageURL, croppedAreaPixels, rotation);
    onCropDone(blob); // send the cropped blob outside
  };

  const handleDelete = () => {
    setImageURL(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
  };

  return (
    <div className="cropperContainer">
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
              />
              <FaRotate />
            </div>
            <div className="actions">
              <button onClick={handleCrop}>Crop & Save</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
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
            <p>Click to upload</p>
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
