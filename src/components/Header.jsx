import React, { useState, useRef } from "react";
import logo from "../assets/logo/logoIcon.png";

import "./style.css";
import { Link, NavLink } from "react-router-dom";
import SearchField from "./SearchField";

const Header = () => {
  let scrlSmallScreen = useRef(null);
  let scrlLargeScreen = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift, ref) => {
    ref.current.scrollLeft += shift;
    setscrollX(ref.current.scrollLeft);
  
    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = (ref) => {
    setscrollX(ref.current.scrollLeft);
    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  

  const menuList = [
    "Cool Tones",
    "Wallpapers",
    "Nature",
    "3D Renders",
    "Travel",
    "Architecture & Interiors",
    "Textures & Patterns",
    "Street Photography",
    "Film",
    "Archivel",
    "Experimental",
    "Animals",
    "Fashion & Beauty",
    "People",
    "Spirituality",
    "Business & Work",
    "Food & Drink",
    "Health & Wellness",
    "Sports",
    "Current Events",
  ];

  return (
    <>
      <header className="main-header-area">
        <div className="container-fluid">
          <div className="row pt-2">
            <div className="col-12 p-0">
              <div className="main-header-top-area">
                <div className="main-header-leftside-area">
                  <div className="main-header-logo">
                    <Link to="/">
                      <img src={logo} alt="logo" height={40} />
                    </Link>
                  </div>
                </div>
                <div className="main-header-middle-area">
                  <div className="main-header-searchbar">
                    <div className="header-form-search">
                      <SearchField />
                    </div>
                  </div>
                  <div className="navbar-menu-listItem d-none d-lg-block">
                    <ul>
                      <li>
                        <Link to="">Explore</Link>
                      </li>
                      <li>
                        <Link to="">Advertise</Link>
                      </li>
                      <li>
                        <Link to="">Snapshot+</Link>
                      </li>
                      <li>
                        <div className="vertical-line"></div>
                      </li>
                    </ul>
                  </div>
                  <div className="navbar-menu-listbtn d-none d-md-block">
                    <button className="menu-login-btn">Log in</button>
                    <button className="menu-submitPhoto-btn">
                      Submit a photo
                    </button>
                  </div>
                </div>
                <div className="main-header-rightside-area">
                  <div className="navbar-menu-wrapper">
                    <Link to="">
                      <i class="fa-solid fa-bars"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 p-0 d-none d-md-block">
              <div className="main-header-bottom-area">
                <div className="header-bottom-left-area">
                  <div className="navbar-menu-scrollable">
                    <ul>
                      <li>
                        <NavLink to="/">Editorial</NavLink>
                      </li>
                      <li>
                        <NavLink to="/photos/unsplash">Snapshot+</NavLink>
                      </li>
                      <li>
                        <div className="vertical-line"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="header-bottom-right-area">
                  <div className="navbar-menu-scrollable">
                    {scrollX !== 0 && (
                      <button
                        className="menu-prev-scrollbar"
                        onClick={() => slide(-200, scrlLargeScreen)}
                      >
                        <i className="fa fa-angle-left"></i>
                      </button>
                    )}
                    <ul ref={scrlLargeScreen} onScroll={() => scrollCheck(scrlLargeScreen)}>
                      {menuList.map((d, i) => (
                        <li key={i}>
                          <NavLink to={`/photos/${d}`}>{d}</NavLink>
                        </li>
                      ))}
                    </ul>
                    {!scrolEnd && (
                      <button
                        className="menu-next-scrollbar"
                        onClick={() => slide(+200, scrlLargeScreen)}
                      >
                        <i className="fa fa-angle-right"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 p-0 d-block d-md-none">
              <div className="main-header-bottom-area">
             
                <div className="header-bottom-right-area">
                  <div className="navbar-menu-scrollable">
                    {scrollX !== 0 && (
                      <button
                        className="menu-prev-scrollbar"
                        onClick={() => slide(-200, scrlSmallScreen)}
                      >
                        <i className="fa fa-angle-left"></i>
                      </button>
                    )}
                    <ul ref={scrlSmallScreen} onScroll={() => scrollCheck(scrlSmallScreen)}>
                    <li>
                        <NavLink to="/">Editorial</NavLink>
                      </li>
                      <li>
                        <NavLink to="/photos/unsplash">Snapshot+</NavLink>
                      </li>
                      {menuList.map((d, i) => (
                        <li key={i}>
                          <NavLink to={`/photos/${d}`}>{d}</NavLink>
                        </li>
                      ))}
                    </ul>
                    {!scrolEnd && (
                      <button
                        className="menu-next-scrollbar"
                        onClick={() => slide(+200, scrlSmallScreen)}
                      >
                        <i className="fa fa-angle-right"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
