// features/products/selectors.ts
import { RootState } from "./index";
import { Product, ProductProperties } from "../interfaces/product";

export const getFilteredProducts = (state: RootState) => {
  const { products, query, selectedCategory } = state.products;

  let filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  if (selectedCategory) {
    const propertiesToCheck: ProductProperties[] = [
      "category",
      "repas",
      "repasType",
      "price",
      "name",
    ];
    const selectedCategoryLowerCase = selectedCategory.toLowerCase();

    filteredProducts = filteredProducts.filter((product: Product) =>
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
