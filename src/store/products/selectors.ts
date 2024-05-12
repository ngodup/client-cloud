import { createSelector } from "reselect";
import { RootState } from "../index";
import { Product, ProductProperties } from "../../interfaces/product";

const getProducts = (state: RootState) => state.products.products;
const getQuery = (state: RootState) => state.products.query;
const getPriceRange = (state: RootState) => state.products.priceRange;
const getSelectedCategory = (state: RootState) =>
  state.products.selectedCategory;

export const getFilteredProducts = createSelector(
  [getProducts, getQuery, getSelectedCategory, getPriceRange],
  (products, query, selectedCategory, priceRange) => {
    let filteredProducts = products;

    if (query) {
      const queryLowerCase = query.toLowerCase();
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.name.toLowerCase().includes(queryLowerCase)
      );
    }
    if (selectedCategory) {
      const selectedCategoryLowerCase = selectedCategory.toLowerCase();
      const propertiesToCheck: ProductProperties[] = [
        "category",
        "repas",
        "repasType",
      ];
      filteredProducts = filteredProducts.filter((product: Product) =>
        propertiesToCheck.some(
          (property) =>
            product[property] !== undefined &&
            product[property].toString().toLowerCase() ===
              selectedCategoryLowerCase
        )
      );
    }

    if (priceRange) {
      const { min, max } = priceRange;
      filteredProducts = filteredProducts.filter(
        (product: Product) => product.price >= min && product.price <= max
      );
    }

    return filteredProducts;
  }
);

export const getQuerySelector = (state: RootState) => state.products.query;
