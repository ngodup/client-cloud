// features/products/selectors.ts
import { createSelector } from "reselect";
import { RootState } from "./index";
import { Product, ProductProperties } from "../interfaces/product";

const getProducts = (state: RootState) => state.products.products;
const getQuery = (state: RootState) => state.products.query;
const getSelectedCategory = (state: RootState) =>
  state.products.selectedCategory;

export const getFilteredProducts = createSelector(
  [getProducts, getQuery, getSelectedCategory],
  (products, query, selectedCategory) => {
    let filteredProducts = products.filter((product: Product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory) {
      const propertiesToCheck: ProductProperties[] = [
        "price",
        "name",
        "category",
        "repas",
        "repasType",
      ];
      const selectedCategoryLowerCase = selectedCategory.toLowerCase();

      filteredProducts = filteredProducts.filter((product: Product) =>
        propertiesToCheck.some(
          (property) =>
            product[property] !== undefined &&
            product[property]
              .toString()
              .toLowerCase()
              .includes(selectedCategoryLowerCase)
        )
      );
    }

    return filteredProducts;
  }
);

export const getQuerySelector = (state: RootState) => state.products.query;
