import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import Recommended from "../../components/Recommended/Recommended";
import Sidebar from "../../components/Sidebar/Sidebar";

import { useAppDispatch, useAppSelector } from "../../store";
import { setSelectedCategory } from "../../store/products-slice";
import { getFilteredProducts } from "../../store/selectors";

function Home() {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(getFilteredProducts);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedCategory(event.target.value));
  };
  // ------------ Button Filtering -----------
  const handleRecommendedClick = (value: string) => {
    dispatch(setSelectedCategory(value));
  };
  // Directly pass filteredProducts to the Products component
  return (
    <>
      <Sidebar handleRadioChange={handleRadioChange} />
      <Recommended handleRecommendedClick={handleRecommendedClick} />
      <Products filteredProducts={filteredProducts} />
    </>
  );
}

export default Home;
