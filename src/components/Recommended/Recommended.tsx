import React from "react";
import Button from "../shared/Button";
import "./Recommended.css";

interface RecommendedProps {
  handleRecommendedClick: (value: any) => void;
}

const Recommended: React.FC<RecommendedProps> = ({
  handleRecommendedClick,
}) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button
            onClickHandler={handleRecommendedClick}
            value=""
            title="All Products"
          />
          <Button
            onClickHandler={handleRecommendedClick}
            value="Nike"
            title="Nike"
          />
          <Button
            onClickHandler={handleRecommendedClick}
            value="Adidas"
            title="Adidas"
          />
          <Button
            onClickHandler={handleRecommendedClick}
            value="Puma"
            title="Puma"
          />
          <Button
            onClickHandler={handleRecommendedClick}
            value="Vans"
            title="Vans"
          />
        </div>
      </div>
    </>
  );
};

export default Recommended;
