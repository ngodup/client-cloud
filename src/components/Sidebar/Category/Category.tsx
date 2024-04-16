import React from "react";
import CustomRadioButton from "../../shared/CustomRadioButton";
import "./Category.css";

interface CategoryProps {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Category: React.FC<CategoryProps> = ({ handleRadioChange }) => {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input
            onChange={handleRadioChange}
            type="radio"
            value=""
            name="test"
          />
          <span className="checkmark"></span>All
        </label>
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="sneakers"
          title="Sneakers"
          name="test"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="flats"
          title="Flats"
          name="test"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="sandals"
          title="Sandals"
          name="test"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="heels"
          title="Heels"
          name="test"
        />
      </div>
    </div>
  );
};

export default Category;
