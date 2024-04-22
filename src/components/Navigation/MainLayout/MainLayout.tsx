import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useAppSelector } from "../../../store";
import { setQuery } from "../../../store/products/products-slice";
import { getQuerySelector } from "../../../store/products/selectors";

function MainLayout() {
  const query = useAppSelector(getQuerySelector);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Header query={query} handleSearchInputChange={handleSearchInputChange} />
      <Outlet />
    </>
  );
}

export default MainLayout;
