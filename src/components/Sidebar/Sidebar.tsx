import React from "react";
import Category from "./Category/Category";
import Prix from "./Prix/Prix";
import Repas from "./Repas/Repas";
import "./Sidebar.css";

interface SidebarProps {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleRadioChange }) => {
  return (
    <>
      <section className="sidebar">
        {/* <div className="logo-container">
          <h1>🛒</h1>
        </div> */}
        <Category handleRadioChange={handleRadioChange} />
        <Prix handleRadioChange={handleRadioChange} />
        <Repas handleRadioChange={handleRadioChange} />
      </section>
    </>
  );
};

export default Sidebar;
