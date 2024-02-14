import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// components
import ImageLayout from "../components/ImageLayout";
import Header from "../components/Header";

// redux
import {
  fetchMenuData,
  pageIncrement,
  resetData,
} from "../redux-toolkit/searchSlice";
import ErrorItem from "../components/ErrorItem";

const SearchImagePage = () => {
  const { querySearch } = useParams();
  const dispatch = useDispatch();
  const { pageNo, mainData, error, isLoading } = useSelector(
    (state) => state.queryParams
  );
  const [menuImageData, setMenuImageData] = useState([]);

  useEffect(() => {
    dispatch(fetchMenuData({ query: querySearch, pageNo: pageNo }));
  }, [dispatch, pageNo, querySearch]);

  useEffect(() => {
    setMenuImageData((prev) => {
      const uniqueIds = new Set(prev.map((item) => item.id));
      const filteredItem = mainData.filter((item) => !uniqueIds.has(item.id));
      return [...prev, ...filteredItem];
    });
  }, [mainData]);

  useEffect(() => {
    dispatch(resetData());
    setMenuImageData([]);
  }, [dispatch, querySearch]);

  const fetchData = useCallback(() => {
    dispatch(pageIncrement());
  }, [dispatch]);

  useEffect(() => {
    document.title = `${querySearch} Pictures - Snapshot`;
  }, [querySearch]);
  return (
    <>
      <Header />
      <div className="container">
        {error ? <h1>{error}</h1> : ""}
        {isLoading ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : (
          ""
        )}

        { !isLoading && !menuImageData.length ?  <ErrorItem /> : ''}

        <ImageLayout imageData={menuImageData} fetchData={fetchData} />
      </div>
    </>
  );
};

export default SearchImagePage;
