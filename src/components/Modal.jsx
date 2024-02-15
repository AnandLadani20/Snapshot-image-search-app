// react
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// icons
import { ReactComponent as HeartIcon } from "../assets/svg/heart.svg";
import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg";
import { ReactComponent as DotsIcon } from "../assets/svg/dotsIcon.svg";
import { ReactComponent as InfoIcon } from "../assets/svg/infoIcon.svg";
import { ReactComponent as ShareIcon } from "../assets/svg/shareIcon.svg";
import { ReactComponent as LocationIcon } from "../assets/svg/location.svg";
import { ReactComponent as CalenderIcon } from "../assets/svg/calender.svg";
import { ReactComponent as ZoomIcon } from "../assets/svg/zoom.svg";
import { ReactComponent as ZoomOutIcon } from "../assets/svg/zoomOut.svg";
import { ReactComponent as DownAeroIcon } from "../assets/svg/downAero.svg";



const Modal = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { imgData } = useSelector((state) => state.imageObj);

  // random number
  const views = Math.floor(Math.random() * 100000 + 1);
  const downloads = Math.floor(Math.random() * 10000 + 1);

// date convert
  const inputDateString = imgData?.user.updated_at;
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const outputDate = inputDate.toLocaleDateString("en-US", options);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // download image
  const handleDownloadImage = () => {
    // Fetch the image data
    fetch(`${imgData?.urls.regular}`)
        .then(response => response.blob())
        .then(blob => {
            // Create a Blob from the fetched data
            var element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = "image.jpg";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        })
        .catch(error => console.error("Error fetching image:", error));
};
  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-img-owner-details" id="imageModalLabel">
            <div className="owner-person-img">
              <img src={imgData?.user.profile_image.large} alt="no-img"  loading="lazy"/>
            </div>
            <p className="modal-owner-person-name">{imgData?.user.name}</p>
          </div>
          <div className="d-flex justify-content-end gap-2 mobile-width-set">
            <div className="snapshot-icon ">
              <HeartIcon />
            </div>
            <div className="snapshot-icon">
              <PlusIcon />
            </div>
            <div className="modal-img-download-btn ms-auto ms-md-0">
              <button onClick={handleDownloadImage}>Download free</button>
              <button>
                {" "}
                <DownAeroIcon />
              </button>
            </div>
          </div>
        </div>
        <div className={`modal-body ${isFullscreen ? "fullscreen" : ""}`}>
          <figure className="modal-swap-on-hover">
            <img
              src={imgData?.urls.regular}
              alt={imgData?.alt_description}
              loading="lazy"
              className="modal-body-img-style"
            />
            <div className="modal-img-zoom" onClick={handleFullscreen}>
              {isFullscreen ? <ZoomOutIcon /> : <ZoomIcon />}
            </div>
          </figure>
        </div>
        <div className="modal-footer">
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div className="d-flex gap-4 gap-md-4 flex-wrap">
              <div>
                <p className="modal-img-features">Views</p>
                <p>{imgData ? views : ""}</p>
              </div>
              <div>
                <p className="modal-img-features">Likes</p>
                <p>{imgData?.likes}</p>
              </div>
              <div>
                <p className="modal-img-features">Downloads</p>
                <p>{imgData ? downloads : ""}</p>
              </div>
            </div>
            <div className="d-flex  gap-2">
              <div className="snapshot-icon">
                <ShareIcon />
                <span className="d-none d-md-inline"> Share</span>
              </div>
              <div className="snapshot-icon">
                <InfoIcon />
                <span className="d-none d-md-inline">Info</span>
              </div>
              <div className="snapshot-icon">
                <DotsIcon className="dots-icon" />
              </div>
            </div>
          </div>
          <div>
            <p className="modal-img-desc">{imgData?.alt_description}</p>
          </div>
          <div>
            <div className="modal-img-user-details">
              <LocationIcon /> <span>{imgData?.user.location}</span>{" "}
            </div>
            <div className="modal-img-user-details">
              <CalenderIcon /> <span>Published On {outputDate}</span>{" "}
            </div>
          </div>
          <div className="img-tag-box">
            {imgData?.tags.map((t) => {
              return <Link to={`/photos/${t.title}`}>{t.title}</Link>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Modal);
