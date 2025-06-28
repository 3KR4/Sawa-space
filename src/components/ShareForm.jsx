import { PiShareFat } from "react-icons/pi";
import { MenusContext } from "@/Contexts/MenusContext";
import { useState, useContext, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

const ShareForm = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { shareLink, setShareLink, Refs } = useContext(MenusContext);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        setShareLink(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareToSocial = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareLink
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareLink
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareLink
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareLink}`)}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        Refs.shareForm.current &&
        !Refs.shareForm.current.contains(event.target)
      ) {
        setShareLink(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className={`focusedMsg share FormMenu ${shareLink ? "active" : ""} `}>
      <div className={`body shareForm contentLoaded`} ref={Refs.shareForm}>
        <div className="top">
          <h4>Share This Post To</h4>
          <div>
            <IoClose className="close" onClick={() => setShareLink(null)} />
          </div>
        </div>

        <div className="social-holder">
          <img
            src={`/Svgs/facebook.png`}
            onClick={(e) => shareToSocial("facebook", e)}
          />

          <img
            src={`/Svgs/whatsap.png`}
            onClick={(e) => shareToSocial("whatsapp", e)}
          />

          <img
            src={`/Svgs/linkedin.webp`}
            onClick={(e) => shareToSocial("linkedin", e)}
          />
        </div>

        <h5>or copy link</h5>
        <div className="link-holder">
          <MdContentCopy />
          <input type="text" value={shareLink} readOnly />
          <button type="button" onClick={handleCopy} className="main-button">
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShareForm;
