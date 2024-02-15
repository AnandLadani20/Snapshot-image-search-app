import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
// icons
import { ReactComponent as VisualSearchIcon } from "../assets/svg/visualSearch.svg";


const SearchField = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchValue,setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }
 
  const navigate = useNavigate()
  const handleButtonSearch = (event) =>{
    event.preventDefault();
    if(searchValue !== ''){
      navigate(`/search/photos/${searchValue}`)
      // setSearchValue('')
    }
   
  }
  const handleEnterSearch = (event) => {    

    if(event.key === 'Enter' && searchValue !== ''){
      navigate(`/search/photos/${searchValue}`)
      // setSearchValue('')
    }
    
  }
  // input focus to white bg
  const handleFocus = () => {
    setIsInputFocused(true);
  };
  const handleBlur = () => {
    setIsInputFocused(false);
  };
  return (
    <>
      <form onSubmit={handleButtonSearch}>
        <div className={`input-group ${isInputFocused ? "focused" : ""}`}>
          <button type="submit"  className="input-group-text form-search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            type="text"
            className="form-control searchImage-input"
            placeholder="Search high resolution images"
            id="searchImage"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleEnterSearch}
            required
          />
          <button type="button" className="input-group-text form-visualSearch-btn">
            <VisualSearchIcon />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchField;
