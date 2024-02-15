//react
import React, { useCallback, useEffect, useState } from "react";
import "../style/home.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import Header from "../components/Header";
import SearchField from "../components/SearchField";
import ImageLayout from "../components/ImageLayout";

//icon & img
import { ReactComponent as TradingIcon } from "../assets/svg/trandingIcon.svg";
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";

//redux
import {
  fetchMenuData,
  pageIncrement,
  resetData,
} from "../redux-toolkit/searchSlice";
import ErrorItem from "../components/ErrorItem";

const Home = () => {
  const { queryMenu } = useParams();
  const dispatch = useDispatch();
  const { pageNo, mainData, error, isLoading } = useSelector(
    (state) => state.queryParams
  );
  const [imageData, setImageData] = useState([]);
  const queryPara = queryMenu || "all";

  useEffect(() => {
    dispatch(fetchMenuData({ query: queryPara, pageNo: pageNo }));
  }, [dispatch, pageNo, queryPara]);

  useEffect(() => {
    setImageData((prev) => {
      const uniqueIds = new Set(prev.map((item) => item.id));
      const filteredItem = mainData.filter((item) => !uniqueIds.has(item.id));
      return [...prev, ...filteredItem];
    });
  }, [mainData]);

  useEffect(() => {
    dispatch(resetData());
    setImageData([]);
  }, [dispatch, queryPara]);

  const fetchData = useCallback(() => {
    dispatch(pageIncrement());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Beautyful Free images & pictures - SnapShot";
  }, []);
  return (
    <>
      <Header />

      <section className="main-hero-area">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 py-2">
              <div className="home-hero-content-wrapper">
                <h1>Snapshot</h1>
                <p>The internet's source for visuals.</p>
                <p>Powered by creators everywhere.</p>
                <div className="trending-items-wrapper">
                  <p>Trending:</p>
                  <div>
                    <Link to="/photos/flower">flower</Link>,{" "}
                    <Link to="/photos/wallpapers">wallpapers</Link>,{" "}
                    <Link to="/photos/background">backgrounds</Link>,{" "}
                    <Link to="/photos/happy">happy</Link>,{" "}
                    <Link to="/photos/love">love</Link>
                  </div>
                </div>
                <div className="hero-searchbar-area">
                  <SearchField />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 py-2">
              <div className="hero-tranding-search-wrap">
                <div className="tranding-link-items">
                  <Link to="/photos/economy">Economy</Link>
                  <Link to="/photos/valentine">Valentine</Link>
                  <Link to="/photos/heart">Heart</Link>
                  <Link to="/photos/blad head">Blad Head</Link>
                  <Link to="/photos/interest rates">Interest Rates</Link>
                  <Link to="/photos/ash">Ash</Link>
                </div>
                <div className="tranding-text-wrap">
                  <TradingIcon />{" "}
                  <Link to="/photos/trending">See trending searches</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 py-2">
              <div className="hero-tranding-img-wrap">
                <div className="tranding-img-layout">
                  <div className="img-gridstyle-box img-gridstyle-box1">
                    <img src={img1} alt="im" loading="lazy" />
                  </div>
                  <div className="img-gridstyle-box img-gridstyle-box2">
                    <img src={img2} alt="mi" loading="lazy" />
                  </div>
                  <div className="img-gridstyle-box img-gridstyle-box3">
                    <img src={img3} alt="ew" loading="lazy" />
                  </div>
                </div>
                <div className="tranding-img-text">
                  <Link to="/photos/super bowl">
                    <h6>Super Bowl</h6>
                    <p>By Snapshot+ Collections</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {error ? <h1>{error}</h1> : ""}
          {isLoading ? (
            <div className="loader-container">
              <span className="loader"></span>
            </div>
          ) : (
            ""
          )}

          {!isLoading && !imageData.length ? <ErrorItem /> : ""}
          <ImageLayout imageData={imageData} fetchData={fetchData} />
        </div>
      </section>
    </>
  );
};

export default React.memo(Home);
