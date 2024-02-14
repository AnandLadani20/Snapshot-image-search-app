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

const MenuImagePage = () => {
  const { queryMenu } = useParams();
  const dispatch = useDispatch();
  const { pageNo, mainData, error, isLoading } = useSelector(
    (state) => state.queryParams
  );
  const [menuImageData, setMenuImageData] = useState([]);

  useEffect(() => {
    dispatch(fetchMenuData({ query: queryMenu, pageNo: pageNo }));
  }, [dispatch, pageNo, queryMenu]);

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
  }, [dispatch, queryMenu]);

  const fetchData = useCallback(() => {
    dispatch(pageIncrement());
  }, [dispatch]);
  console.log("pageno", pageNo);
  console.log("imdDataInside", menuImageData);

  useEffect(() => {
    document.title = `${queryMenu}  - Snapshot`;
  }, [queryMenu]);

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

        {!isLoading && !menuImageData.length ? <ErrorItem /> : ""}
        <ImageLayout imageData={menuImageData} fetchData={fetchData} />
      </div>
    </>
  );
};

export default MenuImagePage;
