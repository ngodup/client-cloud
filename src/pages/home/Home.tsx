import Navigation from "../../components/Navigation/Navigation";
import Products from "../../components/Products/Products";
import Recommended from "../../components/Recommended/Recommended";
import Sidebar from "../../components/Sidebar/Sidebar";

import { useAppDispatch, useAppSelector } from "../../store";
import { setQuery, setSelectedCategory } from "../../store/products-slice";
import { getFilteredProducts, getQuery } from "../../store/selectors";
import "../../../../styles/index.css";

function Home() {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(getFilteredProducts);
  const query = useAppSelector(getQuery); // Get the current query from the Redux store

  const handleSearchInputChange = (event: any) => {
    dispatch(setQuery(event.target.value));
  };

  const handleRadioChange = (event: any) => {
    dispatch(setSelectedCategory(event.target.value));
  };
  // ------------ Button Filtering -----------
  const handleRecommendedClick = (event: any) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  // Directly pass filteredProducts to the Products component
  return (
    <>
      <Sidebar handleRadioChange={handleRadioChange} />
      <Navigation
        query={query}
        handleSearchInputChange={handleSearchInputChange}
      />
      <Recommended handleRecommendedClick={handleRecommendedClick} />
      <Products filteredProducts={filteredProducts} />
    </>
  );
}

export default Home;
