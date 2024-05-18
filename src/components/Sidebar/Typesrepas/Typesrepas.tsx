import React from "react";
import "./Typesrepas.css";
import CustomRadioButton from "../../shared/CustomRadioButton";

interface TypesrepasProps {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Typesrepas: React.FC<TypesrepasProps> = ({ handleRadioChange }) => {
  return (
    <>
      <div>
        <h2 className="sidebar-title repas-title">Type de repas</h2>
        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="végétarien"
          title="Végétarien"
          name="repasType"
        />

        <CustomRadioButton
          handleRadioChange={handleRadioChange}
          value="non-végétarien"
          title="Non végétarien"
          name="repasType"
        />
      </div>
    </>
  );
};

export default Typesrepas;
