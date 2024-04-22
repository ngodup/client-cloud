import React from "react";
import CustomRadioButton from "../../shared/CustomRadioButton";
import "./Category.css";

interface CategoryProps {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Category: React.FC<CategoryProps> = ({ handleRadioChange }) => {
  return (
    <div>
      <h2 className="sidebar-title">Catégorie</h2>

      <div>
        <label className="sidebar-label-container">
          <input
            onChange={handleRadioChange}
            type="radio"
            value=""
            name="pays"
          />
          <span className="checkmark"></span>Toute
        </label>
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="français"
          title="Français"
          name="pays"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="indienne"
          title="Indienne"
          name="pays"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="japonaise"
          title="Japonaise"
          name="pays"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="italienne"
          title="Italienne"
          name="pays"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="tibétaine"
          title="Tibétaine"
          name="pays"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="vietnamienne"
          title="Vietnamienne"
          name="pays"
        />
      </div>
    </div>
  );
};

export default Category;
