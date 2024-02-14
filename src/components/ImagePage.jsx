import React from "react";
//components
import Modal from "./Modal";
import Header from "./Header";

const ImagePage = () => {
  return (
    <>
      <Header />
      {/* Mobile Image Detail Page */}
      <div className="mobile-resp-image-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="mobile-imgpage-container">
                <Modal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
