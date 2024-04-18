import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { fetchProducts } from "./store/products-slice";
import { useAppDispatch, useAppSelector } from "./store";
import { setQuery } from "./store/products-slice";
import { getQuery } from "./store/selectors";

import Header from "./components/Header/Header";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Gallery from "./pages/gallery/Gallery";

function App() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(getQuery); // Get the current query from the Redux store

  //Initial products fetch
  // React.useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <Router>
      <Header query={query} handleSearchInputChange={handleSearchInputChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
