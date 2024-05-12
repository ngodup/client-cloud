import Products from "../../components/Products/Products";
import Recommended from "../../components/Recommended/Recommended";
import Sidebar from "../../components/Sidebar/Sidebar";

import { useAppDispatch, useAppSelector } from "../../store";
import { getFilteredProducts } from "../../store/products/selectors";
import {
  setSelectedCategory,
  setPriceRange,
} from "../../store/products/products-slice";

function Home() {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(getFilteredProducts);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = parseFloat(value);
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      // The value is not a valid number, so handle with category
      dispatch(setSelectedCategory(value));
    } else {
      // The value is a valid number, so you can use it here
      if (numberValue < 15)
        dispatch(setPriceRange({ min: numberValue, max: numberValue + 5 }));
      else
        dispatch(setPriceRange({ min: numberValue, max: numberValue + 100 }));
      console.log("The value is a number:", numberValue);
    }
  };
  //  ------------ Button Filtering -----------
  const handleRecommendedClick = (value: string) => {
    debugger;
    dispatch(setSelectedCategory(value));
  };
  // Directly pass filteredProducts to the Products component
  return (
    <>
      <div className="hidden-on-mobile">
        <Sidebar handleRadioChange={handleRadioChange} />
      </div>

      <Recommended handleRecommendedClick={handleRecommendedClick} />
      <Products filteredProducts={filteredProducts} />
    </>
  );
}

export default Home;
