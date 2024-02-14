// react
import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

// icon
import { ReactComponent as HeartIcon } from "../assets/svg/heart.svg";
import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg";
import { ReactComponent as DownloadIcon } from "../assets/svg/download.svg";
import { ReactComponent as DownAeroIcon } from "../assets/svg/downAero.svg";

// components
import Modal from "./Modal";

// redux
import { imagePageData } from "../redux-toolkit/productSlice";

const ImageLayout = ({ imageData, fetchData }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageModal = (img) => {
    dispatch(imagePageData(img));
  };

  const handleImagePage = (img) => {
    dispatch(imagePageData(img));
    navigate(`/image/${img.alt_description}`);
  };

  // download image
  const handleDownloadImage = (img) => {
    var element = document.createElement("a");
    var file = new Blob([img?.urls.regular], { type: "image/jpeg" });
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // const isDeskScreen = useMediaQuery({ minWidth: 992});
  const isTabletScreen = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  // const isMobileScreen = useMediaQuery({ min maxWidth:992});
  const columnArr = isTabletScreen ? [0, 1] : [0, 1, 2];

  return (
    <>
      <div className="row">
       
        <div className="col-12 d-none d-md-block">
          <div className="main-common-img-layout-container">
            {/* for three column Map */}
            {columnArr.map((num, columnIndex) => {
              return (
                <div className="common-img-layout-box" key={columnIndex}>
                  {/*seperate data from array in three column */}
                  {imageData.map((img, i) => {
                    // Calculate the starting index for the column
                    const startIndexColumn = num;
                    // Display images in the column
                    if (
                      i % columnArr.length ===
                      startIndexColumn % columnArr.length
                    ) {
                      return (
                        <div key={i}>
                          <div className="img-content-wrapper">
                            <div className="img-hover-content">
                              <div className="img-hover-right-top-content">
                                <div className="snapshot-icon">
                                  <HeartIcon />
                                </div>
                                <div className="snapshot-icon">
                                  <PlusIcon />
                                </div>
                              </div>
                              <div className="img-description">
                                <div className="img-owner-details">
                                  <div className="owner-person-img">
                                    <img
                                      src={img.user.profile_image.large}
                                      alt="no-img"
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="owner-person-name">
                                    {img.user.name}
                                  </p>
                                </div>
                                <div
                                  className="snapshot-icon img-hover-downloadIcon"
                                  onClick={() => handleDownloadImage(img)}
                                >
                                  <DownloadIcon />
                                </div>
                              </div>
                              <div className="img-hover-bg-shadow"></div>
                            </div>
                            <figure
                              className="swap-on-hover"
                              data-bs-toggle="modal"
                              data-bs-target="#imageModalPage"
                              onClick={() => handleImageModal(img)}
                            >
                              <img
                                src={img.urls.small}
                                alt={img.alt_description}
                                loading="lazy"
                                className="grid-img-style"
                              />
                            </figure>
                          </div>

                          <div className="img-tag-box">
                            {img.tags.map((t) => {
                              return <Link to={`/photos/${t.title}`}>{t.title}</Link>;
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            })}
          </div>
          <div
            class="modal"
            id="imageModalPage"
            tabindex="-1"
            aria-labelledby="imageModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <Modal />
            </div>
          </div>
       </div>
       <div className="col-12 d-block d-md-none">
          {/* Mobile Image Layout */}
          <div className="main-common-img-layout-container ">
            {/* for three column Map */}
            <div className="common-img-layout-box">
              {/*seperate data from array in three column */}
              {imageData.map((img, i) => {
                // Calculate the starting index for the column
                return (
                  <div key={i}>
                    <div className="img-content-wrapper">
                      <div className="img-description">
                        <div className="img-owner-details">
                          <div className="owner-person-img">
                            <img
                              src={img.user.profile_image.large}
                              alt="no-img"
                              loading="lazy"
                            />
                          </div>
                          <p className="owner-person-name">{img.user.name}</p>
                        </div>
                      </div>
                      <figure
                        className="swap-on-hover"
                        onClick={() => handleImagePage(img)}
                      >
                        <img
                          src={img.urls.small}
                          alt={img.alt_description}
                          loading="lazy"
                          className="grid-img-style"
                        />
                      </figure>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="img-hover-right-top-content">
                          <div className="snapshot-icon">
                            <HeartIcon />
                          </div>
                          <div className="snapshot-icon">
                            <PlusIcon />
                          </div>
                        </div>
                        <div className="mobile-img-download-btn">
                          <button onClick={handleDownloadImage}>
                            Download
                          </button>
                          <button>
                            <DownAeroIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      
        </div>
      </div>

      {/* For Infinite scroll library */}
      <InfiniteScroll
        dataLength={imageData.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={imageData.length ? <div className="loader-container"><span className="loader"></span></div> : ''}
      ></InfiniteScroll>
    </>
  );
};

export default React.memo(ImageLayout);
