import React from "react";

interface CustomRadioButtonProps {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  title: string;
  name: string;
  color?: string;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  handleRadioChange,
  color,
  name,
  title,
  value,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRadioChange(event);
  };

  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="radio" name={name} value={value} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default CustomRadioButton;
