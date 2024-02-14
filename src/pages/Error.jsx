import React from "react";
import Header from "../components/Header";
import errorImage from "../assets/img/errorPage.jpg";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate()
    const handleBackHome = () => {
    navigate('/')
    }
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="errorPage-container">
              <img src={errorImage} alt="Error-Page" loading="lazy"/>
              <h1>Page not found</h1>
               <p>Hmm, the page you were looking for doesn't seem to exist anymore.</p>
               <button onClick={handleBackHome}>Back to Snapshot</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
