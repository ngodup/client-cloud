import React from "react";
import CustomRadioButton from "../../shared/CustomRadioButton";
import "./Prix.css";

interface PrixPros {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Prix: React.FC<PrixPros> = ({ handleRadioChange }) => {
  return (
    <>
      <div>
        <h2 className="sidebar-title price-title">Prix</h2>

        {/* <label className="sidebar-label-container">
          <input
            onChange={handleRadioChange}
            type="radio"
            value=""
            name="prix"
          />
          <span className="checkmark"></span>Tout
        </label> */}

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value={0}
          title="€0 - 5"
          name="prix"
        />

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value={5}
          title="€6 - €10"
          name="prix"
        />

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value={11}
          title="€11 - €15"
          name="prix"
        />

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value={15}
          title="Plus de 15€"
          name="prix"
        />
      </div>
    </>
  );
};

export default Prix;
