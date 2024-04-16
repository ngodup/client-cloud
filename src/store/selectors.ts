// features/products/selectors.ts
import { RootState } from "./index";

export const getFilteredProducts = (state: RootState) => {
  const { products, query, selectedCategory } = state.products;

  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  if (selectedCategory) {
    const propertiesToCheck = ["category", "color", "company", "price", "name"];
    const selectedCategoryLowerCase = selectedCategory.toLowerCase();

    filteredProducts = filteredProducts.filter((product) =>
      propertiesToCheck.some((property) =>
        product[property]
          .toString()
          .toLowerCase()
          .includes(selectedCategoryLowerCase)
      )
    );
  }

  return filteredProducts;
};

export const getQuery = (state: RootState) => state.products.query;
