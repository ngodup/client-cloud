import React from "react";
import "./Repas.css";
import CustomRadioButton from "../../shared/CustomRadioButton";

interface RepasProps {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Repas: React.FC<RepasProps> = ({ handleRadioChange }) => {
  return (
    <>
      <div>
        <h2 className="sidebar-title repas-title">Repas</h2>
        <label className="sidebar-label-container">
          <input
            onChange={handleRadioChange}
            type="radio"
            value=""
            name="repas"
          />
          <span className="checkmark"></span>
          Tous les menus
        </label>

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="végétarien"
          title="Végétarien"
          name="repas"
        />

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="non-végétarien"
          title="Non végétarien"
          name="repas"
        />

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="petit-déjeuner"
          title="Petit - déjeuner"
          name="repas"
        />

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="déjeuner"
          title="Déjeuner"
          name="repas"
        />
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="dîner"
          title="Dîner"
          name="repas"
        />
      </div>
    </>
  );
};

export default Repas;
